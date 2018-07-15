import React from 'react';
import Helmet from 'react-helmet';
import Sidebar from '../components/Sidebar';
import CategoryTemplateDetails from '../components/CategoryTemplateDetails';

class CategoryTemplate extends React.Component {
  render() {
    const { data, pathContext } = this.props;
    const { title } = data.site.siteMetadata;
    const { category } = pathContext;

    return (
      <div className="grid-wrapper">
        <Helmet title={`${category} - ${title}`} />
        <Sidebar {...this.props} />
        <CategoryTemplateDetails {...this.props} />
      </div>
    );
  }
}

export default CategoryTemplate;

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    ...site
    allMarkdownRemark(
      limit: 50
      filter: { frontmatter: { category: { eq: $category }, layout: { eq: "post" }, draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;
