module.exports = {
  pathPrefix: "/gatsby-pokedex",
  siteMetadata: {
    title: `REST API based Gatsby Starter`,
    titleTemplate: "%s · The Pokedex",
    description: `This starter will help you with building custom source nodes in graphql data layer in order to normalize your data for Gatsby Nodes API as well as main Gatsby configuration files, you might need to get up and running blazing fast.`,
    siteUrl: `https://thegauravsingh.github.io`,
    twitterUsername: `@thegauravsingh`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    "gatsby-theme-material-ui",
    `gatsby-plugin-gatsby-cloud`,
    //{
    //  resolve: `gatsby-plugin-remote-images`,
    //  options: {
    //    nodeType: "Pokemon",
    //    imagePath: "sprites.front_default",
    //    name: "allPokemonImages",
    //  },
    //},
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Pokedex`,
        short_name: `Pokedex`,
        start_url: `/`,
        background_color: `#26a27b`,
        theme_color: `#26a27b`,
        display: `minimal-ui`,
        icon: `src/images/thumbnail.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
