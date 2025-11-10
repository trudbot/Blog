import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


export default [
    {
        ignores: [".vitepress/dist/**", ".vitepress/cache/**", "node_modules/**", "_posts/**"],
    },
    {
        languageOptions: { globals: globals.browser }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    {
        files: ["**/*.cjs"],
        languageOptions: { globals: globals.node},
        rules: {
            "@typescript-eslint/no-require-imports": "off"
        }
    },
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        rules: {
            "indent": ["error", 4],
            "semi": ["error", "always"],
        }
    },
    {
        files: ["**/*.{ts,mts,cts,tsx}"],
        rules: {
            "indent": ["error", 4],
            "semi": ["error", "always"],
        }
    },
    {
        files: ["**/*.vue"],
        languageOptions: {parserOptions: {parser: tseslint.parser}},
        rules: {
            "vue/html-indent": ["error", 4],
            "vue/multi-word-component-names": "off",
            "semi": ["error", "always"],
        },
    },
];