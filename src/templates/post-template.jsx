import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Sidebar from '../components/Sidebar';
import PageTemplateDetails from '../components/PageTemplateDetails';

const PostTemplate = ({ data }) => {
  const post = data.markdownRemark;
  const { title, subtitle } = data.site.siteMetadata;
  const { title: postTitle, description: postDescription } = post.frontmatter;
  const description = postDescription !== null ? postDescription : subtitle;

  return (
    <div className="grid-wrapper">
      <Helmet>
        <html lang="en" />
        <title>{`${postTitle} - ${title}`}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Sidebar site={data.site} />
      <PageTemplateDetails page={post} />
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
