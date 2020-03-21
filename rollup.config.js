import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import resolve from 'rollup-plugin-node-resolve';
import typescript from "rollup-plugin-typescript2"
import pkg from "./package.json"

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: 'named',
      name: pkg.name
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
      exports: 'named',
      name: pkg.name
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ], 
  plugins: [
    // Allow Rollup to resolve modules from `node_modules`, since it only
    // resolves local modules by default.
    resolve({
      browser: true,
    }),

    typescript({
      typescript: require("typescript")
    }),

    // Allow Rollup to resolve CommonJS modules, since it only resolves ES2015
    // modules by default.
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/index.js': [
          'cloneElement',
          'createContext',
          'Component',
          'createElement',
        ],
        'node_modules/react-dom/index.js': ['render', 'hydrate'],
        'node_modules/react-is/index.js': [
          'isElement',
          'isValidElementType',
          'ForwardRef',
        ],
      },
    }),

    // Register Node.js builtins for browserify compatibility.
    builtins(),

    // Use Babel to transpile the result, limiting it to the source code.
    babel({
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              node: 'current',
            },
          },
        ],
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'],
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    
    // Register Node.js globals for browserify compatibility.
    globals(),
  ]
}