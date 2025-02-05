module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./components/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#1e293b",
        "soft-blue": "#3b82f6",
        "hover-blue": "#2563eb",
        "neon-green": "#39ff14", // Couleur néon pour plus de dynamisme
        "dark-gray": "#1a1a1a",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        arcade: ["Press Start 2P", "cursive"], // Style rétro arcade
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)",
        neon: "0px 0px 10px rgba(57, 255, 20, 0.8)", // Glow effect
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideIn: "slideIn 0.6s ease-in-out",
      },
      screens: {
        xs: "375px", // iPhone SE
        sm: "480px", // Petits écrans
        md: "768px", // Tablettes
        lg: "1024px", // Desktop
        xl: "1280px", // Grand écran
      },
      maxWidth: {
        "xs": "90%", // iPhone SE et petits écrans
        "sm": "95%", // Petits smartphones
        "md": "80%", // Tablettes
        "lg": "70%", // Desktop standard
        "xl": "60%", // Grands écrans
        "2xl": "50%", // Ultra grands écrans
      },
      minHeight: {
        "screen-sm": "80vh", // Smartphones
        "screen-md": "85vh", // Tablettes
        "screen-lg": "90vh", // Desktop
      },
      fontSize: {
        "xs": "0.75rem",  // Texte plus petit sur mobile
        "sm": "0.875rem", // Texte normal
        "md": "1rem",     // Standard
        "lg": "1.25rem",  // Plus grand pour desktop
        "xl": "1.5rem",
        "2xl": "2rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
