import { useStaticQuery, graphql } from "gatsby";

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
            allPokemonImages {
              childImageSharp {
                gatsbyImageData(transformOptions: {cropFocus: CENTER})
              }
            }
          }
        }
      }
    `);

  const allPokemon = data.allPokemon.nodes.map(node => {

      const {id,name,types,sprites,allPokemonImages} = node;
      //const {id,name,types,sprites} = node;

      return {
        id,
        name,
        types: types.map(type => (type.type.name)),
        sprite: sprites.other.official_artwork.front_default,
        image: allPokemonImages
      }

  });

  console.log(allPokemon);

  return allPokemon;


}

export default usePokemon;
