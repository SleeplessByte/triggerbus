import babel from 'rollup-plugin-babel'

export default [
    {
        input: 'src/triggerbus.js',
        output: [
            {
                file: 'dist/triggerbus.js',
                format: 'es'
            },
            {
                file: 'dist/triggerbus.csj.js',
                format: 'cjs',
            },
            {
                file: 'dist/triggerbus.amd.js',
                format: 'amd'
            },
            {
                file: 'dist/triggerbus.iife.js',
                format: 'iife',
                name: 'triggerbus'
            },
            {
                file: 'dist/triggerbus.umd.js',
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
            file: 'dist/triggerbus.mjs',
            format: 'es'
        }
    }
]
