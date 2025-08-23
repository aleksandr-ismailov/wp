<?php
namespace ClientAPI\Controllers\V1;

use ClientAPI\Controllers\ApplicationController;

class BrandingController extends ApplicationController {
	protected $rest_base = 'site-branding';

	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				'methods'             => 'GET',
				'callback'            => [ $this, 'get_branding_data' ],
				'permission_callback' => '__return_true',
			]
		);
	}

	public function get_branding_data( $request ) {
		try {
			$logo_id  = get_theme_mod( 'site_logo_id' );
			$logo_url = $logo_id ? wp_get_attachment_image_url( $logo_id, 'full' ) : null;

			$data = [
				'logoUrl'       => $logo_url,
				'copyrightText' => get_theme_mod( 'footer_copyright_text', '' ),
				'authorName'    => get_theme_mod( 'footer_author_name', '' ),
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
