import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#ff0000',
      },
      secondary: {
        main: '#dd1100',
      },
    },
    typography: {
      useNextVariants: true,
    }
  }
);

export default theme;
