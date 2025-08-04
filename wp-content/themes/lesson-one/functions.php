<?php
/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Lesson One
 * @since 1.0.0
 */

/**
 * Enqueue the style.css file.
 *
 * @since 1.0.0
 */
function lesson_one_style() {
	wp_enqueue_style(
		'lesson-one-style',
		get_stylesheet_uri(),
		array(),
		wp_get_theme()->get( 'Version' )
	);
}
add_action( 'wp_enqueue_scripts', 'lesson_one_style' );

/**
 * Register block patterns.
 *
 * @since 1.0.0
 */
function lesson_one_register_block_patterns() {
	register_block_pattern(
		'lesson-one/shining-through',
		array(
			'title'       => 'Artistic Gallery - Shining Through',
			'description' => 'Gallery with artistic border effects and duotone',
			'categories'  => array( 'gallery', 'featured' ),
			'content'     => <<<HTML
<!-- wp:gallery {"columns":2,"imageCrop":false,"linkTo":"none","style":{"spacing":{"padding":{"top":"var(--wp--preset--spacing--30)","right":"var(--wp--preset--spacing--30)","bottom":"var(--wp--preset--spacing--30)","left":"var(--wp--preset--spacing--30)"},"blockGap":{"top":"15px","left":"15px"}},"color":{"background":"#f8f1ec"}}} -->
<figure class="wp-block-gallery has-nested-images columns-2 has-background" style="background-color:#f8f1ec;padding-top:var(--wp--preset--spacing--30);padding-right:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30);padding-left:var(--wp--preset--spacing--30)">

	<!-- wp:image {"sizeSlug":"large","linkDestination":"none","style":{"border":{"radius":{"topLeft":"300px","topRight":"300px","bottomLeft":"300px"}},"color":{"duotone":"unset"}}} -->
	<figure class="wp-block-image size-large has-custom-border">
		<img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600" alt="Forest light" style="border-top-left-radius:300px;border-top-right-radius:300px;border-bottom-left-radius:300px"/>
	</figure>
	<!-- /wp:image -->

	<!-- wp:image {"sizeSlug":"large","linkDestination":"none","style":{"border":{"radius":{"bottomRight":"300px","topRight":"2000px","topLeft":"300px"}},"color":{"duotone":["#000000","#ffffff"]}}} -->
	<figure class="wp-block-image size-large has-custom-border">
		<img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600" alt="Forest light BW" style="border-top-left-radius:300px;border-top-right-radius:2000px;border-bottom-right-radius:300px"/>
	</figure>
	<!-- /wp:image -->

	<!-- wp:image {"sizeSlug":"large","linkDestination":"none","style":{"border":{"radius":{"bottomLeft":"2000px","topLeft":"300px","bottomRight":"300px"}},"color":{"duotone":"unset"}}} -->
	<figure class="wp-block-image size-large has-custom-border">
		<img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600" alt="Forest light" style="border-top-left-radius:300px;border-bottom-left-radius:2000px;border-bottom-right-radius:300px"/>
	</figure>
	<!-- /wp:image -->

	<!-- wp:image {"sizeSlug":"large","linkDestination":"none","style":{"border":{"radius":{"bottomRight":"300px","topLeft":"0px","topRight":"300px","bottomLeft":"300px"}},"color":{"duotone":"unset"}}} -->
	<figure class="wp-block-image size-large has-custom-border">
		<img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600" alt="Forest light" style="border-top-left-radius:0px;border-top-right-radius:300px;border-bottom-left-radius:300px;border-bottom-right-radius:300px"/>
	</figure>
	<!-- /wp:image -->

</figure>
<!-- /wp:gallery -->
HTML
		,
		)
	);
}
add_action( 'init', 'lesson_one_register_block_patterns' );
