import typescript from "rollup-plugin-ts";

export default {
    input: "src/index.ts",
    plugins: [typescript({
        // TypeScript options
        tsconfig: 'tsconfig.json', // Path to your tsconfig.json
    })],
    output: [
        {
            file: "./dist/unicode-range.esm.js",
            format: "esm",
        },
        {
            file: "./dist/unicode-range.js",
            format: "cjs",
            sourcemap: true,
        },
    ],
    treeshake: true,
};