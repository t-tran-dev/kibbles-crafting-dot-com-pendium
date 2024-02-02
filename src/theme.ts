import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#801d1f',
    },
    secondary: {
      main: '#d84143',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
