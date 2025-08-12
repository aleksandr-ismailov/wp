<?php

/**
 * Custom meta fields for pages
 *
 * @package Client API
 * @subpackage Meta Fields
 * @since 1.0.0
 */

/**
 * Register custom meta fields for pages
 *
 * @since 1.0.0
 */
add_action( 'init', 'client_api_register_meta_fields' );

function client_api_register_meta_fields() {
	register_meta(
		'post',
		'seo_meta_title',
		array(
			'object_subtype' => 'page',
			'type'           => 'string',
			'single'         => true,
			'show_in_rest'   => true,
			'auth_callback'  => function () {
				return current_user_can( 'edit_posts' );
			},
		)
	);

	register_meta(
		'post',
		'seo_meta_description',
		array(
			'object_subtype' => 'page',
			'type'           => 'string',
			'single'         => true,
			'show_in_rest'   => true,
			'auth_callback'  => function () {
				return current_user_can( 'edit_posts' );
			},
		)
	);

	register_meta(
		'post',
		'seo_robots',
		array(
			'object_subtype' => 'page',
			'type'           => 'string',
			'single'         => true,
			'show_in_rest'   => true,
			'auth_callback'  => function () {
				return current_user_can( 'edit_posts' );
			},
		)
	);
}
