import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby'
import Layout from '../components/layout';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';

export default class PostsRoute extends React.Component {
  render() {
    const items = [];
    const { data } = this.props;
    const { title, subtitle } = data.site.siteMetadata;
    const posts = data.allMarkdownRemark ? data.allMarkdownRemark.edges : [];
    posts.forEach((post) => {
      items.push(<Post data={post} key={post.node.fields.slug} />);
    });

    const itemsBlock = items.length === 0 ? <h2>No post yet...</h2> : items;

    return (
      <Layout>
        <div className="grid-wrapper">
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={subtitle} />
          </Helmet>
          <Sidebar {...this.props} />
          <div className="content">
            <div className="content__inner">
              {itemsBlock}
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
    allMarkdownRemark(
      limit: 50
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } } }
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
