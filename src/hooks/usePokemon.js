import { useStaticQuery, graphql } from "gatsby"

const usePokemon = () => {
  const data = useStaticQuery(graphql`
    {
      allPokemon {
        nodes {
          id
          name
          types {
            type {
              name
            }
          }
          sprites {
            other {
              official_artwork {
                front_default
              }
            }
          }
          content {
            image {
              childImageSharp {
                gatsbyImageData(
                  placeholder: TRACED_SVG
                  formats: [AUTO, WEBP, AVIF]
                  height: 130
                  width: 130
                  transformOptions: { fit: CONTAIN, cropFocus: CENTER }
                )
              }
            }
          }
        }
      }
    }
  `)

  const allPokemon = data.allPokemon.nodes.map(node => {
    const { id, name, types, sprites, content } = node
    //const { id, name, types, sprites } = node

    return {
      id,
      name,
      types: types.map(type => type.type.name),
      sprite: sprites.other.official_artwork.front_default,
      image: content.image,
    }
  })

  //console.log(allPokemon);

  return allPokemon
}

export default usePokemon
