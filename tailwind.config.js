/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f0f0f",
        foreground: "#ffffff",
        primary: "#8B5CF6",
        "primary-dark": "#7c3aed",
        accent: "#FBBF24",
        "accent-dark": "#F59E0B",
        "neutral-dark": "#1a1a1a",
        "neutral-lighter": "#2d2d2d",
        "neutral-light": "#3d3d3d",
      },
      fontFamily: {
        sans: ["GeistSans"],
        mono: ["GeistMono"],
      },
    },
  },
  plugins: [],
}
