/* eslint-env node */
module.exports = {
	root: true,
	'extends': [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		semi: ['error', 'always',],
		'comma-dangle': ['error', {
			arrays: 'always',
			objects: 'always',
		},],
		'object-curly-spacing': ['error', 'always',],
		indent: ['error', 'tab',],
		quotes: ['error', 'single',],
	},
};
