import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { careplus: { ink: "#142f3d", teal: "#147f83", mint: "#e8f3f0", coral: "#c4775a", canvas: "#f4f7f7" } },
      fontFamily: { sans: ["DM Sans", "sans-serif"], display: ["Manrope", "sans-serif"] }
    }
  },
  plugins: [forms({ strategy: "class" })]
};
