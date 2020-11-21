const path = require('path');

function convertToKebabCase(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
    {
      allMarkdownRemark(
        limit: 50
        filter: { frontmatter: { draft: { ne: true } } }
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
        console.error(result.errors);
        reject(result.errors);
      }

      result.data.allMarkdownRemark.edges.forEach((edge) => {
        if (edge.node.frontmatter.layout === 'index') {
          createPage({
            path: edge.node.fields.slug,
            component: path.resolve('./src/pages/index.jsx'),
          });
        } else if (edge.node.frontmatter.layout === 'page') {
          createPage({
            path: edge.node.fields.slug,
            component: path.resolve('./src/templates/page-template.jsx'),
            context: { slug: edge.node.fields.slug },
          });
        } else if (edge.node.frontmatter.layout === 'post') {
          createPage({
            path: edge.node.fields.slug,
            component: path.resolve('./src/templates/post-template.jsx'),
            context: { slug: edge.node.fields.slug },
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
              component: path.resolve('./src/templates/tag-template.jsx'),
              context: { tag },
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
              component: path.resolve('./src/templates/category-template.jsx'),
              context: { category },
            });
          });
        }
      });

      resolve();
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath);
    const slug = `/${parsedFilePath.dir.split('---')[1]}/`;
    createNodeField({ node, name: 'slug', value: slug });
  } else if (
    node.internal.type === 'MarkdownRemark'
    && typeof node.slug === 'undefined'
  ) {
    const fileNode = getNode(node.parent);
    const slug = typeof node.frontmatter.path !== 'undefined'
      ? node.frontmatter.path
      : fileNode.fields.slug;

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map((tag) => `/tags/${convertToKebabCase(tag)}/`);
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs });
    }

    if (typeof node.frontmatter.category !== 'undefined') {
      const categorySlug = `/categories/${convertToKebabCase(node.frontmatter.category)}/`;
      createNodeField({ node, name: 'categorySlug', value: categorySlug });
    }
  }
};
