import { extendTheme } from 'native-base'

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#fdf6f6',
      100: '#f5dad9',
      200: '#edb9b8',
      300: '#e2908e',
      400: '#dc7775',
      500: '#d35250',
      600: '#c82b28',
      700: '#ad0503',
      800: '#930502',
      900: '#6d0302',
    },
    secondary: {
      50: '#fff5f1',
      100: '#ffd8c7',
      200: '#ffb494',
      300: '#ff834d',
      400: '#ff601b',
      500: '#e34400',
      600: '#c03a00',
      700: '#9b2f00',
      800: '#832800',
      900: '#601d00',
    },
    error: {
      50: '#faf6f7',
      100: '#ecdddf',
      200: '#dbbfc3',
      300: '#c79ba2',
      400: '#bb868f',
      500: '#ac6b75',
      600: '#9e525f',
      700: '#8f3745',
      800: '#842333',
      900: '#611925',
    },
  },
  config: {
    initialColorMode: 'light',
  },
})
