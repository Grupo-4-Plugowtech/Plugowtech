/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'principal': '#2C2C2C',
        'cinza': '#D9D9D9'

      },

      backgroundImage: {
        baner1: "url('../src/img/fundo/Baner1.svg')",
        parcerias: "url('../src/img/fundo/parcerias.svg')",
        premiação: "url('../src/img/fundo/premiaçao.svg')",
    }
    },
  },
  plugins: [],
}

