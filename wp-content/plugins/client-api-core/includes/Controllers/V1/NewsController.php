<?php
namespace ClientAPI\Controllers\V1;

use ClientAPI\Controllers\ApplicationController;
use ClientAPI\Services\NewsService;

class NewsController extends ApplicationController {
	protected $rest_base = 'news';

	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				'methods'             => 'GET',
				'callback'            => [ $this, 'get_items' ],
				'permission_callback' => [ $this, 'authenticate_user' ],
				'args'                => [
					'tags'     => [
						'validate_callback' => function ( $param ) {
							return is_array( $param ) || is_string( $param );
						},
						'sanitize_callback' => 'sanitize_text_field',
					],
					'page'     => [
						'type'    => 'integer',
						'default' => 1,
					],
					'per_page' => [
						'type'    => 'integer',
						'default' => 50,
					],
				],
			]
		);
	}

	public function get_items( $request ) {
		try {
			$tags     = $this->parse_array_param( $request, 'tags', [ 'react', 'nextjs', 'wordpress' ] );
			$page     = $request->get_param( 'page' );
			$per_page = $request->get_param( 'per_page' );

			$result = ( new NewsService() )->get_aggregated_news( $tags, $page, $per_page );

			if ( is_wp_error( $result ) ) {
				return $this->handle_wp_error( $result );
			}

			return rest_ensure_response( $result );
		} catch ( \Exception $e ) {
			return $this->render_error( $e->getMessage(), 500 );
		}
	}
}
