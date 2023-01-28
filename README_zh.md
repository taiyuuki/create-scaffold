## Create Scaffold

使用模板创建自定义脚手架

## 使用

安装

```bash
npm i @taiyuuki/create-scaffold
```

根据模板创建项目

```ts
import { createProject } from '@taiyuuki/create-scaffold'

createProject(templateFolder, options)
```

* `templateFolder` 模板所在目录

* `options` 配置对象，属性：
  * `output`: 项目输出目录，必需。
  * 变量：编译ejs需要的变量，通常是用命令行工具让用户输入，例如[prompts](https://github.com/terkelg/prompts)。

### 示例

假设有如下模板：

```bash
E:/template
    ├─src
    │  └─index.ts
    ├─.eslintignore
    ├─.eslintrc.js
    ├─.gitignore
    ├─.npmrc
    ├─package.json.ejs
    ├─README.md.ejs
    ├─tsconfig.json
    └─tsup.config.ts
```

* 含有变量的文件需要添加`.ejs`为后缀。
* 其余文件会直接复制到项目目录。

以`package.json.ejs`为例，内容如下：

```ejs
{
  "name": "<%= projectName %>",
  "version": "0.0.1",
  "description": "<%= description %>",
  "main": "./dist/index.js",
  <% if (userName !== '') { %> 
  "repository": {
    "type": "git",
    "url": "https://github.com/<%= userName %>/<%= projectName %>"
  },
  "bugs": "https://github.com/<%= userName %>/<%= projectName %>/issues",
  "homepage": "https://github.com/<%= userName %>/<%= projectName %>#readme",
  <% } %>
  "scripts": {
    "lint": "eslint --ext .js,.ts ./",
    "dev": "tsup --watch",
    "build": "tsup"
  },
  "keywords": [],
  "author": "<%= author %>",
  "license": "MIT",
  "files": [
    "dist"
  ],
  "devDependencies": <%= devDependencies %>,
  "dependencies": {
  }
}
```

变量使用`<%=  %>`包裹。

更详细EJS的语法可以参考[EJS](https://ejs.co/index.html)，[EJS 中文文档](https://ejs.bootcss.com/#promo)

根据模板创建项目：

```js
import { createProject } from '@taiyuuki/create-scaffold'

createProject('E:/template', {
    output: 'E:/test-project',
    projectName: 'test-project',
    description: 'This is a test project.',
    userName: 'taiyuuki',
    author: 'taiyuuki <taiyuuki@xxx.com>',
    devDependencies: JSON.stringify({
        '@taiyuuki/eslint-config-ts': '^0.0.5',
        '@types/node': '^18.11.18',
        'eslint': '^8.10.0',
        'tsup': '^6.4.0'
    })
})
```

最终创建的项目`package.json`如下：

```json
{
  "name": "test-project",
  "version": "0.0.1",
  "description": "This is a test project.",
  "main": "./dist/index.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/taiyuuki/test-project"
  },
  "bugs": "https://github.com/taiyuuki/test-project/issues",
  "homepage": "https://github.com/taiyuuki/test-project#readme",
  "scripts": {
    "lint": "eslint --ext .js,.ts ./",
    "dev": "tsup --watch",
    "build": "tsup"
  },
  "keywords": [],
  "author": "taiyuuki <taiyuuki@qq.com>",
  "license": "MIT",
  "files": [
    "dist"
  ],
  "devDependencies": {
    "@taiyuuki/eslint-config-ts": "^0.0.5",
    "@types/node": "^18.11.18",
    "eslint": "^8.10.0",
    "tsup": "^6.4.0"
  },
  "dependencies": {}
}
```

