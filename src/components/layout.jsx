import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Layout = ({ children }) => (
  <div className="layout">
    <Helmet
      title="lapostoj - Jerome Lapostolet"
      meta={[
        { name: 'description', content: 'CV, Portfolio and Blog website for lapostoj.' },
        { name: 'keywords', content: 'lapostoj, developper, software, engineer, cv, portfolio, blog, resume' },
      ]}
    />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default Layout;
