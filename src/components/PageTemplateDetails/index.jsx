import moment from 'moment';
import React from 'react';
import Link from 'gatsby-link';
import Sidebar from '../Sidebar';
import './style.scss';

class PageTemplateDetails extends React.Component {
  render() {
    const { data } = this.props;
    const page = data.markdownRemark;
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
      <div className="grid-wrapper">
        <Sidebar {...this.props} />
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
      </div>
    );
    /* eslint-enable react/no-danger */
  }
}

export default PageTemplateDetails;
