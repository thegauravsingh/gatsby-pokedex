/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const fetch = require('node-fetch');
exports.sourceNodes = async() => {

    const response = await fetch('https://pokeapi.co/api/v2/');
    const json =  await response.json();
    console.log('json',json);
}
