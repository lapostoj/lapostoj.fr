import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import PageTemplateDetails from '../components/PageTemplateDetails';

export default ({ data }) => {
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
