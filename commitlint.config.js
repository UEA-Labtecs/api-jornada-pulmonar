module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-length': [2, 'always', 100],
    'scope-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'perf'],
    ],
    'header-case': [0],
  },
};
