const js = require("@eslint/js");
const vue = require("eslint-plugin-vue");
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const vueParser = require("vue-eslint-parser");

module.exports = [
  js.configs.recommended,

  ...vue.configs["flat/recommended"],

  {
    files: ["**/*.ts", "**/*.vue"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "vue/multi-word-component-names": "off",
    },
  },

  {
    ignores: ["node_modules/**", "dist/**", "build/**"],
  },
];
