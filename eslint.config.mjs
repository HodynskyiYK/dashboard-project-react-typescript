import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import boundaries from "eslint-plugin-boundaries";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["dist", "build", "node_modules"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react": reactPlugin,
      "react-hooks": hooksPlugin,
      "import": importPlugin,
      "boundaries": boundaries,
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: true,
      },
      "boundaries/elements": [
        { type: "app", pattern: "src/app" },
        { type: "pages", pattern: "src/pages" },
        { type: "widgets", pattern: "src/widgets" },
        { type: "features", pattern: "src/features" },
        { type: "entities", pattern: "src/entities" },
        { type: "shared", pattern: "src/shared" },
      ],
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",

      // Сортування імпортів (ESLint не конфліктує тут з Prettier)
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling"], "index"],
          pathGroups: [{ pattern: "@/**", group: "internal", position: "after" }],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // FSD Boundaries
      "boundaries/element-types": [
        "error",
        {
          defaultAllow: false,
          rules: [
            { from: "app", allow: ["pages", "widgets", "features", "entities", "shared"] },
            { from: "pages", allow: ["widgets", "features", "entities", "shared"] },
            { from: "widgets", allow: ["features", "entities", "shared"] },
            { from: "features", allow: ["entities", "shared"] },
            { from: "entities", allow: ["shared"] },
            { from: "shared", allow: ["shared"] },
          ],
        },
      ],
    },
  },
  eslintConfigPrettier
);
