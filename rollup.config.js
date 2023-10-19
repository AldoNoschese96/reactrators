const dts = require('rollup-plugin-dts').default
const esbuild = require('rollup-plugin-esbuild').default
const name = require('./package.json').main.replace(/\.js$/, '')
const bundle = config => ({
    ...config,
    input: 'src/index.ts',
    external: id => !/^[./]/.test(id),
})

const config = [
    bundle({
        plugins: [
            esbuild(
                {
                    exclude: [/node_modules/],
                    tsconfig: './tsconfig.json',
                }
            )
        ],
        output: [
            {
                file: `${name}.js`,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: `${name}.mjs`,
                format: 'es',
                sourcemap: true,
            },
        ],
    }),
    bundle({
        plugins: [dts()],
        output: {
            file: `${name}.d.ts`,
            format: 'es',
        },
    }),
]

module.exports = config;

