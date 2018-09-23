import React from 'react';
import { Link } from 'gatsby';
import './style.scss';

export default ({ data: menu }) => {
  const menuBlock = (
    <ul className="menu__list">
      {!menu ? '' : menu.map(item => (
        <li className="menu__list-item" key={item.path}>
          <Link
            to={item.path}
            className="menu__list-item-link"
            activeClassName="menu__list-item-link menu__list-item-link--active"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="menu">
      {menuBlock}
    </nav>
  );
};
