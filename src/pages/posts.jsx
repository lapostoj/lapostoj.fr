import React from 'react';
import Helmet from 'react-helmet';
import Post from '../components/Post';
import Sidebar from '../components/Sidebar';

class PostsRoute extends React.Component {
  render() {
    const items = [];
    const { title, subtitle } = this.props.data.site.siteMetadata;
    const posts = this.props.data.allMarkdownRemark ? this.props.data.allMarkdownRemark.edges : [];
    posts.forEach((post) => {
      items.push(<Post data={post} key={post.node.fields.slug} />);
    });


    const itemsBlock = items.length === 0 ? ( <h2>No post yet...</h2> ) : items;

    return (
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
    );
  }
}

export default PostsRoute;

export const pageQuery = graphql`
  query PostsQuery {
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
