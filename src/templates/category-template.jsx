import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Sidebar from '../components/Sidebar';
import CategoryTemplateDetails from '../components/CategoryTemplateDetails';

const CategoryTemplate = ({ data, pageContext }) => {
  const { title } = data.site.siteMetadata;
  const { category } = pageContext;

  return (
    <div className="grid-wrapper">
      <Helmet title={`${category} - ${title}`} />
      <Sidebar data={data} />
      <CategoryTemplateDetails data={data} category={category} />
    </div>
  );
};

CategoryTemplate.propTypes = {
  data: PropTypes.shape({
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
