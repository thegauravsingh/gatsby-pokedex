import React, { useContext } from "react"
//import { Link } from "gatsby";
import AppBar from "@material-ui/core/AppBar"
import { makeStyles } from "@material-ui/core/styles"
//import { useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import { darkModeContext } from "./ThemeHandler"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function Navbar() {
  //const theme = useTheme()
  const classes = useStyles()
  const DarkModeContext = useContext(darkModeContext)
  const { darkMode, setDarkMode } = DarkModeContext

  const handleThemeChange = () => {
    if (darkMode) {
      localStorage.setItem("preferred-theme", "light")
      setDarkMode(false)
    } else {
      localStorage.setItem("preferred-theme", "dark")
      setDarkMode(true)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Gatsby Pokedex
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            onClick={handleThemeChange}
          >
            Toggle {darkMode ? "Light" : "Dark"} Theme
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
