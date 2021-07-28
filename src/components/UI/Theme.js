import { createTheme } from "@material-ui/core/styles"

const baseTheme = createTheme({
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
    fontFamilySecondary: "'Roboto Condensed', sans-serif"
  }
})

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    type: "dark",
    primary: {
      main: "#26a27b"
    },
    secondary: {
      main: "#fafafa"
    }
  }
})
const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    type: "light",
    primary: {
      //main: "#fafafa"
      main: "#4791db"
    },
    secondary: {
      main: "#81c784"
    }
  }
})

export { darkTheme, lightTheme }
