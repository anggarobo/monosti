import typescript from 'rollup-plugin-typescript2'
import { defineConfig } from 'rollup'
import { terser } from 'rollup-plugin-terser'
import { builtinModules } from 'module'

export default defineConfig([
  {
    input: 'src/main.ts',
    output: {
      file: '.dist/src/main.js',
      format: 'cjs',
      sourcemap: false,
    },
    plugins: [typescript({ tsconfig: './tsconfig.json' }), , terser()],
    external: [
      'electron',
      'node:url',
      ...builtinModules,
    ],
  },
  {
    input: 'src/preload.ts',
    output: {
      file: '.dist/src/preload.js',
      format: 'cjs',
      sourcemap: false,
    },
    plugins: [typescript({ tsconfig: './tsconfig.json' }), , terser()],
    external: [
      'electron',
      'node:url',
      ...builtinModules,
    ],
  }
])
