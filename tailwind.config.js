module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        houm: {
          orange: '#FF452B',
          'dark-orange': '#B2301E',
          'light-orange': '#FFF3F2',
          gray: '#263238',
          'light-gray': '#424242',
          'dark-gray': '#212121',
        },
      },
      fontFamily: {
        'press-start-2p': "'Press Start 2P', cursive",
      },
      height: {
        'screen-16': 'calc(100vh - 64px)',
        'screen-1/2': '50vh',
      },
      minHeight: {
        72: '18rem',
      },
    },
  },
  plugins: [],
};
