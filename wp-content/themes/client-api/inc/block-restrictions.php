<?php
/**
 * Block restrictions for design system protection
 *
 * @package Client API
 * @subpackage Blocks
 * @since 1.0.0
 */

/**
 * Restrict dangerous blocks that could break design system
 *
 * @param array $allowed_blocks Array of allowed block types.
 * @param object $block_editor_context Block editor context.
 * @return array Modified array of allowed blocks.
 * @since 1.0.0
 */
add_filter( 'allowed_block_types_all', 'client_api_restrict_blocks', 10, 2 );

function client_api_restrict_blocks( $allowed_blocks, $block_editor_context ) { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed
	$safe_blocks = array(
		'core/heading',
		'core/paragraph',
		'core/list',
		'core/list-item',
		'core/image',
		'core/columns',
		'core/column',
		'client-api/sign-in-page',
	);

	return $safe_blocks;
}

/**
 * Disable code editor in block editor
 *
 * @param array $settings Block editor settings.
 * @return array Modified settings with code editing disabled.
 * @since 1.0.0
 */
add_filter( 'block_editor_settings_all', 'client_api_disable_code_editor' );

function client_api_disable_code_editor( $settings ) {
	$settings['codeEditingEnabled'] = false;
	return $settings;
}

/**
 * Disable custom CSS and HTML capabilities
 *
 * @since 1.0.0
 */
add_action( 'admin_init', 'client_api_disable_custom_css_html' );

function client_api_disable_custom_css_html() {
	add_action(
		'customize_register',
		function ( $wp_customize ) {
			$wp_customize->remove_section( 'custom_css' );
		}
	);

	add_action(
		'enqueue_block_editor_assets',
		function () {
			wp_add_inline_script(
				'wp-blocks',
				'
				wp.domReady( function() {
					wp.blocks.unregisterBlockType( "core/html" );
					wp.blocks.unregisterBlockType( "core/code" );
					wp.blocks.unregisterBlockType( "core/shortcode" );
					wp.blocks.unregisterBlockType( "core/embed" );

					wp.data.dispatch( "core/edit-post" ).updateEditorSettings({
						codeEditingEnabled: false
					});
				});
				'
			);
		}
	);

	add_action(
		'enqueue_block_editor_assets',
		function () {
			wp_add_inline_script(
				'wp-edit-post',
				'
				wp.domReady( function() {
					if ( wp.data.select( "core/edit-post" ) ) {
						wp.data.dispatch( "core/edit-post" ).updatePreference( "codeEditingEnabled", false );
					}
				});
                    '
			);
		}
	);
}

/**
 * Lock template structure for sign-in page
 *
 * @since 1.0.0
 */
add_action( 'enqueue_block_editor_assets', 'client_api_lock_template_structure' );

function client_api_lock_template_structure() {
	wp_add_inline_script(
		'wp-blocks',
		'
		wp.domReady( function() {
			wp.data.dispatch( "core/edit-post" ).updateEditorSettings({
				templateLock: "contentOnly"
			});
		});
		'
	);
}

/**
 * Remove dangerous menu items from editor role
 *
 * @since 1.0.0
 */
add_action( 'admin_menu', 'client_api_remove_editor_menu_items', 999 );

function client_api_remove_editor_menu_items() {
	remove_menu_page( 'themes.php' );
	remove_menu_page( 'plugins.php' );
	remove_menu_page( 'tools.php' );
	remove_menu_page( 'options-general.php' );

	remove_submenu_page( 'themes.php', 'widgets.php' );
	remove_submenu_page( 'themes.php', 'nav-menus.php' );
	remove_submenu_page( 'themes.php', 'customize.php' );
}
