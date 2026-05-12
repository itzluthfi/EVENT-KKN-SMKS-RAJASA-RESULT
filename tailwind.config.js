/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#020617',
        'bg-secondary': '#0a0f1e',
        'primary': '#f1f5f9',
        emerald: {
          DEFAULT: "#10b981",
          light: "#34d399",
          dark: "#059669",
        },
        violet: {
          DEFAULT: "#8b5cf6",
          light: "#a78bfa",
          dark: "#7c3aed",
        },
        cyan: "#06b6d4",
        pink: "#ec4899",
        amber: "#f59e0b",
      },
    },
  },
  plugins: [],
}
