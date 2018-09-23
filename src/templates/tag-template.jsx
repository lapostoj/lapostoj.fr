import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Sidebar from '../components/Sidebar';
import TagTemplateDetails from '../components/TagTemplateDetails';

export default ({ data, pageContext }) => {
  const { title } = data.site.siteMetadata;
  const { tag } = pageContext;

  return (
    <div className="grid-wrapper">
      <Helmet title={`All Posts tagged as "${tag}" - ${title}`} />
      <Sidebar data={data} />
      <TagTemplateDetails data={data} tag={tag} />
    </div>
  );
};

export const pageQuery = graphql`
  query($tag: String) {
    ...site
    allMarkdownRemark(
      limit: 50
      filter: { frontmatter: { tags: { in: [$tag] }, layout: { eq: "post" }, draft: { ne: true } } }
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
