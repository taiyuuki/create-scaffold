## Create Scaffold

[中文](./README_zh.md)

Create a custom scaffold using a template.

## Usage

Install

```bash
npm i @taiyuuki/create-scaffold
```

Create project from template

```ts
import { createProject } from '@taiyuuki/create-scaffold'

createProject(templateFolder, options)
```

* `templateFolder` Templates directory

* `options` ：
  * `output`: Project output directory, required.
  * `Any variable`: Variables required to compile `ejs`. 
    You can use command line tools to let users enter, such as [prompts](https://github.com/terkelg/prompts).

### Example

There are the following templates:

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

* Files containing variables need to add `.ejs` as the suffix.
* The remaining files will be directly copied to the project directory.

Take `package.json.ejs` as an example:

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

The variables are wrapped by `<%= %>`.

For more detailed EJS syntax, please refer to [EJS](https://ejs.co/index.html).

Create Project:

```js
import { createProject } from '@taiyuuki/create-scaffold'

createProject('E:/template', {
    output: 'E:/test-project',
    projectName: 'test-project',
    description: 'This is a test project.',
    userName: 'taiyuuki',
    author: 'taiyuuki <taiyuuki@qq.com>',
    devDependencies: JSON.stringify({
        '@taiyuuki/eslint-config-ts': '^0.0.5',
        '@types/node': '^18.11.18',
        'eslint': '^8.10.0',
        'tsup': '^6.4.0'
    })
})
```

The final project `package.json` is as follows.

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

