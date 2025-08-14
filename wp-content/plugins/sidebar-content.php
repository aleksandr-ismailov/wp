<?php
/**
 * Plugin Name:       Sidebar Content Block
 * Description:       A custom block for sidebar content management
 * Requires at least: 6.0
 * Requires PHP:      8.0
 * Version:           1.0.0
 * Author:            Client API
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       sidebar-content
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the sidebar content block
 */
function register_sidebar_content_block() {
	wp_register_script(
		'sidebar-content-editor',
		plugin_dir_url( __FILE__ ) . 'block.js',
		array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ),
		'1.0.0',
		true
	);

	register_block_type(
		'client-api/sidebar-content',
		array(
			'editor_script' => 'sidebar-content-editor',
			'attributes'    => array(
				'leftSidebarContent'  => array(
					'type'    => 'string',
					'default' => '',
				),
				'rightSidebarContent' => array(
					'type'    => 'string',
					'default' => '',
				),
			),
		)
	);
}
add_action( 'init', 'register_sidebar_content_block' );
