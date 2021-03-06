import React from "react"
import { Link } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"

import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@material-ui/core"
import usePokemon from "../hooks/usePokemon"

const useStyles = makeStyles(theme => ({
  Card: {},
  CardMedia: { margin: "auto" },
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  circularProgress: {
    position: "fixed",
    top: "50%",
    left: "50%",
  },
}))

const IndexPage = () => {
  const classes = useStyles()
  const allPokemon = usePokemon()
  const toFirstCharUppercase = name =>
    name.charAt(0).toUpperCase() + name.slice(1)

  const getPokedexCard = pokemon => {
    const { id, name, types, sprite, image } = pokemon
    //console.log(image);

    return (
      <Grid item xs={12} sm={3} key={id}>
        <Link key={pokemon.id} to={`/pokemons/${pokemon.name}`}>
          <Card className={classes.Card}>
            <CardMedia
              className={classes.CardMedia}
              image={sprite}
              style={{ width: "130px", height: "130px" }}
            />
            <CardContent className={classes.CardContent}>
              <Typography>{toFirstCharUppercase(name)}</Typography>
              <Typography>Types: {types.join(",")} </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    )
  }

  return (
    <>
      <div className={classes.root}>
        {allPokemon ? (
          <Grid container spacing={3} className={classes.pokedexContainer}>
            {allPokemon.map(pokemon => getPokedexCard(pokemon))}
          </Grid>
        ) : (
          <CircularProgress className={classes.circularProgress} />
        )}
      </div>
    </>
  )
}

export default IndexPage
