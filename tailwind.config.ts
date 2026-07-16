import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A5F",
          foreground: "#F8FAFC",
        },
        secondary: {
          DEFAULT: "#3B82F6",
          foreground: "#F8FAFC",
        },
        accent: {
          DEFAULT: "#10B981",
          foreground: "#F8FAFC",
        },
        background: "#F8FAFC",
        surface: "#FFFFFF",
        ink: "#1E293B",
        muted: {
          DEFAULT: "#64748B",
          foreground: "#64748B",
        },
        border: "#E2E8F0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
