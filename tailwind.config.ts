import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-serif)', ...defaultTheme.fontFamily.serif],
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#7d5fff",
          light: "#9b7fff",
          dark: "#5d3fff",
        },
        secondary: {
          DEFAULT: "#00f2ea",
          light: "#33f4ed",
          dark: "#00d9d2",
        },
        space: {
          violet: "#030014",
          black: "#000000",
        }
      },
    },
  },
  plugins: [],
};
export default config;

