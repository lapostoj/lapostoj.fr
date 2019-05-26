import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import { convertToKebabCase } from '../utils';
import Layout from '../components/layout';
import Sidebar from '../components/Sidebar';

export default (props) => {
  const { data } = props;
  const { title } = data.site.siteMetadata;
  const tags = data.allMarkdownRemark ? data.allMarkdownRemark.group : [];

  return (
    <Layout>
      <div className="grid-wrapper">
        <Helmet title={`All Tags - ${title}`} />
        <Sidebar {...props} />
        <div className="content">
          <div className="content__inner">
            <div className="page">
              <h1 className="page__title">Tags</h1>
              <div className="page__body">
                <div className="tags">
                  <ul className="tags__list">
                    {tags.map(tag => (
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
