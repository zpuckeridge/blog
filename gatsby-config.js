module.exports = {
  siteMetadata: {
    title: `Zacchary Puckeridge`,
    description: `Hi! 👋 I'm Zacchary. I'm a self-taught Web Developer based out of Brisbane, Australia.`,
    author: `Zacchary Puckeridge`,
    siteUrl: `https://zacchary.me/`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: `@chakra-ui/gatsby-plugin`,
      options: {
        resetCSS: true,
        isUsingColorMode: false,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-reading-time`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `auto-link-headers`,
            },
          },
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: 'Abyss',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://zacchary.me',
        sitemap: 'https://zacchary.me/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    {
      resolve: 'gatsby-plugin-page-progress',
      options: {
        includePaths: [],
        excludePaths: ['/articles/'],
        height: 3,
        prependToBody: false,
        color: `#30CE56`,
        footerHeight: 500,
        headerHeight: 0,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#47A6FF`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `articles`,
        path: `${__dirname}/content/articles`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/profile-pic.jpg`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
