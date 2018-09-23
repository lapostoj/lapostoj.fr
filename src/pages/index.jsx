import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PageTemplateDetails from '../components/PageTemplateDetails';

export default class IndexRoute extends React.Component {
  render() {
    const { data } = this.props;
    const { title, subtitle } = data.site.siteMetadata;
    const page = data.markdownRemark;
    const { title: pageTitle, description: pageDescription } = page.frontmatter;
    const description = pageDescription !== null ? pageDescription : subtitle;

    return (
      <Layout>
        <Helmet>
          <title>{`${pageTitle} - ${title}`}</title>
          <meta name="description" content={description} />
        </Helmet>
        <PageTemplateDetails {...this.props} />
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  {
    ...site
    markdownRemark(fields: { slug: { eq: "/" } }) {
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
