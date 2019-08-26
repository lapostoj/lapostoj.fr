import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import { convertToKebabCase } from '../utils';
import Layout from '../components/layout';
import Sidebar from '../components/Sidebar';

const Categories = ({ data }) => {
  const { title } = data.site.siteMetadata;
  const categories = data.allMarkdownRemark ? data.allMarkdownRemark.group : [];

  return (
    <Layout>
      <div className="grid-wrapper">
        <Helmet title={`All Categories - ${title}`} />
        <Sidebar site={data.site} />
        <div className="content">
          <div className="content__inner">
            <div className="page">
              <h1 className="page__title">Categories</h1>
              <div className="page__body">
                <div className="categories">
                  <ul className="categories__list">
                    {categories.map((category) => (
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
};

Categories.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Categories;

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
