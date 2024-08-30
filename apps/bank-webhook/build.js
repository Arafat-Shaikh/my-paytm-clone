const { build } = require("esbuild");

build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  minify: true,
  platform: "node", // or 'browser', depending on your target
  tsconfig: "tsconfig.json", // Optional, if you have a custom tsconfig
}).catch(() => process.exit(1));
