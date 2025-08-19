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
	add_theme_support( 'post-thumbnails' );
}

/**
 * Enable SVG upload support
 *
 * @since 1.0.0
 */
add_filter( 'upload_mimes', 'client_api_add_svg_support' );

function client_api_add_svg_support( $mimes ) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}

/**
 * Fix SVG display in media library
 *
 * @since 1.0.0
 */
add_filter( 'wp_check_filetype_and_ext', 'client_api_fix_svg_mime_type', 10, 4 );

function client_api_fix_svg_mime_type( $data, $file, $filename, $mimes ) {
	$filetype = wp_check_filetype( $filename, $mimes );
	return [
		'ext'             => $filetype['ext'],
		'type'            => $filetype['type'],
		'proper_filename' => $data['proper_filename'],
	];
}
