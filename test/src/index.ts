import { createProject } from 'create-scaffold'
import path from 'path'

createProject('../template', {
  output: path.join(__dirname, '../test-project'),
  projectName: 'test-project',
  description: 'This is a test project.',
  userName: 'taiyuuki',
  author: 'taiyuuki <taiyuuki@qq.com>',
  devDependencies: JSON.stringify({
    '@taiyuuki/eslint-config-ts': '^0.0.5',
    '@types/node': '^18.11.18',
    'eslint': '^8.10.0',
    'tsup': '^6.4.0',
  }),
})