<?php
namespace ClientAPI\Controllers\V1;

use ClientAPI\Controllers\ApplicationController;
use ClientAPI\Services\AuthService;

class AuthController extends ApplicationController {
	protected $rest_base = 'auth';

	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/login',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'login' ],
				'permission_callback' => '__return_true',
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/logout',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'logout' ],
				'permission_callback' => '__return_true',
			]
		);
	}

	public function login( $request ) {
		try {
			$user = wp_authenticate(
				$request->get_param( 'username' ),
				$request->get_param( 'password' )
			);

			if ( is_wp_error( $user ) ) {
				return $this->render_error( 'Invalid credentials', 401 );
			}

			$auth_service = new AuthService();
			$data         = [
				'access_token' => $auth_service->generate_jwt_token( $user ),
				'token_type'   => 'Bearer',
				'expires_in'   => 1800,
				'user'         => [
					'id'    => $user->ID,
					'name'  => $user->display_name,
					'email' => $user->user_email,
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

	public function logout( $request ) {
		return new \WP_REST_Response(
			[
				'success' => true,
				'data'    => null,
			],
			204
		);
	}
}
