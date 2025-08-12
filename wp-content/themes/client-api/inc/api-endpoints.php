<?php
/**
 * API Endpoints
 *
 * @package Client API
 * @subpackage API
 * @since 1.0.0
 */

/**
 * Register custom REST API endpoints
 *
 * @since 1.0.0
 */
function register_custom_api_endpoints() {
	register_rest_route(
		'client-api/v1',
		'/page/(?P<slug>[a-zA-Z0-9-]+)',
		array(
			'methods'             => 'GET',
			'callback'            => 'get_page_by_slug',
			'permission_callback' => '__return_true',
		)
	);
}

/**
 * Get page by slug via REST API
 *
 * @param WP_REST_Request $request REST API request object.
 * @return array|WP_Error Page data or error object.
 * @since 1.0.0
 */
function get_page_by_slug( $request ) {
	$slug = sanitize_text_field( $request['slug'] );

	if ( empty( $slug ) ) {
		return new WP_Error( 'invalid_slug', 'Invalid page slug', array( 'status' => 400 ) );
	}

	$page = get_posts(
		array(
			'name'        => $slug,
			'post_type'   => 'page',
			'post_status' => 'publish',
			'numberposts' => 1,
		)
	);

	if ( empty( $page ) ) {
		return new WP_Error( 'no_page', 'Page not found', array( 'status' => 404 ) );
	}

	$page = $page[0];

	if ( ! $page instanceof WP_Post ) {
		return new WP_Error( 'invalid_page', 'Invalid page object', array( 'status' => 500 ) );
	}

	$content       = apply_filters( 'the_content', $page->post_content );
	$form_settings = get_page_block_settings( $page );

	return array(
		'id'            => $page->ID,
		'title'         => $page->post_title,
		'content'       => $content,
		'slug'          => $page->post_name,
		'form_settings' => $form_settings,
		'seo'           => array(
			'metaTitle'       => get_post_meta( $page->ID, 'seo_meta_title', true ),
			'metaDescription' => get_post_meta( $page->ID, 'seo_meta_description', true ),
			'robots'          => get_post_meta( $page->ID, 'seo_robots', true ),
		),
	);
}

/**
 * Extract form settings from page blocks with backward compatibility
 *
 * @param WP_Post $page Page object.
 * @return array Form settings.
 * @since 1.0.0
 */
function get_page_block_settings( $page ) {
	$form_settings = array(
		'form_title'  => '',
		'button_text' => '',
	);

	if ( ! $page instanceof WP_Post ) {
		return $form_settings;
	}

	$blocks = parse_blocks( $page->post_content );

	foreach ( $blocks as $block ) {
		if ( 'client-api/sign-in-page' === $block['blockName'] && ! empty( $block['attrs'] ) ) {
			$attrs = $block['attrs'];

			$form_settings['form_title'] = ! empty( $attrs['formTitle'] )
				? $attrs['formTitle']
				: '';

			$form_settings['button_text'] = ! empty( $attrs['buttonText'] )
				? $attrs['buttonText']
				: '';

			break;
		}
	}

	return $form_settings;
}



add_action( 'rest_api_init', 'register_custom_api_endpoints' );
