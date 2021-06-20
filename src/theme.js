import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      h1: {
        fontSize: '48px',
        fontWeight: '800',
      },
      h2: {
        fontSize: '30px',
        fontWeight: '800',
      },
      h3: {
        fontSize: '28px',
        fontWeight: '800',
        marginTop: '24px',
        borderBottom: '1px solid white',
      },
      h4: {
        fontSize: '18px',
      },
      h6: {
        fontSize: '16px',
      },
      p: {
        marginTop: '12px',
        marginBottom: '12px',
      },
      a: {
        color: '#75bcff',
      },
    },
  },
  colors: {
    brand: {
      50: '#f8f0f2',
      100: '#d9d9d9',
      200: '#bfbfbf',
      300: '#a6a6a6',
      400: '#8c8c8c',
      500: '#737373',
      600: '#595959',
      700: '#292929',
      800: '#212121',
      900: '#1A1A1A',
    },
  },

  fonts: {
    heading: 'Space Grotesk',
    body: 'Space Grotesk',
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '64px',
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  lineHeights: {
    normal: 'normal',
    none: '1',
    shorter: '1.25',
    short: '1.375',
    base: '1.5',
    tall: '1.625',
    taller: '2',
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
  },
})
