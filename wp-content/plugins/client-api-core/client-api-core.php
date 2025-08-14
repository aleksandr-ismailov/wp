<?php
/**
 * Plugin Name: Client API Core
 * Plugin URI: https://example.com
 * Description: Core API functionality for headless WordPress client applications
 * Version: 1.0.0
 * Author: Developer
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: client-api-core
 *
 * @package Client_API_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( version_compare( PHP_VERSION, '7.4', '<' ) ) {
	add_action(
		'admin_notices',
		function () {
			echo '<div class="notice notice-error"><p>' . esc_html__( 'Client API Core requires PHP 7.4 or higher.', 'client-api-core' ) . '</p></div>';
		}
	);
	return;
}

global $wp_version;
if ( version_compare( $wp_version, '5.0', '<' ) ) {
	add_action(
		'admin_notices',
		function () {
			echo '<div class="notice notice-error"><p>' . esc_html__( 'Client API Core requires WordPress 5.0 or higher.', 'client-api-core' ) . '</p></div>';
		}
	);
	return;
}

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

	register_rest_route(
		'client-api/v1',
		'/home-page-sidebars',
		array(
			'methods'             => 'GET',
			'callback'            => 'get_home_page_sidebars',
			'permission_callback' => '__return_true',
		)
	);

	register_rest_route(
		'client-api/v1',
		'/auth',
		array(
			'methods'             => 'GET',
			'callback'            => 'get_current_user_auth',
			'permission_callback' => 'is_user_logged_in',
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

	return array(
		'id'            => $page->ID,
		'title'         => $page->post_title,
		'content'       => $content,
		'slug'          => $page->post_name,
		'form_settings' => $form_settings,
		'seo'           => array(
			'metaTitle'       => get_post_meta( $page->ID, 'seo_meta_title', true ),
			'metaDescription' => get_post_meta( $page->ID, 'seo_meta_description', true ),
			'robots'          => get_post_meta( $page->ID, 'seo_robots', true ),
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
		'form_title'  => '',
		'button_text' => '',
	);

	if ( ! $page instanceof WP_Post ) {
		return $form_settings;
	}

	$blocks = parse_blocks( $page->post_content );

	foreach ( $blocks as $block ) {
		if ( 'client-api/sign-in-page' === $block['blockName'] && ! empty( $block['attrs'] ) ) {
			$attrs = $block['attrs'];

			$form_settings['form_title'] = ! empty( $attrs['formTitle'] )
				? $attrs['formTitle']
				: '';

			$form_settings['button_text'] = ! empty( $attrs['buttonText'] )
				? $attrs['buttonText']
				: '';

			break;
		}
	}

	return $form_settings;
}

/**
 * Get home page sidebars content via REST API
 *
 * @return array|WP_Error Sidebars data or error object.
 * @since 1.0.0
 */
function get_home_page_sidebars() {
	$home_page = get_page_by_path( 'home' );

	if ( ! $home_page ) {
		$home_page = get_option( 'page_on_front' );
		if ( $home_page ) {
			$home_page = get_post( $home_page );
		}
	}

	if ( ! $home_page instanceof WP_Post ) {
		return new WP_Error( 'no_home_page', 'Home page not found', array( 'status' => 404 ) );
	}

	$sidebar_content = get_sidebar_content_from_blocks( $home_page );

	return array(
		'leftSidebar'  => array(
			'content' => $sidebar_content['leftSidebarContent'],
		),
		'rightSidebar' => array(
			'content' => $sidebar_content['rightSidebarContent'],
		),
	);
}

/**
 * Extract sidebar content from page blocks
 *
 * @param WP_Post $page Page object.
 * @return array Sidebar content.
 * @since 1.0.0
 */
function get_sidebar_content_from_blocks( $page ) {
	$sidebar_content = array(
		'leftSidebarContent'  => '',
		'rightSidebarContent' => '',
	);

	if ( ! $page instanceof WP_Post ) {
		return $sidebar_content;
	}

	$blocks = parse_blocks( $page->post_content );

	foreach ( $blocks as $block ) {
		if ( 'client-api/sidebar-content' === $block['blockName'] && ! empty( $block['attrs'] ) ) {
			$attrs = $block['attrs'];

			$sidebar_content['leftSidebarContent'] = ! empty( $attrs['leftSidebarContent'] )
				? $attrs['leftSidebarContent']
				: '';

			$sidebar_content['rightSidebarContent'] = ! empty( $attrs['rightSidebarContent'] )
				? $attrs['rightSidebarContent']
				: '';

			break;
		}
	}

	return $sidebar_content;
}

/**
 * Get current user authentication data via REST API
 *
 * @return array|WP_Error User data or error object.
 * @since 1.0.0
 */
function get_current_user_auth() {
	$current_user = wp_get_current_user();

	if ( ! $current_user || 0 === $current_user->ID ) {
		return new WP_Error( 'no_auth', 'User not authenticated', array( 'status' => 401 ) );
	}

	return array(
		'id'    => $current_user->ID,
		'name'  => $current_user->display_name,
		'email' => $current_user->user_email,
		'roles' => $current_user->roles,
	);
}

add_action( 'rest_api_init', 'register_custom_api_endpoints' );
