import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Seo from "../components/seo"

import {
  Card,
  CardContent,
  //  CardMedia,
  CircularProgress,
} from "@material-ui/core"
import usePokemon from "../hooks/usePokemon"

const useStyles = makeStyles(theme => ({
  Card: {},
  CardMedia: { margin: "auto" },
  pokedexContainer: {
    paddingTop: "50px",
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
    //const { id, name, types, sprite, image } = pokemon
    const { id, name, types, image } = pokemon
    //console.log(pokemon)

    return (
      <Grid item xs={12} sm={3} key={id}>
        <Link key={pokemon.id} to={`/pokemons/${pokemon.name}`}>
          <Card className={classes.Card}>
            <Box display="flex" justifyContent="center">
              {/*<CardMedia
              className={classes.CardMedia}
              image={sprite}
              style={{ width: "130px", height: "130px" }}
            />*/}
              <GatsbyImage
                image={getImage(image)}
                alt={`${toFirstCharUppercase(name)}`}
              />
            </Box>
            <CardContent className={classes.CardContent}>
              <Typography>
                <Box textAlign="center">{toFirstCharUppercase(name)}</Box>
              </Typography>
              <Typography>
                <Box textAlign="center"> Types: {types.join(",")} </Box>{" "}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    )
  }

  return (
    <>
      <Seo title="Pokedex" />
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
