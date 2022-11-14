/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    
    extend: {
      'pequeño': '320px',
      'xlg': '1440px',


      margin: {
        "100px": "100px",
      },
    },
  },

  plugins: [],
};
