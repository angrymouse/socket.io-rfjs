import { terser } from "rollup-plugin-terser";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
export default {
	input: "client/index.js",
	output: [
		{
			file: "bundle/socket.io-rf.js",
			format: "umd",
			name: "RFConnect",
		},
		{
			file: "test/static/socket.io-rf.js",
			format: "umd",
			name: "RFConnect",
		},
	],
	plugins: [
		nodeResolve(),
		commonjs(),

		//  terser()
	],
};
