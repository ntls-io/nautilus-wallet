module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--ion-color-primary)",
        "primary-background": "var(--ion-color-primary-background)",
        secondary: "var(--ion-color-secondary)",
        tertiary: "var(--ion-color-tertiary)",
        success: "var(--ion-color-success)",
        warning: "var(--ion-color-warning)",
        danger: "var(--ion-color-danger)",
        dark: "var(--ion-color-dark)",
        medium: "var(--ion-color-medium)",
        light: "var(--ion-color-light)",
        "jungle-green": "var(--ion-color-jungle-green)",
      },
      fontFamily: {
        nasalization: "nasalization",
        audiowide: "Audiowide, cursive",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("tailwindcss-children"),
  ],
  corePlugins: {
    preflight: false, //https://tailwindcss.com/docs/preflight
  },
};
