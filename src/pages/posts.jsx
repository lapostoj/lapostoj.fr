import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Post from '../components/Post';
import SEO from '../components/seo';
import Sidebar from '../components/Sidebar';

const Posts = ({ data }) => {
  const items = [];
  const posts = data.allMarkdownRemark ? data.allMarkdownRemark.edges : [];
  posts.forEach(({ node: post }) => {
    const { slug } = post.fields;
    items.push(<Post post={post} key={slug} />);
  });

  const itemsBlock = items.length === 0 ? <h2>No post yet...</h2> : items;

  return (
    <div className="grid-wrapper">
      <Sidebar site={data.site} />
      <div className="content">
        <div className="content__inner">
          {itemsBlock}
        </div>
      </div>
    </div>
  );
};

Posts.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
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

export default Posts;

export const Head = ({ data }) => {
  const { title, subtitle } = data.site.siteMetadata;

  return (
    <SEO title={title} description={subtitle} />
  );
};

Head.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
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
      sort: { frontmatter: { date: DESC } }
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
