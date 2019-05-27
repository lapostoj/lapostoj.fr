import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Sidebar from '../components/Sidebar';
import CategoryTemplateDetails from '../components/CategoryTemplateDetails';

const CategoryTemplate = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges;
  const { site } = data;
  const { title } = site.siteMetadata;
  const { category } = pageContext;

  return (
    <div className="grid-wrapper">
      <Helmet title={`${category} - ${title}`} />
      <Sidebar site={site} />
      <CategoryTemplateDetails posts={posts} category={category} />
    </div>
  );
};

CategoryTemplate.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryTemplate;

export const pageQuery = graphql`
  query($category: String) {
    ...site
    allMarkdownRemark(
      limit: 50
      filter: { frontmatter: { category: { eq: $category }, layout: { eq: "post" }, draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;
