import { createTheme } from '@mui/material/styles';
import OnestRegular from './assets/fonts/OnestRegular1602-hint.woff';
import OnestMedium from './assets/fonts/OnestMedium1602-hint.woff';
import OnestBold from './assets/fonts/OnestBold1602-hint.woff';

const theme = createTheme({
  palette: {
    ...{
      primary: {
        main: '#F86E03',
      },
      secondary: {
        main: '#6750a4',
      },
      background: {
        default: '#171717',
      },
    },
  },
  typography: {
    fontFamily: 'Onest, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Onest';
          font-style: regular;
          font-display: swap;
          font-weight: 400;
          src: local('Onest'), local('Onest-Regular'), url(${OnestRegular}) format('woff');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }

		@font-face {
          font-family: 'Onest';
          font-style: medium;
          font-display: swap;
          font-weight: 500;
          src: local('Onest'), local('Onest-Medium'), url(${OnestMedium}) format('woff');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }

		@font-face {
          font-family: 'Onest';
          font-style: bold;
          font-display: swap;
          font-weight: 700;
          src: local('Onest'), local('Onest-Bold'), url(${OnestBold}) format('woff');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

export default theme;
