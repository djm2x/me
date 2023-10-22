

/** @type {import('tailwindcss')} */
module.exports = {
  prefix: '',
  important: true,
  purge: {
    enabled: process.env.NODE_ENV === 'production', // enabled by `NODE_ENV=production` or enable manually
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {

    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography')
  ],
};
