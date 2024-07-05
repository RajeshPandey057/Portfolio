// @ts-check
import js from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-plugin-prettier/recommended';
import svelte from 'eslint-plugin-svelte';
import vitest from 'eslint-plugin-vitest';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import ts from 'typescript-eslint';

/** @type {import('typescript-eslint').Config} */
export default ts.config(
	js.configs.recommended,
	...ts.configs.recommendedTypeChecked,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		...playwright.configs['flat/recommended'],
		files: ['tests/**'], // or any other pattern
		plugins: {
			vitest
		},
		rules: {
			...vitest.configs.recommended.rules
		},
		settings: {
			vitest: {
				typecheck: true
			}
		},
		languageOptions: {
			globals: {
				...vitest.environments.env.globals
			}
		}
	},
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: { ...globals.node, ...globals.browser },
			parserOptions: {
				project: true,
				parser: ts.parser,
				extraFileExtensions: ['.svelte'],
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	{
		files: ['**/*.svelte', '*.svelte'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: { ...globals.browser },
			parser: svelteParser,
			parserOptions: {
				parser: ts.parser,
				extraFileExtensions: ['.svelte']
			}
		},
		rules: {
			'import/no-named-as-default': 'off',
			'import/no-named-as-default-member': 'off',
			'svelte/no-target-blank': 'error',
			'svelte/no-at-debug-tags': 'error',
			'svelte/no-reactive-functions': 'error',
			'svelte/no-reactive-literals': 'error'
		}
	},
	{
		rules: {
			semi: ['warn', 'always'],
			quotes: ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
			'no-nested-ternary': 'error',
			'linebreak-style': ['error', 'unix'],
			'no-cond-assign': ['error', 'always'],
			'@typescript-eslint/sort-type-constituents': 'error',
			'no-console': ['error', { allow: ['warn', 'error'] }]
		}
	},
	{
		files: ['**/*.config.*'],
		extends: [ts.configs.disableTypeChecked]
	},
	{
		ignores: [
			'coverage',
			'**/dist',
			'**/build',
			'**/.husky',
			'**/package',
			'**/dev-dist',
			'**/.svelte-kit',
			'**/docker-data',
			'**/node_modules',
			'src/lib/i18n/*.ts',
			'.env',
			'.env.*',
			'!*.cjs',
			'yarn.lock',
			'.DS_Store',
			'!.env.example',
			'pnpm-lock.yaml',
			'package-lock.json'
		]
	}
);
