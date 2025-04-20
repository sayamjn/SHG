/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#f5f8fa',
            100: '#e5eef5',
            200: '#d1e2ee',
            300: '#b3cfe0',
            400: '#8db6d2',
            500: '#6e9ec1',
            600: '#5784ac',
            700: '#476c8f',
            800: '#3c5978',
            900: '#354a63',
            950: '#233141',
          },
          secondary: {
            50: '#fef2f2',
            100: '#fde6e6',
            200: '#fbd0d0',
            300: '#f8aeae',
            400: '#f47f7f',
            500: '#ee5757',
            600: '#da3737',
            700: '#b72a2a',
            800: '#982525',
            900: '#7e2525',
            950: '#441010',
          },
        },
        fontFamily: {
          sans: ['Poppins', 'Arial', 'sans-serif'],
        },
      },
    },
    plugins: [],
    safelist: [
      {
        pattern: /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)/,
      },
      {
        pattern: /bg-(primary|secondary)-(50|100|200|300|400|500|600|700|800|900|950)/,
      },
      {
        pattern: /text-(primary|secondary)-(50|100|200|300|400|500|600|700|800|900|950)/,
      },
    ],
  }