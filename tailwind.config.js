/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/admin/**/*.{ts,tsx}", "./components/**/*{ts,tsx}"],
  theme: {
    extend: {
      height: {
        128: "32rem",
        150: "37.5rem",
      },
    },
  },
  plugins: [],
};
