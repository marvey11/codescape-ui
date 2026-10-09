import js from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import globals from "globals";
import jsxA11yX from "eslint-plugin-jsx-a11y-x";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "coverage/**",
      "node_modules/**",
      "storybook-static/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: config.files ?? ["**/*.{ts,tsx,mts,cts}"],
  })),
  jsxA11yX.configs.recommended,
  reactHooks.configs.flat.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    extends: [eslintReact.configs["recommended-typescript"]],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      "jsx-a11y-x": {
        components: { Label: "label", Checkbox: "input", Input: "input" },
      },
    },
    rules: {
      // forwardRef remains useful for a React 19+ library's typed ref API.
      "@eslint-react/no-forward-ref": "off",
    },
  },
  prettier,
);
