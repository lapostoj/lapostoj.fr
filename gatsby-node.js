const path = require('path');
const lost = require('lost');
const pxtorem = require('postcss-pxtorem');
const slash = require('slash');

function convertToKebabCase(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/templates/post-template.jsx');
    const pageTemplate = path.resolve('./src/templates/page-template.jsx');
    const tagTemplate = path.resolve('./src/templates/tag-template.jsx');
    const categoryTemplate = path.resolve('./src/templates/category-template.jsx');

    graphql(`
    {
      allMarkdownRemark(
        limit: 1000,
        filter: { frontmatter: { draft: { ne: true } } },
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
              layout
              category
            }
          }
        }
      }
    }
  `).then((result) => {
      if (result.errors) {
        console.log(result.errors);
        reject(result.errors);
      }

      result.data.allMarkdownRemark.edges.forEach((edge) => {
        if (edge.node.frontmatter.layout === 'page') {
          createPage({
            path: edge.node.fields.slug,
            component: slash(pageTemplate),
            context: { slug: edge.node.fields.slug }
          });
        } else if (edge.node.frontmatter.layout === 'post') {
          createPage({
            path: edge.node.fields.slug,
            component: slash(postTemplate),
            context: { slug: edge.node.fields.slug }
          });

          let tags = [];
          if (edge.node.frontmatter.tags) {
            tags = tags.concat(edge.node.frontmatter.tags);
          }

          tags = [...new Set(tags)];
          tags.forEach((tag) => {
            const tagPath = `/tags/${convertToKebabCase(tag)}/`;
            createPage({
              path: tagPath,
              component: tagTemplate,
              context: { tag }
            });
          });

          let categories = [];
          if (edge.node.frontmatter.category) {
            categories = categories.concat(edge.node.frontmatter.category);
          }

          categories = [...new Set(categories)];
          categories.forEach((category) => {
            const categoryPath = `/categories/${convertToKebabCase(category)}/`;
            createPage({
              path: categoryPath,
              component: categoryTemplate,
              context: { category }
            });
          });
        }
      });

      resolve();
    });
  });
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath);
    const slug = `/${parsedFilePath.dir.split('---')[1]}/`;
    createNodeField({ node, name: 'slug', value: slug });
  } else if (
    node.internal.type === 'MarkdownRemark' &&
    typeof node.slug === 'undefined'
  ) {
    const fileNode = getNode(node.parent);
    let slug = fileNode.fields.slug;
    if (typeof node.frontmatter.path !== 'undefined') {
      slug = node.frontmatter.path;
    }
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(tag => `/tags/${convertToKebabCase(tag)}/`);
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs });
    }

    if (typeof node.frontmatter.category !== 'undefined') {
      const categorySlug = `/categories/${convertToKebabCase(node.frontmatter.category)}/`;
      createNodeField({ node, name: 'categorySlug', value: categorySlug });
    }
  }
};

exports.modifyWebpackConfig = ({ config }) => {
  config.merge({
    postcss: [
      lost(),
      pxtorem({
        rootValue: 16,
        unitPrecision: 5,
        propList: [
          'font',
          'font-size',
          'line-height',
          'letter-spacing',
          'margin',
          'margin-top',
          'margin-left',
          'margin-bottom',
          'margin-right',
          'padding',
          'padding-top',
          'padding-left',
          'padding-bottom',
          'padding-right',
          'border-radius',
          'width',
          'max-width'
        ],
        selectorBlackList: [],
        replace: true,
        mediaQuery: false,
        minPixelValue: 0
      })
    ]
  });
};
