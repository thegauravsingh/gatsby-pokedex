import React from "react"
import { graphql, Link } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../../components/UI/Layout"

const PokemonPage = ({ data: { pokemon } }) => {
  console.log(pokemon)
  const {
    name,
    id,
    species,
    height,
    weight,
    types,
    sprites,
    allPokemonImages,
  } = pokemon
  const toFirstCharUppercase = name =>
    name.charAt(0).toUpperCase() + name.slice(1)
  return (
    <Layout>
      <GatsbyImage
        image={getImage(allPokemonImages)}
        alt={`${toFirstCharUppercase(name)}`}
      />
      <img
        src={sprites.other.official_artwork.front_default}
        alt=""
        style={{ width: "400px", height: "400px" }}
      />
      <Typography variant="h3" color="initial" key="P">
        Pokemon Info:
      </Typography>
      <Typography variant="h5" color="initial" key="S">
        {"Species :"}
        <a href={species.url}>{species.name} </a>
      </Typography>
      <Typography variant="h6" color="initial" key="H">
        Height: {height}
      </Typography>
      <Typography variant="h6" color="initial" key="W">
        Weight: {weight}
      </Typography>
      <Typography variant="h6" color="initial" key="T">
        Types:{" "}
      </Typography>
      {types.map(i => (
        <Typography variant="h6" color="initial">
          --- {i.type.name}{" "}
        </Typography>
      ))}
      <Link to="/">
        <Button variant="contained" color="primary">
          {/* <Button variant="contained" color="secondary" onClick = {()=>(props.history.push("/"))}> */}
          Back to PokeDeX
        </Button>
      </Link>
    </Layout>
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
      allPokemonImages {
        childImageSharp {
          gatsbyImageData(transformOptions: { cropFocus: CENTER })
        }
      }
    }
  }
`

export default PokemonPage
