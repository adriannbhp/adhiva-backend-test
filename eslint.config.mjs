import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
    { ignores: ['dist', 'node_modules', 'src/generated/**'] },

    // Base JS rules
    js.configs.recommended,

    // TS recommended (type-aware)
    ...tseslint.configs.recommendedTypeChecked.map((cfg) => ({
        ...cfg,
        languageOptions: {
            ...cfg.languageOptions,
            parserOptions: {
                ...cfg.languageOptions?.parserOptions,
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    })),

    // Project rules (+ plugins)
    {
        files: ['**/*.ts'],
        plugins: {
            import: importPlugin,
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-require-imports': 'error',

            'import/order': 'off',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    },

    {
        files: ['src/core/**/*.ts'],
        rules: {
            'no-restricted-imports': [
                'error',
                { patterns: ['src/infra/*', 'src/interface/*', 'src/di/*'] },
            ],
        },
    },
]);
