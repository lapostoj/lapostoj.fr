import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post';

const CategoryTemplateDetails = ({ posts, category }) => {
  const items = [];
  posts.forEach(({ node: post }) => {
    const { slug } = post.fields;
    items.push(<Post post={post} key={slug} />);
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
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        fields: PropTypes.shape({
          slug: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
  category: PropTypes.string.isRequired,
};

export default CategoryTemplateDetails;
