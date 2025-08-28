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
		$auth_service = new \ClientAPI\Services\AuthService();
		$user         = $auth_service->authenticate_request();

		return $user ? true : is_user_logged_in();
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
