import React from 'react';
import Helmet from 'react-helmet';
import PageTemplateDetails from '../components/PageTemplateDetails';

class IndexRoute extends React.Component {
  render() {
    const { data } = this.props;
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
        <PageTemplateDetails {...this.props} />
      </div>
    );
  }
}

export default IndexRoute;

export const pageQuery = graphql`
  query Index {
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
