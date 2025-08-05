<?php
/**
 * Custom meta boxes for form settings
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Client API
 * @subpackage Admin
 * @since 1.0.0
 */

add_action( 'add_meta_boxes', 'client_api_add_form_settings_meta_box' );
add_action( 'save_post', 'client_api_save_form_settings_meta' );

/**
 * Add form settings meta box
 *
 * @since 1.0.0
 */
function client_api_add_form_settings_meta_box() {
	add_meta_box(
		'form-settings',
		'Sign-in Form Settings',
		'client_api_form_settings_meta_box_callback',
		'page',
		'normal',
		'high'
	);
}

/**
 * Form settings meta box callback
 *
 * @param WP_Post $post Post object.
 * @since 1.0.0
 */
function client_api_form_settings_meta_box_callback( $post ) {
	wp_nonce_field( 'client_api_form_settings_nonce', 'client_api_form_settings_nonce' );

	$form_title       = get_post_meta( $post->ID, 'form_title', true );
	$form_description = get_post_meta( $post->ID, 'form_description', true );
	$button_text      = get_post_meta( $post->ID, 'button_text', true );
	$button_variant   = get_post_meta( $post->ID, 'button_variant', true );
	$button_size      = get_post_meta( $post->ID, 'button_size', true );
	$card_variant     = get_post_meta( $post->ID, 'card_variant', true );
	$form_width       = get_post_meta( $post->ID, 'form_width', true );
	?>
	<table class="form-table">
		<tr>
			<th scope="row">
				<label for="form_title">Form Title</label>
			</th>
			<td>
				<input type="text" id="form_title" name="form_title" value="<?php echo esc_attr( $form_title ); ?>" placeholder="Sign In" class="regular-text" />
				<p class="description">Custom title for the sign-in form</p>
			</td>
		</tr>
		<tr>
			<th scope="row">
				<label for="form_description">Form Description</label>
			</th>
			<td>
				<textarea id="form_description" name="form_description" placeholder="Enter your credentials to access your account" class="regular-text" rows="3"><?php echo esc_textarea( $form_description ); ?></textarea>
				<p class="description">Description text below the form title</p>
			</td>
		</tr>
		<tr>
			<th scope="row">
				<label for="button_text">Button Text</label>
			</th>
			<td>
				<input type="text" id="button_text" name="button_text" value="<?php echo esc_attr( $button_text ); ?>" placeholder="Sign In" class="regular-text" />
				<p class="description">Text for the sign-in button</p>
			</td>
		</tr>
		<tr>
			<th scope="row">
				<label for="button_variant">Button Style</label>
			</th>
			<td>
				<select id="button_variant" name="button_variant">
					<option value="">Default</option>
					<option value="destructive" <?php selected( $button_variant, 'destructive' ); ?>>Destructive</option>
					<option value="outline" <?php selected( $button_variant, 'outline' ); ?>>Outline</option>
					<option value="secondary" <?php selected( $button_variant, 'secondary' ); ?>>Secondary</option>
					<option value="ghost" <?php selected( $button_variant, 'ghost' ); ?>>Ghost</option>
					<option value="link" <?php selected( $button_variant, 'link' ); ?>>Link</option>
				</select>
				<p class="description">Visual style of the sign-in button</p>
			</td>
		</tr>
		<tr>
			<th scope="row">
				<label for="button_size">Button Size</label>
			</th>
			<td>
				<select id="button_size" name="button_size">
					<option value="">Default</option>
					<option value="sm" <?php selected( $button_size, 'sm' ); ?>>Small</option>
					<option value="lg" <?php selected( $button_size, 'lg' ); ?>>Large</option>
				</select>
				<p class="description">Size of the sign-in button</p>
			</td>
		</tr>
		<tr>
			<th scope="row">
				<label for="card_variant">Card Style</label>
			</th>
			<td>
				<select id="card_variant" name="card_variant">
					<option value="">Default</option>
					<option value="minimal" <?php selected( $card_variant, 'minimal' ); ?>>Minimal</option>
					<option value="bordered" <?php selected( $card_variant, 'bordered' ); ?>>Bordered</option>
				</select>
				<p class="description">Visual style of the form card</p>
			</td>
		</tr>
		<tr>
			<th scope="row">
				<label for="form_width">Form Width</label>
			</th>
			<td>
				<select id="form_width" name="form_width">
					<option value="">Default</option>
					<option value="narrow" <?php selected( $form_width, 'narrow' ); ?>>Narrow</option>
					<option value="wide" <?php selected( $form_width, 'wide' ); ?>>Wide</option>
				</select>
				<p class="description">Width of the sign-in form</p>
			</td>
		</tr>
	</table>
	<?php
}

/**
 * Save form settings meta
 *
 * @param int $post_id Post ID.
 * @since 1.0.0
 */
function client_api_save_form_settings_meta( $post_id ) {
	if ( ! isset( $_POST['client_api_form_settings_nonce'] ) ) {
		return;
	}

	if ( ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['client_api_form_settings_nonce'] ) ), 'client_api_form_settings_nonce' ) ) {
		return;
	}

	if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$fields = array( 'form_title', 'form_description', 'button_text', 'button_variant', 'button_size', 'card_variant', 'form_width' );

	foreach ( $fields as $field ) {
		if ( isset( $_POST[ $field ] ) ) {
			update_post_meta( $post_id, $field, sanitize_text_field( wp_unslash( $_POST[ $field ] ) ) );
		}
	}
}
