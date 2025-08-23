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

if ( file_exists( plugin_dir_path( __FILE__ ) . 'vendor/autoload.php' ) ) {
	require_once plugin_dir_path( __FILE__ ) . 'vendor/autoload.php';
}

add_action(
	'plugins_loaded',
	function () {
		if ( class_exists( 'ClientAPI\\Plugin' ) ) {
			ClientAPI\Plugin::get_instance();
		}
	}
);



/**
 * Register custom meta fields for pages
 */
function register_page_meta_fields() {
	register_post_meta(
		'page',
		'_seo_meta_title',
		array(
			'type'         => 'string',
			'single'       => true,
			'show_in_rest' => true,
		)
	);

	register_post_meta(
		'page',
		'_seo_meta_description',
		array(
			'type'         => 'string',
			'single'       => true,
			'show_in_rest' => true,
		)
	);

	register_post_meta(
		'page',
		'_seo_robots',
		array(
			'type'         => 'string',
			'single'       => true,
			'show_in_rest' => true,
		)
	);

	register_post_meta(
		'page',
		'_form_title',
		array(
			'type'         => 'string',
			'single'       => true,
			'show_in_rest' => true,
		)
	);

	register_post_meta(
		'page',
		'_button_text',
		array(
			'type'         => 'string',
			'single'       => true,
			'show_in_rest' => true,
		)
	);
}

add_action( 'init', 'register_page_meta_fields' );
add_action( 'add_meta_boxes', 'add_page_meta_boxes' );
add_action( 'save_post', 'save_page_meta_boxes' );

/**
 * Add meta boxes for pages
 */
function add_page_meta_boxes() {
	add_meta_box(
		'seo-settings',
		__( 'SEO Settings', 'client-api-core' ),
		'render_seo_meta_box',
		'page',
		'normal',
		'high'
	);

	global $post;
	if ( $post && 'sign-in' === $post->post_name ) {
		add_meta_box(
			'form-settings',
			__( 'Form Settings', 'client-api-core' ),
			'render_form_meta_box',
			'page',
			'normal',
			'high'
		);
	}
}

/**
 * Render SEO meta box
 */
function render_seo_meta_box( $post ) {
	wp_nonce_field( 'save_page_meta', 'page_meta_nonce' );

	$fields = array(
		'_seo_meta_title'       => array(
			'label' => __( 'Meta Title', 'client-api-core' ),
			'type'  => 'text',
		),
		'_seo_meta_description' => array(
			'label' => __( 'Meta Description', 'client-api-core' ),
			'type'  => 'textarea',
		),
		'_seo_robots'           => array(
			'label'       => __( 'Robots', 'client-api-core' ),
			'type'        => 'text',
			'placeholder' => 'index,follow',
		),
	);

	render_meta_fields( $post, $fields );
}

/**
 * Render form meta box
 */
function render_form_meta_box( $post ) {
	wp_nonce_field( 'save_page_meta', 'page_meta_nonce' );

	$fields = array(
		'_form_title'  => array(
			'label'       => __( 'Form Title', 'client-api-core' ),
			'type'        => 'text',
			'placeholder' => __( 'Sign In', 'client-api-core' ),
		),
		'_button_text' => array(
			'label'       => __( 'Button Text', 'client-api-core' ),
			'type'        => 'text',
			'placeholder' => __( 'Sign In', 'client-api-core' ),
		),
	);

	render_meta_fields( $post, $fields );
}

/**
 * Render meta fields table
 */
function render_meta_fields( $post, $fields ) {
	?>
	<table class="form-table">
		<?php foreach ( $fields as $field_key => $field_config ) : ?>
			<?php $value = get_post_meta( $post->ID, $field_key, true ); ?>
			<tr>
				<th scope="row">
					<label for="<?php echo esc_attr( $field_key ); ?>">
						<?php echo esc_html( $field_config['label'] ); ?>
					</label>
				</th>
				<td>
					<?php if ( 'textarea' === $field_config['type'] ) : ?>
						<textarea
							id="<?php echo esc_attr( $field_key ); ?>"
							name="<?php echo esc_attr( $field_key ); ?>"
							rows="3"
							class="large-text"><?php echo esc_textarea( $value ); ?></textarea>
					<?php else : ?>
						<input
							type="text"
							id="<?php echo esc_attr( $field_key ); ?>"
							name="<?php echo esc_attr( $field_key ); ?>"
							value="<?php echo esc_attr( $value ); ?>"
							class="regular-text"
							<?php if ( ! empty( $field_config['placeholder'] ) ) : ?>
							placeholder="<?php echo esc_attr( $field_config['placeholder'] ); ?>"
							<?php endif; ?> />
					<?php endif; ?>
				</td>
			</tr>
		<?php endforeach; ?>
	</table>
	<?php
}

/**
 * Save meta box data
 */
function save_page_meta_boxes( $post_id ) {
	if ( ! isset( $_POST['page_meta_nonce'] ) || ! wp_verify_nonce( $_POST['page_meta_nonce'], 'save_page_meta' ) ) {
		return;
	}

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$meta_fields = array( '_seo_meta_title', '_seo_meta_description', '_seo_robots', '_form_title', '_button_text' );

	foreach ( $meta_fields as $field ) {
		if ( isset( $_POST[ $field ] ) ) {
			$sanitize_function = ( '_seo_meta_description' === $field ) ? 'sanitize_textarea_field' : 'sanitize_text_field';
			update_post_meta( $post_id, $field, $sanitize_function( $_POST[ $field ] ) );
		}
	}
}
