import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Sidebar from '../components/Sidebar';
import CategoryTemplateDetails from '../components/CategoryTemplateDetails';

export default ({ data, pageContext }) => {
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
