import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import { convertToKebabCase } from '../utils';
import SEO from '../components/seo';
import Sidebar from '../components/Sidebar';

const Tags = ({ data }) => {
  const tags = data.allMarkdownRemark ? data.allMarkdownRemark.group : [];

  return (
    <div className="grid-wrapper">
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

export const Head = ({ data }) => {
  const { title } = data.site.siteMetadata;

  return (
    <SEO title={`All Tags - ${title}`} />
  );
};

Head.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  {
    ...site
    allMarkdownRemark(
      limit: 50
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
    ) {
      group(field: { frontmatter: { tags: SELECT } }) {
        fieldValue
        totalCount
      }
    }
  }
`;
