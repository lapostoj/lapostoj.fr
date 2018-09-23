import React from 'react';
import { graphql, Link } from 'gatsby'
import Menu from './Menu';
import Links from './Links';
import profilePic from './photo.jpg';
import './style.scss';

class Sidebar extends React.Component {
  render() {
    const { data } = this.props;
    const { author, copyright, menu } = data.site.siteMetadata;

    const authorBlock = (
      <div>
        <Link to="/">
          <img
            src={profilePic}
            className="sidebar__author-photo"
            width="100"
            height="100"
            alt={author.name}
          />
        </Link>
        <h2 className="sidebar__author-title">
          <Link className="sidebar__author-title-link" to="/">{author.name}</Link>
        </h2>
        <div className="sidebar__author-details">
          <div className="sidebar__author-details-job">
            {`${author.job.title} at `}
            <a className="sidebar__author-details-job-link" href={author.job.url} target="_blank" rel="noopener noreferrer">
              {author.job.company}
            </a>.
          </div>
          <div className="sidebar__author-details-location">
            Currently in {author.location}.
          </div>
          <p className="sidebar__author-details-subtitle">{author.subtitle}</p>
        </div>
      </div>
    );

    return (
      <div className="sidebar">
        <div className="sidebar__inner">
          <div className="sidebar__author">
            {authorBlock}
          </div>
          <div>
            <Menu data={menu} />
            <Links data={author} />
            <p className="sidebar__copyright">
              {copyright}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;

export const siteQuery = graphql`
  fragment site on Query {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          email
          github
          job {
            title
            company
            url
          }
          location
          subtitle
        }
      }
    }
  }
`;
