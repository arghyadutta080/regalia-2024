import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        annabel: ["Annabel", "sans-serif"],
        hollirood: ["Hollirood", "sans-serif"],
        retrolight: ["RetroLight", "sans-serif"],
      },
      colors: {
        regalia:
          "linear-gradient(181.68deg, #AE8625 2.03%, rgba(247, 239, 138, 0.812834) 35.58%, rgba(210, 172, 71, 0.482811) 85.9%, #EDC967 114.06%)",
      },
    },
  },
  plugins: [],
};
export default config;
