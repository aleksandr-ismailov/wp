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
				'permission_callback' => [ $this, 'authenticate_user' ],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/refresh',
			[
				'methods'             => 'POST',
				'callback'            => [ $this, 'refresh' ],
				'permission_callback' => '__return_true',
			]
		);
	}

	public function login( $request ) {
		try {
			$params = $request->get_json_params();

			if ( empty( $params['email'] ) || empty( $params['password'] ) ) {
				return $this->render_error( 'Email and password are required', 400 );
			}

			$email    = sanitize_email( $params['email'] );
			$password = $params['password'];

			$auth_service = new AuthService();
			$auth_result  = $auth_service->authenticate_with_auth0( $email, $password );

			if ( ! $auth_result || ! isset( $auth_result['access_token'] ) ) {
				$debug_info = $auth_result ? wp_json_encode( $auth_result ) : 'No response from Auth0';
				return $this->render_error( 'Invalid credentials. Debug: ' . $debug_info, 401 );
			}

			$access_token  = $auth_result['access_token'];
			$id_token      = $auth_result['id_token'] ?? '';
			$refresh_token = $auth_result['refresh_token'] ?? '';
			$expires_in    = $auth_result['expires_in'] ?? 3600;

			// Декодируем id_token для получения user_id
			$user_info = [];
			if ( ! empty( $id_token ) ) {
				$user_info = $auth_service->get_user_info_from_id_token( $id_token );
			}

			$user_id = $user_info['sub'] ?? 'unknown';

			// Сохраняем refresh_token в БД для управления сессиями
			if ( ! empty( $refresh_token ) ) {
				$auth_service->save_refresh_token( $user_id, $refresh_token );
			}

			$response_data = [
				'accessToken'  => $access_token,
				'idToken'      => $id_token,
				'refreshToken' => $refresh_token, // ✅ Клиент получает refresh_token
				'tokenType'    => 'Bearer',
				'expiresIn'    => $expires_in,
				'user'         => [
					'id'    => $user_id,
					'name'  => $user_info['name'] ?? $user_info['email'] ?? $email,
					'email' => $user_info['email'] ?? $email,
				],
			];

			return new \WP_REST_Response( $response_data, 200 );

		} catch ( \Exception $e ) {
			return $this->render_error( $e->getMessage(), 500 );
		}
	}

	public function logout( $request ) {
		try {
			wp_logout();

			return new \WP_REST_Response(
				[
					'success' => true,
					'message' => 'Successfully logged out',
				],
				200
			);

		} catch ( \Exception $e ) {
			return $this->render_error( $e->getMessage(), 500 );
		}
	}

	public function refresh( $request ) {
		try {
			$params = $request->get_json_params();

			if ( empty( $params['refreshToken'] ) ) {
				return $this->render_error( 'Refresh token is required', 400 );
			}

			$refresh_token = sanitize_text_field( $params['refreshToken'] );

			$auth_service   = new AuthService();
			$refresh_result = $auth_service->refresh_with_token( $refresh_token );

			if ( ! $refresh_result || ! isset( $refresh_result['access_token'] ) ) {
				return $this->render_error( 'Token refresh failed', 401 );
			}

			$response_data = [
				'accessToken'  => $refresh_result['access_token'],
				'idToken'      => $refresh_result['id_token'] ?? '',
				'refreshToken' => $refresh_result['refresh_token'] ?? $refresh_token,
				'tokenType'    => 'Bearer',
				'expiresIn'    => $refresh_result['expires_in'] ?? 3600,
			];

			return new \WP_REST_Response( $response_data, 200 );

		} catch ( \Exception $e ) {
			return $this->render_error( $e->getMessage(), 500 );
		}
	}
}
