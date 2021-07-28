/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const fetch = require('node-fetch');

const NODE_TYPE = 'Pokemon';

exports.sourceNodes = async({actions, createNodeId, createContentDigest}) => { 

    const {createNode} = actions;

    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const json =  await response.json();
    const {results =[]} = json;
    
    const pokeMons = await Promise.all(results.map( async result => {
        const url = result.url;
        const pokeResponse = await fetch(url);  
        return await pokeResponse.json(); 
    }));
    //console.log('results',results);
    //console.log('pokeMon',pokeMon);
    pokeMons.forEach((pokeMon, index) => {
        const node = {
            ...pokeMon,
            id: createNodeId(`${NODE_TYPE}-${pokeMon.id}`),
            internal: {
                    type: NODE_TYPE,
                    content: JSON.stringify(pokeMon),
                    contentDigest: createContentDigest(pokeMon)
                }    
            };

        actions.createNode(node);
            
        }
    
    )

}
