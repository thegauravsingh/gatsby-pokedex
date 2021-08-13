import React from "react"
import { graphql, Link } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Box from "@material-ui/core/Box"
import { makeStyles } from "@material-ui/core/styles"
import Seo from "../../components/seo"

const useStyles = makeStyles(theme => ({
  pokemonContainer: {
    paddingTop: "50px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
}))

const PokemonPage = ({ data: { pokemon } }) => {
  const classes = useStyles()
  //console.log(pokemon)
  //const { name, id, species, height, weight, types, sprites, content } = pokemon
  const { name, species, height, weight, types, content } = pokemon

  const image = content.image
  const toFirstCharUppercase = name =>
    name.charAt(0).toUpperCase() + name.slice(1)
  return (
    <>
      {/*<img
        src={sprites.other.official_artwork.front_default}
        alt=""
        style={{ width: "400px", height: "400px" }}
      />*/}
      <Seo title="Pokemon" />
      <Box
        display="flex"
        justifyContent="center"
        className={classes.pokemonContainer}
      >
        <GatsbyImage
          image={getImage(image)}
          alt={`${toFirstCharUppercase(name)}`}
        />
      </Box>

      <Typography align="center" variant="h3" color="initial" key="P">
        Pokemon Info:
      </Typography>
      <Typography align="center" variant="h6" color="initial" key="S">
        {"Species :"}
        <a href={species.url}>{species.name} </a>
      </Typography>
      <Typography align="center" variant="h6" color="initial" key="H">
        Height: {height}
      </Typography>
      <Typography align="center" variant="h6" color="initial" key="W">
        Weight: {weight}
      </Typography>
      <Typography align="center" variant="h6" color="initial" key="T">
        Types: {types.map(type => type.type.name).join(",")}
      </Typography>

      <Link to="/">
        <Box display="flex" justifyContent="center">
          <Button variant="contained" color="primary">
            Back to PokeDeX
          </Button>
        </Box>
      </Link>
    </>
  )
}

export const query = graphql`
  query PokemonPage($name: String) {
    pokemon(name: { eq: $name }) {
      id
      name
      species {
        name
        url
      }
      sprites {
        other {
          official_artwork {
            front_default
          }
        }
      }
      weight
      height
      types {
        type {
          name
        }
      }
      moves {
        move {
          name
          url
        }
      }
      content {
        image {
          childImageSharp {
            gatsbyImageData(
              placeholder: TRACED_SVG
              formats: [AUTO, WEBP, AVIF]
              height: 300
              width: 300
              transformOptions: { fit: CONTAIN, cropFocus: CENTER }
            )
          }
        }
      }
    }
  }
`

export default PokemonPage
