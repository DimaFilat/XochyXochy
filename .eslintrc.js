module.exports = {
  env: {
    browser: true,
    node: true
  },
  parser: "babel-eslint",
  extends: ["airbnb", "prettier"],
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "comma-dangle": ["error", "never"],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "class-methods-use-this": "off",
    "max-len": ["error", 80]
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx"]
      }
    }
  }
};
