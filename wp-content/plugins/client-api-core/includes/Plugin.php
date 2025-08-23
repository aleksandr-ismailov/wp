<?php
namespace ClientAPI;

class Plugin {
	private static $instance = null;

	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_controllers' ] );
	}

	public function register_controllers() {
		$controllers_dir = __DIR__ . '/Controllers/V1/';
		$namespace       = 'ClientAPI\\Controllers\\V1\\';

		foreach ( glob( $controllers_dir . '*Controller.php' ) as $file ) {
			$class_name = $namespace . basename( $file, '.php' );
			if ( class_exists( $class_name ) ) {
				( new $class_name() )->register_routes();
			}
		}
	}
}
