module.exports = {
  siteMetadata: {
    title: `til`,
    author: {
      name: `Asia K`,
      summary: `who lives and works in New England creating art, writing code, and learning something new everyday.`,
    },
    description: `A summary of something I learned each day.`,
    siteUrl: `https://til.gatsbyjs.io/`,
    social: {
      almighty: `asiak`,
    },
  },
  plugins: [
`gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
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
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
         {
           resolve: `gatsby-remark-embed-video`,
           options: {
             width: 800,
             ratio: 1.77, // optional: defaults to 16/9 = 1.77
             height: 400, // optional: Overrides optional.ratio
             related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
             noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
             loadingStrategy: 'lazy', // optional: Enable support for laxy load offscreen iframes. Default is disabled.
             urlOverrides: [
               {
                 id: "youtube",
                 embedURL: videoID =>
                 `https://www.youtube-nocookie.com/embed/${videoID}`,
               },
             ], // Optional: override URL of a service provider, e.g to enable youtube-nocookie support
             containerClass: "embedVideo-container", // Optional: Custom CSS class for iframe container, for multiple classes separate them by space
             iframeId: false, // Optional: if true, iframe's id will be set to what is provided after 'video:'(Youtube Iframe player API requires iframe ID)   
           }
         },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-plugin-twitter`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "til Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `til Blog`,
        short_name: `til`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}