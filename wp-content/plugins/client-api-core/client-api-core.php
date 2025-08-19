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

	register_rest_route(
		'client-api/v1',
		'/site-branding',
		array(
			'methods'             => 'GET',
			'callback'            => 'get_site_branding_data',
			'permission_callback' => '__return_true',
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
		'title'         => array(
			'rendered' => $page->post_title,
		),
		'content'       => array(
			'rendered'  => $content,
			'protected' => false,
		),
		'slug'          => $page->post_name,
		'form_settings' => $form_settings,
		'seo'           => array(
			'metaTitle'       => get_post_meta( $page->ID, '_seo_meta_title', true ),
			'metaDescription' => get_post_meta( $page->ID, '_seo_meta_description', true ),
			'robots'          => get_post_meta( $page->ID, '_seo_robots', true ),
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

	// Use meta fields with underscore prefix (hidden from Custom Fields UI)
	$form_settings['form_title']  = get_post_meta( $page->ID, '_form_title', true );
	$form_settings['button_text'] = get_post_meta( $page->ID, '_button_text', true );

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

/**
 * Get site branding data via REST API
 *
 * @return array Site branding data.
 * @since 1.0.0
 */
function get_site_branding_data() {
	$logo_id  = get_theme_mod( 'site_logo_id' );
	$logo_url = $logo_id ? wp_get_attachment_image_url( $logo_id, 'full' ) : null;

	return array(
		'logoUrl'       => $logo_url,
		'copyrightText' => get_theme_mod( 'footer_copyright_text', '' ),
		'authorName'    => get_theme_mod( 'footer_author_name', '' ),
	);
}

add_action( 'rest_api_init', 'register_custom_api_endpoints' );



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
							<?php endif; ?>
						/>
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
