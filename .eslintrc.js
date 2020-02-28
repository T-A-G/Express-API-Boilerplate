module.exports = {
  env: {
    browser: true,
    es6: true,
    "jest/globals": true
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins : ['jest'],
  rules: {
    "no-console": "off",
    "no-unused-vars": "warn",
    "import/prefer-default-export": "off",
    "import/no-dynamic-require" : "warn",
    "no-underscore-dangle" : "off",

    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  },
};
