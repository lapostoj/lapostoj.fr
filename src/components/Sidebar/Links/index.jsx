import React from 'react';
import PropTypes from 'prop-types';
import './links.scss';
import '../../../assets/fonts/fontello-771c82e0/css/fontello.css';

const Links = ({ author: { github, email } }) => (
  <div className="links">
    <ul className="links__list">
      <li className="links__list-item">
        <a href={`https://www.github.com/${github}`} target="_blank" rel="noopener noreferrer" aria-label="Github profile page">
          <i className="icon-github" />
        </a>
      </li>
      <li className="links__list-item">
        <a href={`mailto:${email}`} aria-label="Mailto link">
          <i className="icon-mail" />
        </a>
      </li>
    </ul>
  </div>
);

Links.propTypes = {
  author: PropTypes.shape({
    github: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default Links;
