<?php
/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Client API
 * @subpackage Setup
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once get_template_directory() . '/inc/theme-setup.php';
require_once get_template_directory() . '/inc/api-endpoints.php';
require_once get_template_directory() . '/inc/block-restrictions.php';
require_once get_template_directory() . '/inc/meta-fields.php';

/**
 * Load sign-in-page block plugin
 *
 * @since 1.0.0
 */
require_once get_template_directory() . '/sign-in-page/sign-in-page.php';
