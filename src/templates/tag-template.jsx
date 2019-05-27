import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Sidebar from '../components/Sidebar';
import TagTemplateDetails from '../components/TagTemplateDetails';

const TagTemplate = ({ data, pageContext }) => {
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

TagTemplate.propTypes = {
  data: PropTypes.shape({
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
