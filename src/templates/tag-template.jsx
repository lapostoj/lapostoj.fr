import React from 'react';
import Helmet from 'react-helmet';
import Sidebar from '../components/Sidebar';
import TagTemplateDetails from '../components/TagTemplateDetails';

class TagTemplate extends React.Component {
  render() {
    const { data, pathContext } = this.props;
    const { title } = data.site.siteMetadata;
    const { tag } = pathContext;

    return (
      <div className="grid-wrapper">
        <Helmet title={`All Posts tagged as "${tag}" - ${title}`} />
        <Sidebar {...this.props} />
        <TagTemplateDetails {...this.props} />
      </div>
    );
  }
}

export default TagTemplate;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    ...site
    allMarkdownRemark(
      limit: 50
      filter: { frontmatter: { tags: { in: [$tag] }, layout: { eq: "post" }, draft: { ne: true } } }
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
