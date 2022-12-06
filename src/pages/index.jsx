import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Sidebar from '../components/Sidebar';
import PageTemplateDetails from '../components/PageTemplateDetails';

const Index = ({ data }) => {
  const page = data.markdownRemark;

  return (
    <div className="grid-wrapper">
      <Sidebar site={data.site} />
      <PageTemplateDetails page={page} />
    </div>
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

export const Head = Object.assign(
  ({ data }) => {
    const page = data.markdownRemark;
    const { title, subtitle } = data.site.siteMetadata;
    const { title: pageTitle, description: pageDescription } = page.frontmatter;
    const description = pageDescription !== null ? pageDescription : subtitle;

    return (
      <SEO title={`${pageTitle} - ${title}`} description={description}>
        <meta name="keywords" content="lapostoj, developper, software, engineer, cv, portfolio, blog, resume" />
      </SEO>
    );
  },
  {
    propTypes: {
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
    },
  },
);

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
