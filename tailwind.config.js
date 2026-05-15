/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E84118", // Bold red-orange
        secondary: "#F97316", // Orange
        dark: "#1A1A1A", // Near black
        accent: "#FF6B35", // Bright orange
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Barlow Condensed', 'Impact', 'sans-serif'],
        body: ["Inter", "sans-serif"],
        athletic: ["Barlow Condensed", "sans-serif"],
      },
      screens: {
        'xs': '475px',
        '2xl': '1440px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
};

module.exports = config;
