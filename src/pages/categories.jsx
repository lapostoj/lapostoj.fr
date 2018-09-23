import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby'
import { convertToKebabCase } from '../utils';
import Layout from '../components/layout';
import Sidebar from '../components/Sidebar';

class CategoriesRoute extends React.Component {
  render() {
    const { data } = this.props;
    const { title } = data.site.siteMetadata;
    const categories = data.allMarkdownRemark ? data.allMarkdownRemark.group : [];

    return (
      <Layout>
        <div className="grid-wrapper">
          <Helmet title={`All Categories - ${title}`} />
          <Sidebar {...this.props} />
          <div className="content">
            <div className="content__inner">
              <div className="page">
                <h1 className="page__title">Categories</h1>
                <div className="page__body">
                  <div className="categories">
                    <ul className="categories__list">
                      {categories.map(category => (
                        <li key={category.fieldValue} className="categories__list-item">
                          <Link to={`/categories/${convertToKebabCase(category.fieldValue)}/`} className="categories__list-item-link">
                            {category.fieldValue} ({category.totalCount})
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default CategoriesRoute;

export const pageQuery = graphql`
  {
    ...site
    allMarkdownRemark(
      limit: 50
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;
