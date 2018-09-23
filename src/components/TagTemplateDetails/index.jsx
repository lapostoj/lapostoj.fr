import React from 'react';
import Post from '../Post';

export default ({ data, tag }) => {
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
