import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import vueParser from "vue-eslint-parser";

export default [
  js.configs.recommended,

  // ...vue.configs["flat/recommended"],

  {
    // files: ["**/*.ts", "**/*.vue"],
    // languageOptions: {
    //   ecmaVersion: "latest",
    //   sourceType: "module",
    //   parser: vueParser,
    //   parserOptions: {
    //     parser: tsParser,
    //     ecmaVersion: 2022,
    //     sourceType: "module",
    //     extraFileExtensions: [".vue"],
    //   },
    // },
    root: true,
    env: {
      node: true,
      es2021: true,
      "vue/setup-compiler-macros": true,
    },
    // plugins: {
    //   "@typescript-eslint": tsPlugin,
    // },
    extends: [
      "eslint:recommended",
      "@vue/prettier",
      "@vue/typescript/recommended",
      "plugin:vue/vue3-essential",
      "plugin:storybook/recommended",
      "plugin:markdown/recommended",
    ],
    parserOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      "no-console": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-explicit-any": "off",

      // "no-unused-vars": "warn",
      // "@typescript-eslint/no-unused-vars": "warn",
      // "vue/multi-word-component-names": "off",
    },
  },

  {
    // ignores: ["node_modules/**", "dist/**", "build/**"],
  },
];
