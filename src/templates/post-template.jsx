import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import PageTemplateDetails from '../components/PageTemplateDetails';

const PostTemplate = ({ data }) => {
  const { title, subtitle } = data.site.siteMetadata;
  const post = data.markdownRemark;
  const { title: postTitle, description: postDescription } = post.frontmatter;
  const description = postDescription !== null ? postDescription : subtitle;

  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{`${postTitle} - ${title}`}</title>
        <meta name="description" content={description} />
      </Helmet>
      <PageTemplateDetails data={data} />
    </div>
  );
};

PostTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default PostTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    ...site
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        tagSlugs
      }
      frontmatter {
        title
        tags
        date
        description
      }
    }
  }
`;
