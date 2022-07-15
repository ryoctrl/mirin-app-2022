module.exports = {
  extends: ["next/core-web-vitals"],
  plugins: ["import"],
  rules: {
    "import/order": [
      1,
      {
        groups: [
          "builtin",
          "external",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        // alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};
