<?php
/**
 * CORS support for API requests
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Client API
 * @subpackage API
 * @since 1.0.0
 */

add_action( 'init', 'client_api_add_cors_support' );

/**
 * Add CORS support for API requests
 *
 * @since 1.0.0
 */
function client_api_add_cors_support() {
	add_action( 'wp_loaded', 'client_api_handle_cors_preflight' );
}

/**
 * Handle CORS preflight requests
 *
 * @since 1.0.0
 */
function client_api_handle_cors_preflight() {
	if ( isset( $_SERVER['REQUEST_METHOD'] ) && 'OPTIONS' === $_SERVER['REQUEST_METHOD'] ) {
		wp_die( '', 'CORS Preflight', array( 'response' => 200 ) );
	}
}
