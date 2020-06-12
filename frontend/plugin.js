import fs from "fs";
import path from "path";
// import rimraf from "rimraf";
import * as babel from "@babel/core";

const tempDir = ".stil_temp";
const dirname = path.resolve();

let outputFileName;
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
    if (node.type === "VariableDeclaration" && node.kind === "const") {
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
    }
  }

  if (typeof style !== "string") return undefined;

  ast.program.body.splice(styleIndex, 1);

  const importcss = babel.transformSync(
    `import ${identifier} from "${dirname}/${tempDir}/${outputFileName}.module.scss"`,
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
  identifier: "style",
  extension: ".css",
};

export default function myPlugin(options = defaultOptions) {
  return {
    name: "stil",
    transform(code, id) {
      if (!supportedFormats.includes(path.extname(id))) return;
      if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

      outputFileName = path.basename(id).replace(path.extname(id), "");

      const filepath = `${tempDir}/${outputFileName}.module.${options.extension}`;

      const transformedCode = transform(
        id,
        options.identifier || "style",
        code
      );

      if (transformedCode) {
        // TODO: use this.emitFile
        fs.writeFileSync(filepath, transformedCode.style);
      }

      return {
        code: transformedCode ? transformedCode.code : code,
        map: null,
      };
    },
    buildEnd() {
      // rimraf.sync(tempDir);
    },
  };
}
