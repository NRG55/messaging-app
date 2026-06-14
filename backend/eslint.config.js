import js from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';

export default [    
    {
        ignores: ['node_modules/', 'dist/', 'build/'],
    },
    
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            '@js': js,
            '@stylistic': stylistic,
        },
        rules: {            
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
            'no-extra-semi': 'error',          
            '@stylistic/indent': ['error', 4, {
                SwitchCase: 1,
                VariableDeclarator: 1,
                MemberExpression: 1,
                FunctionDeclaration: { parameters: 1, body: 1 },
                FunctionExpression: { parameters: 1, body: 1 },
                CallExpression: { arguments: 1 },
                ArrayExpression: 1,
                ObjectExpression: 1,
            }],
            '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/array-bracket-spacing': ['error', 'never'],
            '@stylistic/comma-dangle': ['error', 'always-multiline'],
        },
    },
];