import pluginDelete from 'rollup-plugin-delete';
import pluginTypescript from '@rollup/plugin-typescript';
import pluginCommonjs from '@rollup/plugin-commonjs';
import pluginNodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';


const moduleName = pkg.name.replace(/^@.*\//, '')
const banner = `
/**
 * @license
 * author: ${pkg.author.name} <${pkg.author.email}> (${pkg.author.web})
 * ${moduleName} v${pkg.version}
 * Released under the ${pkg.license} license.
 */
`

export default [
	{
		input: 'src/fakeInput.ts',
		plugins: [
			pluginDelete({
				targets: [
					'build/*',
				]
			}),
		]
	},

	{
		input: 'src/rollup/index.ts',
		output: {
			name: moduleName,
			file: pkg.main,
			format: 'umd',
			sourcemap: true,
			banner,
			exports: 'named',
		},
		plugins: [
			pluginTypescript(),
			pluginCommonjs(),
			pluginNodeResolve(),
			(process.env.NODE_ENV === 'production')? terser() : null
		],
	},
];