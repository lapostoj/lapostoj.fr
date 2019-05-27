import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PageTemplateDetails from '../components/PageTemplateDetails';

const Index = (props) => {
  const { data } = props;
  const { title, subtitle } = data.site.siteMetadata;
  const page = data.markdownRemark;
  const { title: pageTitle, description: pageDescription } = page.frontmatter;
  const description = pageDescription !== null ? pageDescription : subtitle;

  return (
    <Layout>
      <Helmet>
        <html lang="en" />
        <title>{`${pageTitle} - ${title}`}</title>
        <meta name="description" content={description} />
      </Helmet>
      <PageTemplateDetails {...props} />
    </Layout>
  );
};

Index.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
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

export default Index;

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
