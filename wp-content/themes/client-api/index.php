<?php
/**
 * Main template file
 *
 * This is a minimal index.php file for the client-api theme.
 * Since this is a headless WordPress setup, this file won't be used
 * for actual page rendering, but is required for theme activation.
 *
 * @package Client API
 * @since 1.0.0
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Since this is a headless setup, redirect to admin or show minimal message
if ( is_user_logged_in() ) {
	wp_safe_redirect( admin_url() );
	exit;
} else {
	?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php bloginfo( 'name' ); ?></title>
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
		<h1><?php bloginfo( 'name' ); ?></h1>
		<p>This is a headless WordPress installation.</p>
		<p>Frontend is served by Next.js application.</p>
		<a href="<?php echo esc_url( admin_url() ); ?>">Go to Admin</a>
	</div>
	<?php wp_footer(); ?>
</body>
</html>
	<?php
}
