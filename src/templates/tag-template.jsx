import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Sidebar from '../components/Sidebar';
import TagTemplateDetails from '../components/TagTemplateDetails';

const TagTemplate = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges;
  const { site } = data;
  const { title } = site.siteMetadata;
  const { tag } = pageContext;

  return (
    <div className="grid-wrapper">
      <Helmet title={`All Posts tagged as "${tag}" - ${title}`} />
      <Sidebar site={site} />
      <TagTemplateDetails posts={posts} tag={tag} />
    </div>
  );
};

TagTemplate.propTypes = {
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
    tag: PropTypes.string.isRequired,
  }).isRequired,
};

export default TagTemplate;

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
