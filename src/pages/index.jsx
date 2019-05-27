import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Sidebar from '../components/Sidebar';
import PageTemplateDetails from '../components/PageTemplateDetails';

const Index = ({ data }) => {
  const page = data.markdownRemark;
  const { title, subtitle } = data.site.siteMetadata;
  const { title: pageTitle, description: pageDescription } = page.frontmatter;
  const description = pageDescription !== null ? pageDescription : subtitle;

  return (
    <Layout>
      <div className="grid-wrapper">
        <Helmet>
          <html lang="en" />
          <title>{`${pageTitle} - ${title}`}</title>
          <meta name="description" content={description} />
        </Helmet>
        <Sidebar site={data.site} />
        <PageTemplateDetails page={page} />
      </div>
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
