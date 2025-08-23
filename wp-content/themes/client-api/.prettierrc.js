module.exports = {
	...require('@wordpress/prettier-config'),
	overrides: [
		{
			files: ['*.json'],
			options: {
				parser: 'json',
				printWidth: 1,
			},
		},
		{
			files: ['*.scss'],
			options: {
				singleQuote: false,
			},
		},
	],
};
