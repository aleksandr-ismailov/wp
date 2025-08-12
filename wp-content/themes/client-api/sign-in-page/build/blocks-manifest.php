<?php
// This file is generated. Do not modify it manually.
return array(
	'build' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'client-api/sign-in-page',
		'version' => '0.1.0',
		'title' => 'Sign In Page',
		'category' => 'widgets',
		'attributes' => array(
			'formTitle' => array(
				'type' => 'string',
				'default' => 'Sign In'
			),
			'buttonText' => array(
				'type' => 'string',
				'default' => 'Sign In'
			)
		),
		'supports' => array(
			'align' => true
		),
		'editorScript' => 'file:./index.js'
	)
);
