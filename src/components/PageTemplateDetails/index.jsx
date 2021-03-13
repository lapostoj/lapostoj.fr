import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'gatsby';
import './page-template-details.scss';

const PageTemplateDetails = ({ page }) => {
  const tags = page.fields ? page.fields.tagSlugs : [];

  const dateBlock = page.frontmatter.date ? (
    <div className="page__date">
      <em>Published {moment(page.frontmatter.date).format('D MMM YYYY')}</em>
    </div>
  ) : '';

  const tagsBlock = tags.length === 0 ? '' : (
    <div className="page__tags">
      <ul className="page__tags-list">
        {tags && tags.map((tag, i) => (
          <li className="page__tags-list-item" key={tag}>
            <Link to={tag} className="page__tags-list-item-link">
              {page.frontmatter.tags[i]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  /* eslint-disable react/no-danger */
  return (
    <div className="content">
      <div className="content__inner">
        <div className="page">
          <h1 className="page__title">{page.frontmatter.title}</h1>
          {tagsBlock}
          {dateBlock}
          <div className="page__body" dangerouslySetInnerHTML={{ __html: page.html }} />
        </div>
      </div>
    </div>
  );
  /* eslint-enable react/no-danger */
};

PageTemplateDetails.propTypes = {
  page: PropTypes.shape({
    fields: PropTypes.shape({
      tagSlugs: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
    frontmatter: PropTypes.shape({
      date: PropTypes.string,
      title: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    html: PropTypes.string,
  }).isRequired,
};

export default PageTemplateDetails;
