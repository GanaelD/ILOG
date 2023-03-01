import {build} from "esbuild";
import copyStaticFiles from "esbuild-copy-static-files"

(async () => {
	try {
		// build client
		await build({
			bundle: true,
			entryPoints: ["src/tablist.ts"],
			minify: false,
			outfile: "dist/bookshop.js",
			sourcemap: true,
			plugins: [copyStaticFiles({
				src: "src",
				dest: "dist",
				dereference: true,
				errorOnExist: false,
				filter: (file) => {
					console.log(`filtering ${file}`)
					return ! file.endsWith(".ts")
				},
				preserveTimestamps: true,
				recursive: true,
			})]
		})
		// build server
		await build({
			bundle: true,
			entryPoints: ["server/src/main.ts"],
			minify: false,
			outfile: "server/dist/main.js",
			platform: "node",
			sourcemap: true
		})
	} catch (error) {
		console.log(error)
	}
})();