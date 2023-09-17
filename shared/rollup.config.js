const typescript = require('@rollup/plugin-typescript')
const terser = require('@rollup/plugin-terser')
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')
const size = require('rollup-plugin-filesize')

const glob = require('glob')
const dedent = require('string-dedent')

// -----------------------------------------------------------------------------

const getCommonJSConfig = () => ({
  input: glob.sync(
    [
      'src/**/*.ts'
    ],
    {
      ignore:
      [
        'src/**/*.test.ts'
      ]
    }),

  output: {
    format: 'cjs',
    sourcemap: true,
    preserveModules: true,
    dir: 'dist'
  },

  external: /@reactory\/.*/,

  plugins: [
    typescript()
  ]
})

// -----------------------------------------------------------------------------

const getUMDConfig = (pkg, name, input, output, plugins) => {
  const version = process.env.SEMANTIC_RELEASE_NEXT_RELEASE_VERSION

  if (!version) {
    throw new Error(`Invalid version, got: "${version}".`)
  }

  const homepage = new URL(pkg.homepage)
  const license = new URL(
    homepage.pathname.split('/', 3).join('/') + '/blob/main/LICENSE',
    homepage.origin
  )

  const baseUMDConfig = {
    output: {
      format: 'umd',
      sourcemap: true,
      banner: dedent`
        /*!
        * ${pkg.name} v${version}
        * ${pkg.homepage}
        *
        * Copyright (c) ${new Date().getFullYear()} ${pkg.author}
        * Released under the ${pkg.license} License
        * ${license}
        *
        * Date: ${new Date().toISOString()}
        */
      `
    },
    plugins: {
      plugins
    }
  }

  return {
    input,

    output: {
      ...baseUMDConfig.output,
      file: output,
      name
    },

    ...baseUMDConfig.plugins
  }
}

// -----------------------------------------------------------------------------

module.exports = (pkg, globalName) => [
  getCommonJSConfig(),
  getUMDConfig(
    pkg,
    globalName,
    'umd/index.ts',
    'dist-umd/index.js',
    [
      typescript(),
      commonjs(),
      resolve(),
      size()
    ]
  ),
  getUMDConfig(
    pkg,
    globalName,
    'umd/index.ts',
    'dist-umd/index.min.js',
    [
      terser(),
      typescript(),
      commonjs(),
      resolve(),
      size()
    ]
  ),
]
