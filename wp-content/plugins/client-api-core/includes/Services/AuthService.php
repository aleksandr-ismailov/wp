<?php
namespace ClientAPI\Services;

require_once __DIR__ . '/../../vendor/autoload.php';

use Lcobucci\JWT\Configuration;

class AuthService {
	private $domain;
	private $client_id;
	private $client_secret;
	private $config;

	public function __construct() {
		$this->domain        = defined( 'AUTH0_DOMAIN' ) ? AUTH0_DOMAIN : '';
		$this->client_id     = defined( 'AUTH0_CLIENT_ID' ) ? AUTH0_CLIENT_ID : '';
		$this->client_secret = defined( 'AUTH0_CLIENT_SECRET' ) ? AUTH0_CLIENT_SECRET : '';
		$this->config        = Configuration::forUnsecuredSigner();
	}

	public function authenticate_with_auth0( $email, $password ) {
		if ( empty( $this->domain ) || empty( $this->client_id ) || empty( $this->client_secret ) ) {
			return [ 'error' => 'Auth0 config missing: domain=' . $this->domain . ', client_id=' . substr( $this->client_id, 0, 6 ) . '...' ];
		}

		try {
			$url = 'https://' . $this->domain . '/oauth/token';

			$data = [
				'grant_type'    => 'http://auth0.com/oauth/grant-type/password-realm',
				'username'      => $email,
				'password'      => $password,
				'client_id'     => $this->client_id,
				'client_secret' => $this->client_secret,
				'scope'         => 'openid profile email offline_access',
				'realm'         => 'WordPress-API-Users',
			];

			$response = wp_remote_post(
				$url,
				[
					'headers' => [
						'Content-Type' => 'application/json',
					],
					'body'    => wp_json_encode( $data ),
					'timeout' => 30,
				]
			);

			if ( is_wp_error( $response ) ) {
				return [
					'error'   => 'Auth0 connection failed',
					'details' => $response->get_error_message(),
				];
			}

			$body   = wp_remote_retrieve_body( $response );
			$result = json_decode( $body, true );

			if ( ! isset( $result['access_token'] ) ) {
				return [
					'error'   => 'Auth0 login failed',
					'details' => $result,
				];
			}

			return $result;
		} catch ( \Exception $e ) {
			return [ 'error' => 'Auth0 authentication error: ' . $e->getMessage() ];
		}
	}

	public function get_user_info_from_id_token( $id_token ) {
		if ( empty( $id_token ) ) {
			return [];
		}

		try {
			$parser = $this->config->parser();
			$token  = $parser->parse( $id_token );
			$claims = $token->claims();

			$user_info = [];
			foreach ( $claims->all() as $name => $value ) {
				$user_info[ $name ] = $value;
			}

			return $user_info;
		} catch ( \Exception $e ) {
			return [];
		}
	}

	public function authenticate_request() {
		$auth_header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
		$matches     = [];

		if ( empty( $auth_header ) || ! preg_match( '/Bearer\s+(.*)$/i', $auth_header, $matches ) ) {
			return false;
		}

		$access_token = $matches[1];

		if ( ! $this->is_token_valid( $access_token ) ) {
			return false;
		}

		return (object) [
			'ID'           => 'auth0_user',
			'user_email'   => 'authenticated@auth0.com',
			'display_name' => 'Auth0 User',
		];
	}

	private function is_token_valid( $access_token ) {
		try {
			$parser = $this->config->parser();
			$token  = $parser->parse( $access_token );

			if ( ! $token->claims()->has( 'exp' ) ) {
				return false;
			}

			$exp = $token->claims()->get( 'exp' );
			return time() < $exp->getTimestamp();
		} catch ( \Exception $e ) {
			return false;
		}
	}

	public function save_refresh_token( $user_id, $refresh_token ) {
		update_option( 'auth0_refresh_' . $user_id, $refresh_token );
	}

	private function get_refresh_token( $user_id ) {
		return get_option( 'auth0_refresh_' . $user_id, false );
	}

	public function refresh_with_token( $refresh_token ) {
		if ( empty( $this->domain ) || empty( $this->client_id ) || empty( $this->client_secret ) ) {
			return [ 'error' => 'Auth0 config missing' ];
		}

		try {
			$url = 'https://' . $this->domain . '/oauth/token';

			$data = [
				'grant_type'    => 'refresh_token',
				'refresh_token' => $refresh_token,
				'client_id'     => $this->client_id,
				'client_secret' => $this->client_secret,
			];

			$response = wp_remote_post(
				$url,
				[
					'headers' => [
						'Content-Type' => 'application/json',
					],
					'body'    => wp_json_encode( $data ),
					'timeout' => 30,
				]
			);

			if ( is_wp_error( $response ) ) {
				return [
					'error'   => 'Auth0 connection failed',
					'details' => $response->get_error_message(),
				];
			}

			$body   = wp_remote_retrieve_body( $response );
			$result = json_decode( $body, true );

			if ( ! isset( $result['access_token'] ) ) {
				return [
					'error'   => 'Token refresh failed',
					'details' => $result,
				];
			}

			return $result;
		} catch ( \Exception $e ) {
			return [ 'error' => 'Token refresh error: ' . $e->getMessage() ];
		}
	}
}
