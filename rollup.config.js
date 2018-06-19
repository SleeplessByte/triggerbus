import babel from 'rollup-plugin-babel'

export default [
    {
        input: 'src/triggerbus.js',
        output: [
            {
                file: 'dist/es/triggerbus.js',
                format: 'es'
            },
            {
                file: 'dist/cjs/triggerbus.js',
                format: 'cjs',
            },
            {
                file: 'dist/amd/triggerbus.js',
                format: 'amd'
            },
            {
                file: 'dist/iife/triggerbus.js',
                format: 'iife',
                name: 'triggerbus'
            },
            {
                file: 'dist/umd/triggerbus.js',
                format: 'umd',
                name: 'triggerbus'
            }
        ],
        plugins: [
        babel({
            exclude: 'node_modules/**'
        })
        ]
    },
    {
        input: 'src/triggerbus.js',
        output: {
            file: 'dist/mjs/triggerbus.mjs',
            format: 'es'
        }
    }
]
