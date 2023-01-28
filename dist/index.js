"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  createProject: () => createProject
});
module.exports = __toCommonJS(src_exports);
var import_fast_glob = __toESM(require("fast-glob"));
var import_template = __toESM(require("lodash/template"));
var import_path = require("path");
var import_fs = require("fs");
var import_fs_extra = require("fs-extra");

// src/utils.ts
var replaceSpace = (str) => {
  return str.replace(/[ \f\r\t\v]+\n/g, "\n").replace(/\n[\n]+\n/g, "\n").replace(/\[\s+\]/g, "[]").replace(/{\s+}/g, "{}");
};

// src/index.ts
var createProject = function(templateFolder, options) {
  const files = import_fast_glob.default.sync(["**/*"], { cwd: templateFolder, dot: true });
  for (const rawPath of files) {
    const ext = (0, import_path.extname)(rawPath);
    const targetRelativePath = rawPath.split("/").map((name) => {
      if (name.startsWith("_")) {
        name = name.slice(1);
      }
      if (name.endsWith(".ejs")) {
        name = name.slice(0, name.length - 4);
      }
      return name;
    }).join("/");
    const targetPath = (0, import_path.resolve)(options.output, targetRelativePath);
    const sourcePath = (0, import_path.resolve)(templateFolder, rawPath);
    (0, import_fs_extra.ensureFileSync)(targetPath);
    if (ext === ".ejs") {
      const rawContent = (0, import_fs.readFileSync)(sourcePath, "utf-8");
      const templateCompile = (0, import_template.default)(rawContent, { "interpolate": /<%=([\s\S]+?)%>/g });
      const newContent = targetPath.endsWith(".json") ? JSON.stringify(JSON.parse(templateCompile(options)), null, 2) : templateCompile(options);
      (0, import_fs.writeFileSync)(targetPath, replaceSpace(newContent), "utf-8");
    } else {
      (0, import_fs_extra.copySync)(sourcePath, targetPath);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createProject
});
//# sourceMappingURL=index.js.map