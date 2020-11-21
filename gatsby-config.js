module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.lapostoj.fr',
    title: 'lapostoj - Jerome Lapostolet',
    subtitle: 'CV, Portfolio and Blog website for lapostoj.',
    copyright: '© All rights reserved.',
    menu: [
      {
        label: 'About me',
        path: '/',
      },
      {
        label: 'Posts',
        path: '/posts/',
      },
    ],
    author: {
      name: 'Jerome Lapostolet - lapostoj',
      email: 'jerome.lapostolet@gmail.com',
      github: 'lapostoj',
      subtitle: '',
      location: 'London',
      job: {
        title: 'Software Engineer',
        company: 'Marshmallow',
        url: 'https://marshmallow.com',
      },
    },
  },
  plugins: [
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'lapostoj.fr',
        short_name: 'lapostoj.fr',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#5d93ff',
        display: 'standalone',
        icon: 'src/images/icon.svg',
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Roboto',
          '400,400i,500,700',
        ],
        display: 'swap',
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
            {
              site {
                siteMetadata {
                  siteUrl
                }
              }
              allSitePage(
                filter: {
                  path: { regex: "/^(?!/404/|/404.html|/dev-404-page/)/" }
                }
              ) {
                edges {
                  node {
                    path
                  }
                }
              }
          }`,
        output: '/sitemap.xml',
        serialize: ({ site, allSitePage }) => allSitePage.edges.map((edge) => ({
          url: site.siteMetadata.siteUrl + edge.node.path,
          changefreq: 'daily',
          priority: 0.7,
        })),
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: { maxWidth: 960 },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: { noInlineHighlight: true },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
  ],
};
