import path from "path";
import * as babel from "@babel/core";
import murmurhash3 from "murmurhash3";

let extractedStyles = {};

const presets = {
  ".ts": ["@babel/preset-typescript"],
  ".tsx": ["@babel/preset-typescript"],
};

const plugins = {
  ".jsx": ["@babel/plugin-syntax-jsx"],
  ".tsx": ["@babel/plugin-syntax-jsx"],
};

const supportedFormats = [".js", ".ts", ".jsx", ".tsx"];

const transform = (filepath, raw) => {
  const ast = babel.transformSync(raw, {
    babelrc: false,
    configFile: false,
    presets: presets[path.extname(filepath)],
    plugins: plugins[path.extname(filepath)],
    filename: path.basename(filepath),
    code: false,
    ast: true,
  }).ast;

  let style, styleIndex;

  for (let [index, node] of Object.entries(ast.program.body)) {
    if (
      node.type === "ExpressionStatement" &&
      node.expression.type === "TaggedTemplateExpression" &&
      node.expression.tag.name === "css"
    ) {
      if (node.expression.quasi.quasis.length > 1)
        throw new Error(
          `stil does not support string interpolation > ${filepath}:${node.expression.quasi.quasis[0].loc.start.line}:1`
        );

      styleIndex = index;
      style = node.expression.quasi.quasis[0].value.raw;
    }
  }

  if (typeof style !== "string") return undefined;

  ast.program.body.splice(styleIndex, 1);

  let code = babel.transformFromAstSync(ast, null, {
    filename: filepath,
    babelrc: false,
    configFile: false,
  }).code;

  return {
    code,
    style,
  };
};

export default (options) => {
  options = {
    extension: "css",
    include: [".js", ".ts", ".jsx", ".tsx"],
    ...options,
  };

  return {
    name: "stil",
    load(id) {
      return extractedStyles[id];
    },
    resolveId(importee) {
      return extractedStyles[importee] && importee;
    },
    transform(code, id) {
      if (!options.include.includes(path.extname(id))) return;
      if (id.replace(__dirname, "").startsWith("/node_modules")) return;

      const outputFileName = murmurhash3.murmur32HexSync(id);
      const outputFilePath = `${path.dirname(id)}/${outputFileName}.module.${
        options.extension
      }`;

      const transformedCode = transform(id, code);

      if (!transformedCode) return;

      extractedStyles[outputFilePath] = transformedCode.style;

      return {
        code: `import css from "${outputFilePath}"; ${transformedCode.code}`,
        map: null,
      };
    },
  };
};
