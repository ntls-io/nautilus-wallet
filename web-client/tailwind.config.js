module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'prussian-blue': '#003450',
        'usafa-blue': '#025581',
        'viridian-green': '#209C95',
        'portland-orange': '#FF642E',
        'blue-jeans': '#02A7FF',
        gainsboro: '#DADFDF',
        'caribbean-green': '#11CA92',
        mustard: '#FFD952',
        'jungle-green': '#1A4C48',
        'indigo-dye': '#00507A',
        'morning-blue': '#92A2A1'
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
