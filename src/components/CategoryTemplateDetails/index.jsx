import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post';

const CategoryTemplateDetails = ({ data, category }) => {
  const items = [];
  const posts = data.allMarkdownRemark.edges;
  posts.forEach((post) => {
    items.push(<Post data={post} key={post.node.fields.slug} />);
  });

  return (
    <div className="content">
      <div className="content__inner">
        <div className="page">
          <h1 className="page__title">
            All posts about {category}
          </h1>
          <div className="page__body">
            {items}
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryTemplateDetails.propTypes = {
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
  }).isRequired,
  category: PropTypes.string.isRequired,
};

export default CategoryTemplateDetails;
