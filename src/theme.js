import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  initialColorMode: 'dark',
  styles: {
    global: {
      img: {
        borderRadius: '20px',
        boxShadow: '0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);',
      },
      h1: {
        fontSize: '48px',
        fontWeight: '800',
        color: '#ffffff',
      },
      h2: {
        fontSize: '30px',
        fontWeight: '800',
        color: '#ffffff',
      },
      h3: {
        fontSize: '28px',
        fontWeight: '800',
        borderBottom: '1px solid white',
        marginTop: '20px',
        marginBottom: '20px',
        color: '#ffffff',
      },
      h4: {
        fontSize: '18px',
        color: '#ffffff',
      },
      h6: {
        fontSize: '16px',
        color: '#ffffff',
      },
      p: {
        marginTop: '12px',
        marginBottom: '12px',
        color: '#d9d9d9',
      },
      li: {
        color: '#d9d9d9'
      },
      a: {
        color: '#75bcff',
      },
      blockquoteInfo: {
        fontSize: '20px',
        padding: '1rem',
        display: 'inline-block',
        backgroundColor: 'rgba(71, 166, 255, 0.1)',
        borderLeft: '3px solid rgba(71, 166, 255)',
      },
      blockquoteWarning: {
        fontSize: '20px',
        padding: '1rem',
        display: 'inline-block',
        backgroundColor: 'rgba(255, 210, 61, 0.1)',
        borderLeft: '3px solid rgba(255, 210, 61)',
      },
      blockquoteSuccess: {
        fontSize: '20px',
        padding: '1rem',
        display: 'inline-block',
        backgroundColor: 'rgba(48, 206, 85, 0.1)',
        borderLeft: '3px solid rgba(48, 206, 85)',
      },
      blockquoteImportant: {
        fontSize: '20px',
        padding: '1rem',
        display: 'inline-block',
        backgroundColor: 'rgba(253, 68, 87, 0.1)',
        borderLeft: '3px solid rgba(253, 68, 87)',
      },
      blockquote: {
        fontSize: '20px',
        padding: '1rem',
        display: 'inline-block',
        backgroundColor: 'rgba(230, 230, 230, 0.1)',
        borderLeft: '3px solid rgba(255, 255, 255)',
      }
    },
  },
  colors: {
    brand: {
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
