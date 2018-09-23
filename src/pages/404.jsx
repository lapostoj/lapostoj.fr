import React from 'react';
import { graphql } from 'gatsby'
import Layout from '../components/layout';
import Sidebar from '../components/Sidebar';

export default class NotFoundRoute extends React.Component {
  render() {
    return (
      <Layout>
        <div className="grid-wrapper">
          <Sidebar {...this.props} />
          <div className="content">
            <div className="content__inner">
              <div className="page">
                <h1 className="page__title">NOT FOUND</h1>
                <div className="page__body">
                  <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  {
    ...site
  }
`;
