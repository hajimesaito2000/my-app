import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import grobals from 'globals';
import { dirname } from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';
import { a11yRules } from './configs/eslint/a11y.config.mjs';
import { nextjsRules } from './configs/eslint/nextjs.config.mjs';
import { tsRules } from './configs/eslint/ts.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config({
  // 設定オブジェクトを適用し、その中に含まれるルールを有効にする
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    jsxA11y.configs.recommended,
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ],
  // src以下のts,tsxファイルを対象にする
  files: ['src/**/*.{ts, tsx}'],
  // files: ["*.js", ".mjs", "*.jsx", "*.ts", "*/tsx"],
  // ESLint がコードを解析（パース）および評価する際の、言語や環境に関する設定
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parser: tseslint.parser,
    globals: {
      ...grobals.browser,
      ...grobals.node,
    },
    parserOptions: {
      project: true, // tsconfig.json を自動で見つける (v6+)
      tsconfigRootDir: __dirname, // プロジェクトルートを指定
    },
  },
  // プラグインの登録
  plugins: {
    'react-hooks': reactHooks,
    'unused-imports': unusedImports,
    jsdoc: jsdoc,
    'jsx-a11y': jsxA11y,
    react: react,
    import: importPlugin,
  },
  // ルールの登録
  rules: {
    ...reactHooks.configs.recommended.rules,
    ...tsRules,
    ...a11yRules,
    ...importRules,
    ...jsdoc,
    ...nextjsRules,
  },
});

// export default tseslint.config(
//   {
//     // グローバルで読み込むファイルの拡張子
//     files: ["*.js", "*.jsx", "*.ts", "*/tsx"],
//   },
//   {
//     // グローバルで無視するファイル
//     ignores: [
//       "**/*.[mc]js",
//       "env.d.ts",
//       "**/.next/**/*",
//       "*/config.*",
//       "**/*.module.scss.d.ts",
//     ],
//   },
//   eslint.configs.recommended,
//   tseslint.configs.strictTypeChecked,
//   tseslint.configs.stylisticTypeChecked,
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
//   {
//     // @typescript-eslintに関する設定
//     languageOptions: {
// parser: tseslint.parser,
// parserOptions: {
//   project: true,
//   tsconfigRootDir: __dirname,
// },
//     },
//     rules: {
//       // eslintのルールを上書き
//       // typeで統一
//       "@typescript-eslint/consistent-type-definitions": ["error", "type"],
//       // asをanyにしない
//       "@typescript-eslint/no-unsafe-assignment": "error",
//       // async/awaitを使うべきではないとき
//       "@typescript-eslint/no-misused-promises": [
//         "error",
//         {
//           checksVoidReturn: false,
//         },
//       ],
//       // 関数とクラスメソッドに明示的な戻り値の型を要求をしない
//       "@typescript-eslint/explicit-function-return-type": "off",
//       // 型注釈
//       "@typescript-eslint/typedef": "error",
//       // switch-case ステートメントの網羅性をチェック
//       "@typescript-eslint/switch-exhaustiveness-check": "error",
//       // 接尾演算子を使用した null 以外のアサーションを禁止
//       "@typescript-eslint/no-non-null-assertion": "error",
//     },
//   }
// );
