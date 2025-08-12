<?php
/**
 * Sign In Page Block Registration
 *
 * @package ClientApi
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block type using the standard WordPress function.
 * This automatically loads block metadata from block.json and registers all assets.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function client_api_sign_in_page_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'client_api_sign_in_page_block_init' );
