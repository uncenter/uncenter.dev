import { defineEslintConfig } from '@uncenter/eslint-config';

export default defineEslintConfig({
	preset: 'base',
	plugins: {
		import: false,
	},
	globals: {
		node: true,
		browser: true,
	},
	ignores: ['src/assets/scripts/*.js'],
	rules: {
		'unicorn/prefer-module': 'off',
	},
});
