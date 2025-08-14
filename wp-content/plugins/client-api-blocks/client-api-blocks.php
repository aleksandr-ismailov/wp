<?php
/*
Plugin Name: Client API Blocks
Plugin URI: https://example.com
Description: Custom blocks for client API headless architecture
Version: 1.0.0
Author: Developer
Author URI: https://example.com
License: GPL v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: client-api-blocks
Requires at least: 5.0
Tested up to: 6.4
Requires PHP: 7.4
*/

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// В headless приложении блоки регистрируются только в JavaScript



/**
 * Enqueue block editor assets (как рекомендует официальная документация)
 */
function client_api_blocks_editor_assets() {
	wp_enqueue_script(
		'client-api-blocks-editor',
		plugin_dir_url( __FILE__ ) . 'build/index.js',
		array( 'wp-blocks', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' ),
		false
	);

	// CSS файл не нужен для headless приложения
	if ( file_exists( plugin_dir_path( __FILE__ ) . 'build/index.css' ) ) {
		wp_enqueue_style(
			'client-api-blocks-editor',
			plugin_dir_url( __FILE__ ) . 'build/index.css',
			array(),
			filemtime( plugin_dir_path( __FILE__ ) . 'build/index.css' )
		);
	}
}
add_action( 'enqueue_block_editor_assets', 'client_api_blocks_editor_assets' );
