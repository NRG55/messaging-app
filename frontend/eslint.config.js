import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';

export default [
    {
        ignores: ['dist', 'node_modules', 'build'],
    },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser, // Enables browser terms like window/document without error
            },
        },
        plugins: {
            '@js': js,
            'react': reactPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            '@stylistic': stylistic,
        },
        settings: {
            react: {
                version: 'detect', // Auto-detects installed React version (18, 19, etc.)
            },
        },
        rules: {
            // Enforces ESLint to scan JSX markup for used imports
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            
            // --- CORE JAVASCRIPT & REACT LOGIC ---
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Flags unused code variables safely
            'no-console': ['warn', { allow: ['warn', 'error'] }],    // Discourages leaving debug consoles in builds
            'no-extra-semi': 'error',
            'react/react-in-jsx-scope': 'off',                       // Disabled: React 17+ doesn't need imports on top
            'react/prop-types': 'off',                               // Disabled: Modern code uses parameters directly

            // --- REACT HOOKS LAWS ---
            'react-hooks/rules-of-hooks': 'error',                   // Hard error if hook sits in an IF or Loop
            'react-hooks/exhaustive-deps': 'warn',                   // Flags missing array values inside useEffect

            // --- VITE HOT MODULE RELOADING SAFETY ---
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

            // --- UNIFIED CODE FORMATION & ROW ALIGNMENT (4 SPACES) ---
            '@stylistic/indent': ['error', 4, {
                SwitchCase: 1,
                VariableDeclarator: 1,
                outerIIFEBody: 1,
                MemberExpression: 1,
                FunctionDeclaration: { parameters: 1, body: 1 },
                FunctionExpression: { parameters: 1, body: 1 },
                CallExpression: { arguments: 1 },
                ArrayExpression: 1,
                ObjectExpression: 1,
                ImportDeclaration: 1,
                flatTernaryExpressions: false,
                ignoreComments: false,
            }],
            '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/jsx-quotes': ['error', 'prefer-double'], // Double quotes inside components matching HTML
            '@stylistic/semi': ['error', 'always'],              // Requires ending row semicolons
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/array-bracket-spacing': ['error', 'never'],
            '@stylistic/comma-dangle': ['error', 'always-multiline'], // Clean Git differences tracking logs
        },
    },
];
