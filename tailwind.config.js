/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // App palette (soft, friendly)
      colors: {
        skybg: "#BAE6FD",                // page background
        mint: { 300: "#A7F3D0", 400: "#6EE7B7", 200: "#BBF7D0" },
        lemon: { 300: "#FEF08A" },
      },
      // Fonts: body + headings
      fontFamily: {
        ui: ['"Comic Neue"', "system-ui", "sans-serif"],      // main text
        display: ['"Fredoka One"', "cursive"],                // headings/titles
      },
      // Soft wireframe-like shadow
      boxShadow: {
        soft: "0 10px 20px rgba(0,0,0,0.08)",
      },
      // Rounded look
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
