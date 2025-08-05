<?php
/**
 * Theme setup and configuration
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Client API
 * @subpackage Setup
 * @since 1.0.0
 */

add_action( 'after_setup_theme', 'client_api_theme_setup' );

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
