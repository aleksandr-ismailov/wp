<?php
/**
 * Site branding customizer settings
 *
 * @package Client API
 * @subpackage Customizer
 * @since 1.0.0
 */

/**
 * Add site branding settings to customizer
 *
 * @since 1.0.0
 */
add_action( 'customize_register', 'client_api_add_branding_settings' );

function client_api_add_branding_settings( $wp_customize ) {
	$wp_customize->add_setting(
		'site_logo_id',
		[
			'default'           => '',
			'sanitize_callback' => 'absint',
			'transport'         => 'refresh',
		]
	);

	$wp_customize->add_control(
		new WP_Customize_Media_Control(
			$wp_customize,
			'site_logo_id',
			[
				'label'     => 'Site Logo',
				'section'   => 'title_tagline',
				'mime_type' => 'image',
			]
		)
	);

	$wp_customize->add_setting(
		'footer_copyright_text',
		[
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'refresh',
		]
	);

	$wp_customize->add_control(
		'footer_copyright_text',
		[
			'label'   => 'Copyright Text',
			'section' => 'title_tagline',
			'type'    => 'text',
		]
	);

	$wp_customize->add_setting(
		'footer_author_name',
		[
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
			'transport'         => 'refresh',
		]
	);

	$wp_customize->add_control(
		'footer_author_name',
		[
			'label'   => 'Author Name',
			'section' => 'title_tagline',
			'type'    => 'text',
		]
	);
}
