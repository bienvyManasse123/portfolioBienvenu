import type { Config } from "tailwindcss"
 
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#00e676",       // ta couleur verte du template
        dark:   "#0d1117",       // fond hero
        dark2:  "#161b22",       // fond section 2
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        float:  "float 5s ease-in-out infinite",
        float2: "float 7s ease-in-out infinite",
        float3: "float 9s ease-in-out infinite reverse",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%":       { transform: "translateY(-18px) rotate(15deg)" },
        },
      },
    },
  },
  plugins: [],
}
 
export default config