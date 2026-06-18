import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      bebas: ['var(--font-bebas)', 'sans-serif'],
      orbitron: ['var(--font-orbitron)', 'sans-serif'],
      inter: ['var(--font-inter)', 'sans-serif'],
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glitch": {
          "0%":   { textShadow: "2px 2px 0 #e91e63, -2px -2px 0 #00bcd4", clipPath: "inset(0 0 95% 0)" },
          "50%":  { textShadow: "-2px -2px 0 #e91e63, 2px 2px 0 #00bcd4",  clipPath: "inset(40% 0 40% 0)" },
          "100%": { textShadow: "none", clipPath: "inset(0 0 0 0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%":      { opacity: "0.5", filter: "brightness(1.5)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "rotate-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "glitch":         "glitch 0.15s steps(1) infinite",
        "pulse-glow":     "pulse-glow 2.5s ease-in-out infinite",
        "float":          "float 4s ease-in-out infinite",
        "shimmer":        "shimmer 3s linear infinite",
        "rotate-slow":    "rotate-slow 20s linear infinite",
      },
      aspectRatio: {
        "2/3": "2 / 3",
        "16/9": "16 / 9",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
