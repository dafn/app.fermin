import fs from "fs";
import path from "path";
import rimraf from "rimraf";
import * as babel from "@babel/core";
import murmurhash3 from "murmurhash3";

const tempDir = ".stil_temp";
const dirname = path.resolve();

let outputFileName;
let outputFilePath;
// let counter = 0;

const presets = {
  ".ts": ["@babel/preset-typescript"],
  ".tsx": ["@babel/preset-typescript"],
};

const plugins = {
  ".jsx": ["@babel/plugin-syntax-jsx"],
  ".tsx": ["@babel/plugin-syntax-jsx"],
};

const supportedFormats = [".js", ".ts", ".jsx", ".tsx"];

const transform = (filepath, identifier, raw) => {
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
    // css``
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

    // const style = ``;
    /* if (node.type === "VariableDeclaration" && node.kind === "const") {
      for (let declaration of node.declarations) {
        if (declaration.id["name"] === identifier) {
          if (declaration.init.type !== "TemplateLiteral")
            throw new Error(
              `stil value must be a TemplateLiteral > ${filepath}:${declaration.loc.start.line}:1`
            );
          if (declaration.init.quasis.length > 1)
            throw new Error(
              `stil does not support string interpolation > ${filepath}:${declaration.loc.start.line}:1`
            );

          styleIndex = index;
          style = declaration.init.quasis[0].value.raw;
        }
      }
    } */
  }

  if (typeof style !== "string") return undefined;

  ast.program.body.splice(styleIndex, 1);

  const importcss = babel.transformSync(
    `import ${identifier} from "${dirname}/${outputFilePath}"`,
    {
      filename: filepath,
      babelrc: false,
      configFile: false,
      ast: true,
      code: false,
    }
  );

  ast.program.body.unshift(importcss.ast.program.body[0]);

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

const defaultOptions = {
  identifier: "css",
  extension: "css",
};

export default function myPlugin(options = defaultOptions) {
  return {
    name: "stil",
    transform(code, id) {
      if (!supportedFormats.includes(path.extname(id))) return;
      if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

      // if (!supportedFormats.includes(path.basename(id))) return;

      outputFileName = murmurhash3.murmur32HexSync(id);
      outputFilePath = `${tempDir}/${outputFileName}.module.${
        options.extension || defaultOptions.extension
      }`;

      const transformedCode = transform(
        id,
        options.identifier || defaultOptions.identifier,
        code
      );

      if (transformedCode) {
        // TODO: use this.emitFile
        fs.writeFileSync(outputFilePath, transformedCode.style);
      }

      return {
        code: transformedCode ? transformedCode.code : code,
        map: null,
      };
    },
    buildEnd() {
      if (process.env.ROLLUP_WATCH !== "true") rimraf.sync(tempDir);
    },
  };
}
