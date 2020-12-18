import closure from "@ampproject/rollup-plugin-closure-compiler";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import reload from "rollup-plugin-livereload";
import visualizer from "rollup-plugin-visualizer";
import { terser } from "rollup-plugin-terser";
import html2 from "rollup-plugin-html2";
import cssnano from "cssnano";
import stil from "./plugins/rollup-plugin-stil";

const template = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <script id="env"></script>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="shortcut icon"
        type="image/svg+xml"
        href="assets/favicon.png"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
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
  stil({
    extension: "scss",
    include: [".tsx"],
  }),
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
  html2({
    template,
    fileName: "index.html",
  }),
];

if (isDevelopment) {
  plugins.push(
    reload({
      watch: TARGET,
    })
  );
} else {
  plugins.push(closure());
  plugins.push(terser());
  plugins.push(
    visualizer({
      filename: `${TARGET}/stats.html`,
    })
  );
}

export default {
  input: "src/app/index.tsx",
  output: {
    file: isDevelopment
      ? `${TARGET}/index.js`
      : `${TARGET}/index.${new Date().getTime()}.js`,
    sourcemap: !isDevelopment,
    format: "umd",
  },
  plugins,
};
