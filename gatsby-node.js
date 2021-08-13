/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 **/

// You can delete this file if you're not using it

const fetch = require("node-fetch")

const NODE_TYPE = "Pokemon"
const NODE_TYPE_IMAGE = "PokeImage"

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const turnImageObjectIntoGatsbyNode = (image, pokeMon) => {
    const content = {
      ...image,
      ["image___NODE"]: createNodeId(`pokeMon-image-{${pokeMon.id}}`),
    }
    const nodeId = createNodeId(`pokeMon-{${pokeMon.id}}`)
    const nodeContent = JSON.stringify(image)
    const nodeContentDigest = createContentDigest(pokeMon)

    const nodeData = {
      ...pokeMon,
      content,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: NODE_TYPE,
        content: nodeContent,
        contentDigest: nodeContentDigest,
      },
    }
    return nodeData
  }

  const createImageObjectFromURL = url => {
    const lastIndexOfSlash = url.lastIndexOf("/")
    const id = url.slice(lastIndexOfSlash + 1, url.lastIndexOf("."))
    return { id, url }
  }

  //const createImageObjectFromURLArray = (urlArray, key) => {
  //  const initialValue = {}
  //  return urlArray.reduce((obj, item) => {
  //    const image_id = obj.url
  //    //const image_id = obj.url.slice(lastIndexOfSlash + 1, url.lastIndexOf("."))
  //    return {
  //      ...obj,
  //      //  image_id: image_id,
  //      //["image___NODE"]: createNodeId(`pokeMon-image-{${image_id}}`),
  //      [item[key]]: item,
  //    }
  //  }, initialValue)
  //}

  const { createNode } = actions
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
  const json = await response.json()
  const { results = [] } = json

  const pokeMons = await Promise.all(
    results.map(async result => {
      const url = result.url
      const pokeResponse = await fetch(url)
      return await pokeResponse.json()
    })
  )

  pokeMons.forEach(pokeMon => {
    //const urlArray = [
    //  {
    //    id: createNodeId("front_default"),
    //    url: pokeMon.sprites.front_default,
    //    ["image___NODE"]: createNodeId(`pokeMon.sprites.front_default`),
    //  },
    //]
    //const imgObj = createImageObjectFromURLArray(urlArray, "id")
    const imgObj = createImageObjectFromURL(
      pokeMon["sprites"]["other"]["official-artwork"]["front_default"]
    )
    const nodeData = turnImageObjectIntoGatsbyNode(imgObj, pokeMon)
    //console.log(JSON.stringify(nodeData, null, 2))

    createNode(nodeData)
  })
}

const { createRemoteFileNode } = require("gatsby-source-filesystem")
const { object } = require("prop-types")

exports.onCreateNode = async ({
  node,
  actions,
  store,
  getCache,
  createNodeId,
}) => {
  if (node.internal.type === "Pokemon") {
    const { createNode } = actions

    /* Download the image and create the File node. Using gatsby-plugin-sharp and gatsby-transformer-sharp the node will become an ImageSharp. */

    const fileNode = await createRemoteFileNode({
      url: node.content.url, // string that points to the URL of the image
      parentNodeId: node.content.id, // id of the parent node of the fileNode you are going to create
      store, // Gatsby's redux store
      getCache, // get Gatsby's cache
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
    })

    if (fileNode) {
      // link the File node to Image node at field image
      node.content.image___NODE = fileNode.id
    }
  }
}
