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
	$block_styles  = wp_get_global_stylesheet();

	return array(
		'id'            => $page->ID,
		'title'         => sanitize_text_field( $page->post_title ),
		'content'       => $content,
		'slug'          => sanitize_text_field( $page->post_name ),
		'form_settings' => $form_settings,
		'block_styles'  => $block_styles,
		'seo'           => array(
			'metaTitle'       => sanitize_text_field( get_post_meta( $page->ID, 'seo_meta_title', true ) ),
			'metaDescription' => sanitize_textarea_field( get_post_meta( $page->ID, 'seo_meta_description', true ) ),
			'robots'          => sanitize_text_field( get_post_meta( $page->ID, 'seo_robots', true ) ),
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
		'form_title'       => '',
		'form_description' => '',
		'button_text'      => '',
	);

	if ( ! $page instanceof WP_Post ) {
		return $form_settings;
	}

	$blocks = parse_blocks( $page->post_content );

	foreach ( $blocks as $block ) {
		if ( 'client-api/sign-in-page' === $block['blockName'] && ! empty( $block['attrs'] ) ) {
			$attrs = $block['attrs'];

			$form_settings['form_title'] = ! empty( $attrs['formTitle'] )
				? sanitize_text_field( $attrs['formTitle'] )
				: '';

			$form_settings['form_description'] = ! empty( $attrs['formDescription'] )
				? sanitize_textarea_field( $attrs['formDescription'] )
				: '';

			$form_settings['button_text'] = ! empty( $attrs['buttonText'] )
				? sanitize_text_field( $attrs['buttonText'] )
				: '';

			break;
		}
	}

	if ( empty( $form_settings['form_title'] ) ) {
		$form_settings['form_title'] = sanitize_text_field(
			get_post_meta( $page->ID, 'form_title', true )
		);
	}

	if ( empty( $form_settings['form_description'] ) ) {
		$form_settings['form_description'] = sanitize_textarea_field(
			get_post_meta( $page->ID, 'form_description', true )
		);
	}

	if ( empty( $form_settings['button_text'] ) ) {
		$form_settings['button_text'] = sanitize_text_field(
			get_post_meta( $page->ID, 'button_text', true )
		);
	}

	return $form_settings;
}

add_action( 'rest_api_init', 'register_custom_api_endpoints' );
