import typescript from "@rollup/plugin-typescript";
import closure from "@ampproject/rollup-plugin-closure-compiler";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import reload from "rollup-plugin-livereload";
import visualizer from "rollup-plugin-visualizer";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import cssnano from "cssnano";
import html2 from "rollup-plugin-html2";

const template = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <script id="iwa"></script>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto+Mono"
      />
      <title>app.fermin</title>
    </head>
    <body>
    </body>
  </html>
`;

const isDevelopment = process.env.NODE_ENV === "development";
const TARGET = "dist";

const plugins = [
  resolve(),
  commonjs({ include: "node_modules/**", extensions: [".js", ".ts"] }),
  typescript(),
  postcss({
    extract: true,
    plugins: isDevelopment
      ? []
      : [
          cssnano({
            preset: "default",
          }),
        ],
  }),
  closure(),
  html2({
    template,
    fileName: "index.html",
  }),
  visualizer({
    filename: `${TARGET}/stats.html`,
  }),
  alias({
    entries: [
      { find: "React", replacement: "preact" },
      { find: "React.createElement", replacement: "preact.h" },
      { find: "React.ProtoTypes", replacement: "{ func:{} }" },
    ],
  }),
];

if (isDevelopment) {
  plugins.push(
    reload({
      watch: TARGET,
    })
  );
} else {
  plugins.push(terser({ sourcemap: true }));
}

export default {
  input: "src/app/index.tsx",
  output: {
    dir: TARGET,
    sourcemap: !isDevelopment,
    format: "iife",
  },
  external: ["react", "react-proptypes"],
  plugins,
};
