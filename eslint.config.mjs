import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	pluginReactConfig,
	{
		extends: ['plugin:react/recommended', 'standard', 'prettier'],
	},
	{
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
		},
	},
];
