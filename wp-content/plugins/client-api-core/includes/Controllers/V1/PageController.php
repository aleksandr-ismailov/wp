<?php
namespace ClientAPI\Controllers\V1;

use ClientAPI\Controllers\ApplicationController;

class PageController extends ApplicationController {
	protected $rest_base = 'page';

	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<slug>[a-zA-Z0-9-]+)',
			[
				'methods'             => 'GET',
				'callback'            => [ $this, 'get_item' ],
				'permission_callback' => function ( $request ) {
					return $this->is_public_page( $request ) ? true : $this->authenticate_user();
				},
			]
		);
	}

	public function is_public_page( $request ) {
		$public_pages = [ 'sign-in' ];
		return in_array( $request['slug'], $public_pages, true );
	}

	public function get_item( $request ) {
		try {
			$slug  = sanitize_text_field( $request['slug'] );
			$pages = get_posts(
				[
					'name'        => $slug,
					'post_type'   => 'page',
					'post_status' => 'publish',
					'numberposts' => 1,
				]
			);

			if ( empty( $pages ) || ! isset( $pages[0] ) || ! is_object( $pages[0] ) ) {
				return $this->render_error( 'Page not found', 404 );
			}

			/** @var \WP_Post $page */
			$page = $pages[0];
			$data = [
				'id'            => $page->ID,
				'title'         => [ 'rendered' => $page->post_title ],
				'content'       => [
					'rendered'  => apply_filters( 'the_content', $page->post_content ),
					'protected' => false,
				],
				'slug'          => $page->post_name,
				'form_settings' => [
					'form_title'  => get_post_meta( $page->ID, '_form_title', true ),
					'button_text' => get_post_meta( $page->ID, '_button_text', true ),
				],
				'seo'           => [
					'metaTitle'       => get_post_meta( $page->ID, '_seo_meta_title', true ),
					'metaDescription' => get_post_meta( $page->ID, '_seo_meta_description', true ),
					'robots'          => get_post_meta( $page->ID, '_seo_robots', true ),
				],
			];

			return new \WP_REST_Response(
				[
					'success' => true,
					'data'    => $data,
				],
				200
			);
		} catch ( \Exception $e ) {
			return $this->render_error( $e->getMessage(), 500 );
		}
	}
}
