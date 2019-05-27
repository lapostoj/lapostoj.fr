import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post';

const TagTemplateDetails = ({ posts, tag }) => {
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
            All posts tagged as &quot;{tag}&quot;
          </h1>
          <div className="page__body">
            {items}
          </div>
        </div>
      </div>
    </div>
  );
};

TagTemplateDetails.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        fields: PropTypes.shape({
          slug: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
  tag: PropTypes.string.isRequired,
};

export default TagTemplateDetails;
