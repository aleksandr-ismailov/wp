<?php
/**
 * Plugin Name:       Sign In Page
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       client-api
 *
 * @package ClientApi
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
	/**
	 * Registers the block type using the standard WordPress function.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'client_api_sign_in_page_block_init' );
