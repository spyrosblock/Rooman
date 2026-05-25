import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const lightPalette = {
  text: '#6b6375',
  textH: '#08060d',
  bg: '#fff',
  border: '#e5e4e7',
  codeBg: '#f4f3ec',
  accent: '#aa3bff',
  accentBg: 'rgba(170, 59, 255, 0.1)',
  accentBorder: 'rgba(170, 59, 255, 0.5)',
  shadow:
    'rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px',
};

const darkPalette = {
  text: '#9ca3af',
  textH: '#f3f4f6',
  bg: '#16171d',
  border: '#2e303a',
  codeBg: '#1f2028',
  accent: '#c084fc',
  accentBg: 'rgba(192, 132, 252, 0.15)',
  accentBorder: 'rgba(192, 132, 252, 0.5)',
  shadow:
    'rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px',
};

const sans = "system-ui, 'Segoe UI', Roboto, sans-serif";
const mono = "ui-monospace, Consolas, monospace";

function createAppTheme(mode: 'light' | 'dark') {
  const p = mode === 'dark' ? darkPalette : lightPalette;

  return responsiveFontSizes(createTheme({
    palette: {
      mode,
      primary: {
        main: p.accent,
        contrastText: '#fff',
      },
      background: {
        default: p.bg,
        paper: p.bg,
      },
      text: {
        primary: p.textH,
        secondary: p.text,
      },
      divider: p.border,
    },
    typography: {
      fontFamily: sans,
      h1: {
        fontFamily: sans,
        fontWeight: 500,
        fontSize: '56px',
        letterSpacing: '-1.68px',
        lineHeight: 1.2,
        color: p.textH,
      },
      h2: {
        fontFamily: sans,
        fontWeight: 500,
        fontSize: '24px',
        letterSpacing: '-0.24px',
        lineHeight: 1.18,
        color: p.textH,
      },
      body1: {
        fontFamily: sans,
        fontSize: '18px',
        lineHeight: 1.45,
        letterSpacing: '0.18px',
        color: p.text,
      },
      body2: {
        fontFamily: sans,
        fontSize: '16px',
        lineHeight: 1.45,
        color: p.text,
      },
      fontSize: 18,
      htmlFontSize: 16,
    },
    shape: {
      borderRadius: 4,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1024,
        lg: 1280,
        xl: 1536,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            background: p.bg,
            color: p.text,
            fontFamily: sans,
            fontSize: '18px',
            lineHeight: '145%',
            letterSpacing: '0.18px',
            fontSynthesis: 'none',
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          },
          '#root': {
            minHeight: '100svh',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
          },
          code: {
            fontFamily: mono,
            fontSize: '15px',
            lineHeight: '135%',
            padding: '4px 8px',
            background: p.codeBg,
            borderRadius: '4px',
            color: p.textH,
            display: 'inline-flex',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: mono,
            fontSize: '16px',
            padding: '5px 10px',
            borderRadius: '5px',
            color: p.accent,
            background: p.accentBg,
            border: '2px solid transparent',
            transition: 'border-color 0.3s',
            textTransform: 'none',
            '&:hover': {
              borderColor: p.accentBorder,
              background: p.accentBg,
            },
            '&:focus-visible': {
              outline: `2px solid ${p.accent}`,
              outlineOffset: '2px',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '5px',
              background: p.codeBg,
              '& fieldset': {
                borderColor: p.border,
              },
              '&:hover fieldset': {
                borderColor: p.accentBorder,
              },
              '&.Mui-focused fieldset': {
                borderColor: p.accent,
              },
            },
            '& .MuiInputLabel-root': {
              color: p.text,
              '&.Mui-focused': {
                color: p.accent,
              },
            },
            '& .MuiInputBase-input': {
              color: p.textH,
              fontFamily: sans,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            background: p.bg,
            border: `1px solid ${p.border}`,
            boxShadow: p.shadow,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: p.bg,
            border: `1px solid ${p.border}`,
            borderRadius: '8px',
            boxShadow: p.shadow,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: p.bg,
            borderBottom: `1px solid ${p.border}`,
            boxShadow: 'none',
            color: p.textH,
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            color: p.textH,
            textDecoration: 'none',
            transition: 'box-shadow 0.3s',
            '&:hover': {
              boxShadow: p.shadow,
            },
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            listStyle: 'none',
            padding: 0,
          },
        },
      },
    },
  }));
}

export const lightTheme = createAppTheme('light');
export const darkTheme = createAppTheme('dark');
