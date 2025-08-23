<?php
namespace ClientAPI\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthService {
	public function generate_jwt_token( $user ) {
		$payload = [
			'iss'   => get_site_url(),
			'aud'   => get_site_url(),
			'sub'   => $user->ID,
			'iat'   => time(),
			'exp'   => time() + ( 30 * 60 ),
			'scope' => 'api:read api:write',
		];

		return JWT::encode( $payload, JWT_AUTH_SECRET_KEY, 'HS256' );
	}

	public function validate_jwt_token( $token ) {
		try {
			$decoded = JWT::decode( $token, new Key( JWT_AUTH_SECRET_KEY, 'HS256' ) );
			return $decoded->sub;
		} catch ( Exception $e ) {
			return false;
		}
	}
}
