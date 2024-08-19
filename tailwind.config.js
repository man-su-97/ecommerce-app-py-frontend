/** @type {import('tailwindcss').Config} */

import flowbite from "flowbite/plugin";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js", // Including Flowbite's path directly
  ],
  theme: {
    extend: {
      fontFamily: {
        avenirCF: ["avenirCF", "sans-serif"],
        arialBlackCF: ["arialBlackCF", "serif"],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
    },
  },
  plugins: [forms, aspectRatio, flowbite],
};
