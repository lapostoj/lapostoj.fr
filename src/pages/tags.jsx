import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import { convertToKebabCase } from '../utils';
import Layout from '../components/layout';
import Sidebar from '../components/Sidebar';

const Tags = ({ data }) => {
  const { title } = data.site.siteMetadata;
  const tags = data.allMarkdownRemark ? data.allMarkdownRemark.group : [];

  return (
    <Layout>
      <div className="grid-wrapper">
        <Helmet title={`All Tags - ${title}`} />
        <Sidebar site={data.site} />
        <div className="content">
          <div className="content__inner">
            <div className="page">
              <h1 className="page__title">Tags</h1>
              <div className="page__body">
                <div className="tags">
                  <ul className="tags__list">
                    {tags.map((tag) => (
                      <li key={tag.fieldValue} className="tags__list-item">
                        <Link to={`/tags/${convertToKebabCase(tag.fieldValue)}/`} className="tags__list-item-link">
                          {tag.fieldValue} ({tag.totalCount})
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

Tags.propTypes = {
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

export default Tags;

export const pageQuery = graphql`
  {
    ...site
    allMarkdownRemark(
      limit: 50
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
