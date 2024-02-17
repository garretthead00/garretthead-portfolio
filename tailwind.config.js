module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      primary: 'Orbitron',
      secondary: 'Rajdhani',
      tertiary: 'Aldrich',
    },
    container: {
      padding: {
        DEFAULT: '15px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
    },
    extend: {
      colors: {
        primary: '#7E3DD4',
        accent: '#FDD023',
        appPurple: '#461D7C',
        appDarkPurple: '#3C1053',
        appLightPurple: '#A39AAC',
        appGold: '#FDD023',
        appDarkGold: '#D29F13',
        appLightGold: '#F1EEDB',
        appLightGray: '#D0D0CE',
        appGray: '#999999',
        appBlack: '#333333',
      },
      backgroundImage: {
        site: "url('./assets/images/Background.jpg')",
      },
    },
  },
  plugins: [],
}



