import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Sidebar from '../components/Sidebar';

const NotFound = ({ data }) => (
  <Layout>
    <div className="grid-wrapper">
      <Sidebar site={data.site} />
      <div className="content">
        <div className="content__inner">
          <div className="page">
            <h1 className="page__title">Page Not Found</h1>
            <div className="page__body">
              <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

NotFound.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default NotFound;

export const pageQuery = graphql`
  {
    ...site
  }
`;
