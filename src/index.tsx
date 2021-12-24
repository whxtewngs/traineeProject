import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {store} from './app/store';
import { Provider } from 'react-redux';
import { alpha } from '@mui/material/styles';
import type {} from '@mui/lab/themeAugmentation';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './app/keycloak'
import ClipboardJS from 'clipboard';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    activeLinkh2: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    activeLinkh2?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    activeLinkh2: true;
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main: '#8f87f3',
    },
    secondary: {
      main: '#E63946',
    },
    success: {
      main: '#99d98c'
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h3: {
      fontSize: 16,
      fontWeight: 700,
      color: '#878c96',
    },
    h2: {
      color: '#b7bfc8',
      fontFamily: 'Roboto',
      fontSize: 16,
      lineHeight: 1.2,
      fontWeight: 700,
    },
    activeLinkh2: {
      color: 'white',
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.2,
    },
  },
}); 

theme = createTheme(theme, {
  components: {
    MuiTabs: {
      styleOverrides: {
        flexContainer: {
          justifyContent: 'center'
        }
      }
    },  
    MuiFormControl: {
      styleOverrides: {
        root: {
          display: 'grid',
        }
      }
    },
    MuiTreeItem: {
      styleOverrides: {
        root: {
          '& .MuiTreeItem-content.Mui-selected, & .MuiTreeItem-content.Mui-selected.Mui-expanded': {
            backgroundColor: 'transparent'
          },
          '& .MuiTreeItem-content.Mui-selected.Mui-focused, & .MuiTreeItem-content.Mui-focused': {
            backgroundColor: 'transparent'
          },
          '& .MuiTreeItem-content.Mui-selected:hover, & .MuiTreeItem-content:hover': {
            backgroundColor: 'transparent'
          },
          '& .MuiTreeItem-content.Mui-expanded .MuiTreeItem-label': {
            color: 'white'
          }
        },
        label: {
          fontSize: 16,
          color: '#b7bfc8',
          fontWeight: 'bold',
          '&:hover': {
            color: 'white'
          }
        },
        content: {
          marginBottom: 8,
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 16,
          color: '#878c96',
          fontWeight: 'bold',
          fontFamily: 'Roboto, sans-serif',
        }, 
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root ': {
            transition: theme.transitions.create([
              'border-color',
              'background-color',
              'box-shadow',
              'transform'
            ]),
          }, 
          '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderWidth: 1,
          },
          '& .MuiOutlinedInput-root.Mui-focused.Mui-error fieldset': {
            borderWidth: 1,
          },   
          '& .MuiOutlinedInput-root.Mui-disabled fieldset': {
            borderColor: 'transparent',
          }, 
        },   
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.MuiOutlinedInput-root.Mui-disabled fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.15rem`,
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-focused.Mui-error fieldset': {
            boxShadow: `${alpha(theme.palette.secondary.main, 0.25)} 0 0 0 0.15rem`,
            borderColor: theme.palette.secondary.main ,
          },
          '&.Mui-disabled': {
            backgroundColor: '#f6f8f9'
          },
          '&.Mui-disabled .MuiInputAdornment-root ': {
            display: 'none'
          }
        },
        notchedOutline: {
          marginTop: 3,
          borderWidth: 1,
          boxSizing: 'border-box',
          '& legend': {
            display: 'none'
          },
        },
        input: {
          '&.Mui-disabled': {
            WebkitTextFillColor: 'black',
            cursor: 'text'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        defaultProps: {
          shrink: false,
        },
        root: {
          position: 'static',
          transform: `translate(0)`,
          fontWeight: theme.typography.h3.fontWeight,
          fontSize: theme.typography.h3.fontSize,
          color: theme.typography.h3.color,
          marginBottom: 8,

          '&.Mui-disabled': {
            color: theme.typography.h3.color
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&.MuiOutlinedInput-root.Mui-disabled fieldset.MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
        },
        select: {
          '&.Mui-disabled': {
            WebkitTextFillColor: 'black'
          },
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            display: 'none'
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1
          }
        }
      }
    },
    MuiBadge: {
      styleOverrides: {
        root: {
          position: 'absolute',
          top: 12,
          right: -4,
          
        },
      }
    }
  },
});

new ClipboardJS('#copyLinkButton', {
  text: function() {
    return window.location.href;
  }
});

export type TypeTheme = typeof theme;

const eventLogger = (event: unknown, error: unknown) => {
  console.log('onKeycloakEvent', event, error)
}

const tokenLogger = (tokens: unknown) => {
  console.log('onKeycloakTokens', tokens)
}

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={eventLogger}
      onTokens={tokenLogger}
    >
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

