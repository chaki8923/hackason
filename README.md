# 環境構築
- docker exec -it node sh
- npx create-react-app . --template typescript --use-npm
- npx eslint --init
```
ESLintのチェックをどこまで行うのですか？
? How would you like to use ESLint? … 
To check syntax only
To check syntax and find problems
To check syntax, find problems, and enforce code style　<-これを選んでください

使っているモジュールは何ですか？
? What type of modules does your project use? … 
JavaScript modules (import/export)<-これを選んでください
CommonJS (require/exports)
None of these

プロジェクトで使用しているフレームワークはどれですか？
? Which framework does your project use? … 
React<-これを選んでください 
Vue.js
None of these

プロジェクトはTypeScriptを使用していますか？
Does your project use TypeScript? · No / Yes <-Yesを選択してください

コードはどこで実行されますか？
 Where does your code run? … (Press <space> to select, <a> to toggle all, <i> to invert selection)
 ✔ Browser<-これを選んでください
 ✔ Node

設定ファイルをどの形式にしますか？
What format do you want your config file to be in? … ❯ 
JavaScript <-これを選んでください
YAML 
JSON

プロジェクトのスタイルをどのように定義しますか？
How would you like to define a style for your project? … 
Use a popular style guide<-これを選んでください
Answer questions about your style
Inspect your JavaScript file(s)
選択した構成には、次の依存関係が必要です。
eslint-plugin-react の最新バージョンを今すぐ npm でインストールしますか?
eslint-plugin-react@latest
? Would you like to install them now with npm? › No / Yes<-Yesを選択してください（npmインストールが始まります）

Successfully created .eslintrc.js file in /front
ESLint was installed locally. We recommend using this local copy instead of your globally-installed copy.
上記の表示が出ればOK
```

```
module.exports = {
    env: {
        browser: true,
        es2021: true,
        "jest/globals": true,<-追記
    },
    extends: [
        "plugin:react/recommended",
        "standard",
        "plugin:@typescript-eslint/recommended",<-追記
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint", "jest"],
    rules: {
        "no-use-before-define": "off",<-追記
        "@typescript-eslint/no-use-before-define": ["error"],<-追記
    },
    settings: {
        react: {
            version: "detect",<-追記
        },
    },
};
```

- npm i -D prettier eslint-config-prettier eslint-plugin-prettier pretty-quick

```
module.exports = {
    env: {
        browser: true,
        es2021: true,
        "jest/globals": true,
    },
    extends: [
        "plugin:react/recommended",
        "standard",
        "plugin:@typescript-eslint/recommended",
        "prettier"<-追記
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint", "jest", "prettier"],<-"prettier"追記
    rules: {
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
        "prettier/prettier": "error",<-追記
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};

```

- npm start

- npx eslint --fix src/**/*.ts*

## バージョンは最新だとなんかうまくいかなかった
- npm install d3@5.15.0

- npm install @types/d3

-http://localhost:3000/にアクセス
