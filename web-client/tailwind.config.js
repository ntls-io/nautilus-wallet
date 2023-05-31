const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        xs: "260px",
        ...defaultTheme.screens,
      },
      colors: {
        primary: "var(--ion-color-primary)",
        secondary: "var(--ion-color-secondary)",
        tertiary: "var(--ion-color-tertiary)",
        success: "var(--ion-color-success)",
        warning: "var(--ion-color-warning)",
        danger: "var(--ion-color-danger)",
        dark: "var(--ion-color-dark)",
        medium: "var(--ion-color-medium)",
        light: "var(--ion-color-light)",
        background: "var(--ion-color-background)",
      },
      fontFamily: {
        nasalization: "nasalization",
        audiowide: "Audiowide, cursive",
      },
      screens: {
        print: { raw: "print" },
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
