module.exports = {
  extends: ["eslint-config-airbnb-typescript"],
  rules: {
    "no-alert": "off",
    quotes: "double",
    "import/extensions": [
      "error",
      "never",
      {
        ts: "never",
        tsx: "never",
        js: "never",
        jsx: "never"
      }
    ],
    "react/jsx-filename-extension": [
      "error",
      { extensions: [".js", ".jsx", ".ts", ".tsx", "mdx"] }
    ]
  },
  parserOptions: {
    project: "./tsconfig.json"
  }
}
