<?php
namespace ClientAPI\Controllers;

abstract class ApplicationController extends \WP_REST_Controller {
	protected $namespace = 'client-api/v1';

	protected function render_error( $message, $status = 500 ) {
		return new \WP_REST_Response(
			[
				'data' => [
					'status'  => $status,
					'message' => $message,
				],
			],
			$status
		);
	}

	public function authenticate_user() {
		return is_user_logged_in();
	}

	public function authenticate_with_jwt( $request ) {
		$auth_header = $request->get_header( 'Authorization' );

		if ( empty( $auth_header ) || 0 !== strpos( $auth_header, 'Bearer ' ) ) {
			return $this->render_error( 'Authorization token required', 401 );
		}

		$token = trim( substr( $auth_header, 7 ) );

		if ( empty( $token ) ) {
			return $this->render_error( 'Authorization token required', 401 );
		}

		$auth_service = new \ClientAPI\Services\AuthService();
		$user_id      = $auth_service->validate_jwt_token( $token );

		if ( ! $user_id ) {
			return $this->render_error( 'Invalid token', 401 );
		}

		wp_set_current_user( $user_id );
		return true;
	}

	protected function parse_array_param( $request, $param_name, $fallback = [] ) {
		$value = $request->get_param( $param_name );

		if ( empty( $value ) ) {
			return $fallback;
		}

		if ( is_array( $value ) ) {
			return $value;
		}

		if ( is_string( $value ) ) {
			return array_map( 'trim', explode( ',', $value ) );
		}

		return $fallback;
	}

	protected function handle_wp_error( $error ) {
		$status = $error->get_error_data( 'status' ) ?? 500;
		return $this->render_error( $error->get_error_message(), $status );
	}
}
