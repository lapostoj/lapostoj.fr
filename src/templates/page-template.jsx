import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import PageTemplateDetails from '../components/PageTemplateDetails';

export default ({ data }) => {
  const { title, subtitle } = data.site.siteMetadata;
  const page = data.markdownRemark;
  const { title: pageTitle, description: pageDescription } = page.frontmatter;
  const description = pageDescription !== null ? pageDescription : subtitle;

  return (
    <div>
      <Helmet>
        <title>{`${pageTitle} - ${title}`}</title>
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
      frontmatter {
        title
        date
        description
      }
    }
  }
`;
