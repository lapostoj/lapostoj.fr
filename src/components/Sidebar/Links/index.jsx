import React from 'react';
import './style.scss';
import '../../../assets/fonts/fontello-771c82e0/css/fontello.css';

export default ({ data: author }) => (
  <div className="links">
    <ul className="links__list">
      <li className="links__list-item">
        <a href={`https://www.github.com/${author.github}`} target="_blank" rel="noopener noreferrer">
          <i className="icon-github" />
        </a>
      </li>
      <li className="links__list-item">
        <a href={`mailto:${author.email}`}>
          <i className="icon-mail" />
        </a>
      </li>
    </ul>
  </div>
);
