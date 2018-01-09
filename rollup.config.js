import resolve      from 'rollup-plugin-node-resolve'
import commonjs     from 'rollup-plugin-commonjs'
import buble        from 'rollup-plugin-buble';

const NAME = 'Chef';

export default {
  input   : 'src/index.js',
  output  : [
    {
      file  : 'umd.js',
      format: 'umd',
      name  :  NAME
    },
    {
      file  : 'cjs.js',
      format: 'cjs',
    },
    {
      file  : 'iife.js',
      format: 'iife',
      name  :  NAME
    }
  ],
  sourceMap: false,
  //external: ['preact','statenano'],
  watch : {
    chokidar: {},
    exclude: ['node_modules/**']
  },
  plugins: [ 
    resolve({
      jsnext: true,
      main: true,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    buble()
  ]
}
