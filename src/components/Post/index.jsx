import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'gatsby';
import './style.scss';

const Post = ({ data }) => {
  const {
    title, date, category, description,
  } = data.node.frontmatter;
  const { slug, categorySlug } = data.node.fields;

  return (
    <div className="post">
      <div className="post__meta">
        <time className="post__meta-time" dateTime={moment(date).format('MMMM D, YYYY')}>
          {moment(date).format('MMMM YYYY')}
        </time>
        <span className="post__meta-divider" />
        <span className="post__meta-category" key={categorySlug}>
          <Link to={categorySlug} className="post__meta-category-link">
            {category}
          </Link>
        </span>
      </div>
      <h2 className="post__title">
        <Link className="post__title-link" to={slug}>{title}</Link>
      </h2>
      <p className="post__description">{description}</p>
      <Link className="post__readmore" to={slug}>Read</Link>
    </div>
  );
};

Post.propTypes = {
  data: PropTypes.shape({
    node: PropTypes.shape({
      frontmatter: PropTypes.shape({
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
      fields: PropTypes.shape({
        categorySlug: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Post;
