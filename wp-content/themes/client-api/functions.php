<?php
/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Client API
 * @since 1.0.0
 */

add_action( 'rest_api_init', 'client_api_register_endpoints' );

/**
 * Register custom REST API endpoints
 *
 * @since 1.0.0
 */
function client_api_register_endpoints() {
	register_rest_route(
		'client-api/v1',
		'/auth',
		array(
			'methods'             => 'GET',
			'callback'            => 'client_api_auth_endpoint',
			'permission_callback' => 'client_api_auth_permissions_check',
			'args'                => array(
				'token' => array(
					'description' => 'Authentication token',
					'type'        => 'string',
					'required'    => false,
				),
			),
		)
	);

	register_rest_route(
		'client-api/v1',
		'/pages',
		array(
			'methods'             => 'GET',
			'callback'            => 'client_api_pages_endpoint',
			'permission_callback' => '__return_true',
			'args'                => array(
				'per_page' => array(
					'description' => 'Number of pages per request',
					'type'        => 'integer',
					'default'     => 10,
					'minimum'     => 1,
					'maximum'     => 100,
				),
				'page'     => array(
					'description' => 'Page number',
					'type'        => 'integer',
					'default'     => 1,
					'minimum'     => 1,
				),
			),
		)
	);
}

/**
 * Auth endpoint callback
 *
 * @param WP_REST_Request $_request Request object.
 * @return WP_REST_Response|WP_Error Response object or error.
 * @since 1.0.0
 * @SuppressWarnings(PHPMD.UnusedFormalParameter)
 */
function client_api_auth_endpoint( $_request ) {
	unset( $_request );
	$current_user = wp_get_current_user();

	if ( 0 === $current_user->ID ) {
		return new WP_Error(
			'not_authenticated',
			'User is not authenticated',
			array( 'status' => 401 )
		);
	}

	$user_data = array(
		'id'            => $current_user->ID,
		'username'      => $current_user->user_login,
		'email'         => $current_user->user_email,
		'display_name'  => $current_user->display_name,
		'roles'         => $current_user->roles,
		'capabilities'  => $current_user->roles,
		'authenticated' => true,
	);

	return new WP_REST_Response( $user_data, 200 );
}

/**
 * Auth endpoint permission check
 *
 * @param WP_REST_Request $_request Request object.
 * @return bool|WP_Error True if allowed, false or error otherwise.
 * @since 1.0.0
 * @SuppressWarnings(PHPMD.UnusedFormalParameter)
 */
function client_api_auth_permissions_check( $_request ) {
	unset( $_request );
	return is_user_logged_in();
}

/**
 * Pages endpoint callback
 *
 * @param WP_REST_Request $request Request object.
 * @return WP_REST_Response|WP_Error Response object or error.
 * @since 1.0.0
 */
function client_api_pages_endpoint( $request ) {
	$per_page = $request->get_param( 'per_page' );
	$page     = $request->get_param( 'page' );

	$args = array(
		'post_type'      => 'page',
		'post_status'    => 'publish',
		'posts_per_page' => $per_page,
		'paged'          => $page,
		'orderby'        => 'menu_order',
		'order'          => 'ASC',
	);

	$query = new WP_Query( $args );
	$pages = array();

	if ( $query->have_posts() ) {
		while ( $query->have_posts() ) {
			$query->the_post();

			$page_data = array(
				'id'             => get_the_ID(),
				'title'          => get_the_title(),
				'slug'           => get_post_field( 'post_name' ),
				'content'        => get_the_content(),
				'excerpt'        => get_the_excerpt(),
				'date'           => get_the_date( 'c' ),
				'modified'       => get_the_modified_date( 'c' ),
				'status'         => get_post_status(),
				'link'           => get_permalink(),
				'featured_image' => get_the_post_thumbnail_url( get_the_ID(), 'full' ),
				'meta'           => get_post_meta( get_the_ID() ),
			);

			$pages[] = $page_data;
		}
		wp_reset_postdata();
	}

	$response_data = array(
		'pages'        => $pages,
		'total'        => $query->found_posts,
		'total_pages'  => $query->max_num_pages,
		'current_page' => $page,
		'per_page'     => $per_page,
	);

	return new WP_REST_Response( $response_data, 200 );
}

/**
 * Add CORS headers for API requests
 *
 * @since 1.0.0
 */
add_action(
	'rest_api_init',
	function () {
		remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
		add_filter( 'rest_pre_serve_request', 'client_api_add_cors_headers' );
	}
);

/**
 * Add CORS headers callback
 *
 * @param mixed $value Response value.
 * @return mixed Response value.
 * @since 1.0.0
 */
function client_api_add_cors_headers( $value ) {
	status_header( 200 );
	return $value;
}

/**
 * Theme setup
 *
 * @since 1.0.0
 */
function client_api_theme_setup() {
	add_theme_support( 'block-templates' );

	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'custom-logo' );
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		)
	);
}
add_action( 'after_setup_theme', 'client_api_theme_setup' );
