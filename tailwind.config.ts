import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        annabel: ["Annabel", "sans-serif"],
        hollirood: ["Hollirood", "sans-serif"],
        retrolight: ["RetroLight", "sans-serif"],
      },
      colors: {
        regalia:
          "#c9a747",
      },
    },
  },
  plugins: [
    // rest of the code
    flowbite.plugin(),
    addVariablesForColors, 
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     flowbite.content(),
//   ],

//   theme: {
//     extend: {
//       fontFamily: {
//         annabel: ["Annabel", "sans-serif"],
//         hollirood: ["Hollirood", "sans-serif"],
//         retrolight: ["RetroLight", "sans-serif"],
//       },
//       colors: {
//         regalia:
//           "#c9a747",
//       },
//     },
//   },
//   plugins: [flowbite.plugin(),],
// };
// export default config;
