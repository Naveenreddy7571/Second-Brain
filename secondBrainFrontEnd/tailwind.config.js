const { fontFamily } = require('tailwindcss/defaultTheme');
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', ...fontFamily.sans],
      },
      fontSize: {
        base: ['24px', '1.5em'], 
      },
      letterSpacing: {
        tight: '-1px', 
      },
    },
  },
  plugins: [],
});
