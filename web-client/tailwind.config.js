module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'prussian-blue': 'var(--ion-color-prussian-blue)',
        'usafa-blue': 'var(--ion-color-usafa-blue)',
        'viridian-green': 'var(--ion-color-viridian-green)',
        'portland-orange': 'var(--ion-color-portland-orange)',
        'blue-jeans': 'var(--ion-color-blue-jeans)',
        gainsboro: 'var(--ion-color-gainsboro)',
        'caribbean-green': 'var(--ion-color-caribbean-green)',
        mustard: 'var(--ion-color-mustard)',
        'jungle-green': 'var(--ion-color-jungle-green)',
        'indigo-dye': 'var(--ion-color-indigo-dye)',
        'morning-blue': 'var(--ion-color-morning-blue)'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography')
  ]
};
