<?php
namespace ClientAPI\Controllers\V1;

use ClientAPI\Controllers\ApplicationController;

class SidebarController extends ApplicationController {
	protected $rest_base = 'home-page-sidebars';

	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				'methods'             => 'GET',
				'callback'            => [ $this, 'get_sidebars' ],
				'permission_callback' => [ $this, 'authenticate_user' ],
			]
		);
	}

	public function get_sidebars( $request ) {
		try {
			$home_page = get_page_by_path( 'home' );
			if ( ! $home_page ) {
				$home_page_id = get_option( 'page_on_front' );
				$home_page    = $home_page_id ? get_post( $home_page_id ) : null;
			}

			if ( ! $home_page ) {
				return $this->render_error( 'Home page not found', 404 );
			}

			$blocks          = parse_blocks( $home_page->post_content );
			$sidebar_content = [
				'leftSidebarContent'  => '',
				'rightSidebarContent' => '',
			];

			foreach ( $blocks as $block ) {
				if ( 'client-api/sidebar-content' === $block['blockName'] && ! empty( $block['attrs'] ) ) {
					$sidebar_content = array_merge( $sidebar_content, $block['attrs'] );
					break;
				}
			}

			$data = [
				'leftSidebar'  => [ 'content' => $sidebar_content['leftSidebarContent'] ],
				'rightSidebar' => [ 'content' => $sidebar_content['rightSidebarContent'] ],
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
