import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#4d5a99",
      main: "#041f4c",
      dark: "#021132",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#e8f2faff",
      main: "#4da6ff",
      dark: "#2b8ce0",
      contrastText: "#041f4c",
    },
    info: {
      light: "#61F3F3",
      main: "#00B8D9",
      dark: "#006C9C",
      contrastText: "#FFFFFF",
    },
    success: {
      light: "#77ED8B",
      main: "#22C55E",
      dark: "#118D57",
      contrastText: "#FFFFFF",
    },
    warning: {
      light: "#FFD666",
      main: "#FFAB00",
      dark: "#B76E00",
      contrastText: "#1C252E",
    },
    error: {
      light: "#FFAC82",
      main: "#FF5630",
      dark: "#B71D18",
      contrastText: "#FFFFFF",
    },
    grey: {
      50: "#FCFDFD",
      100: "#F9FAFB",
      200: "#F4F6F8",
      300: "#DFE3E8",
      400: "#C4CDD5",
      500: "#919EAB",
      600: "#637381",
      700: "#454F5B",
      800: "#1C252E",
      900: "#141A21",
    },
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
  },
});

export default theme;
