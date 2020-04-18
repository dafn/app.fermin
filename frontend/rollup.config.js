import typescript from "@rollup/plugin-typescript";
import html from "@rollup/plugin-html";
import closure from "@ampproject/rollup-plugin-closure-compiler";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import serve from "rollup-plugin-serve";
import reload from "rollup-plugin-livereload";
import visualizer from "rollup-plugin-visualizer";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import cssnano from "cssnano";
import scss from "rollup-plugin-scss";
import html2 from "rollup-plugin-html2";

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
    template: "src/index.html",
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
    serve({
      port: 8002,
      contentBase: TARGET,
      open: false,
    }),
    reload({
      watch: TARGET,
    })
  );
} else {
  plugins.push(terser({ sourcemap: true }));
}

export default {
  input: "src/index.tsx",
  output: {
    dir: TARGET,
    sourcemap: !isDevelopment,
    format: "iife",
  },
  external: ["react", "react-proptypes"],
  plugins,
};
