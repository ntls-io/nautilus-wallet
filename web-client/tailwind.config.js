module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{html,ts}"],
  darkMode: false, // or 'media' or 'class'
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
  variants: {
    extend: {},
    display: [
      "children",
      "default",
      "children-first",
      "children-last",
      "children-odd",
      "children-even",
      "children-not-first",
      "children-not-last",
      "children-hover",
      "hover",
      "children-focus",
      "focus",
      "children-focus-within",
      "focus-within",
      "children-active",
      "active",
      "children-visited",
      "visited",
      "children-disabled",
      "disabled",
      "responsive",
    ],
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
