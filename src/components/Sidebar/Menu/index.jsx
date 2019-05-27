import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import './style.scss';

const Menu = ({ menu }) => {
  const menuBlock = (
    <ul className="menu__list">
      {!menu ? '' : menu.map(({ path, label }) => (
        <li className="menu__list-item" key={path}>
          <Link
            to={path}
            className="menu__list-item-link"
            activeClassName="menu__list-item-link menu__list-item-link--active"
          >
            {label}
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

Menu.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Menu;
