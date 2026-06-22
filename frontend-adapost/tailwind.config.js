/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'paw-900': '#3A0519', // Vișiniul tău de bază
        'paw-700': '#670D2F', 
        'paw-500': '#0C7779', 
        'paw-300': '#4A8E94', // Un teal un pic mai intens ca să aibă contrast bun pe text alb
        'paw-bg':  '#F7F5F0', // Fildeș cald (fără pic de roz) - perfect cu teal-ul
      }
      // colors: {
      //   'paw-900':'#3A0519', 
      //   'paw-700': '#670D2F', 
      //   'paw-500': '#A53860', 
      //   'paw-300': '#7EACB5',//'#EF88AD', 
      //   'paw-bg':  '#F8F4F5',
      // }
    },
  },
  plugins: [],
}