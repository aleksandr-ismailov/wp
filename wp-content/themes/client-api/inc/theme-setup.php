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
 * Restrict editor capabilities to protect design system
 *
 * @since 1.0.0
 */
add_action( 'admin_init', 'client_api_restrict_editor_capabilities' );

function client_api_restrict_editor_capabilities() {
	// Remove dangerous capabilities for editors
	$role = get_role( 'editor' );
	if ( $role ) {
		$role->remove_cap( 'edit_theme_options' );
		$role->remove_cap( 'switch_themes' );
		$role->remove_cap( 'edit_themes' );
		$role->remove_cap( 'customize' );
	}
}

/**
 * Disable theme and plugin editing in admin
 *
 * @since 1.0.0
 */
add_action( 'admin_init', 'client_api_disable_file_editing' );

function client_api_disable_file_editing() {
	// Disable theme editor
	remove_action( 'admin_menu', '_add_themes_utility_last', 101 );

	// Remove plugin editor
	remove_submenu_page( 'plugins.php', 'plugin-editor.php' );

	// Remove theme editor
	remove_submenu_page( 'themes.php', 'theme-editor.php' );
}
