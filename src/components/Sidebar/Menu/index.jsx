import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import './style.scss';

const Menu = ({ data: menu }) => {
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

Menu.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Menu;
