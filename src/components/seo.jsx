import React from 'react';
import PropTypes from 'prop-types';

const SEO = ({ title, description, children }) => (
  <>
    <title>{title}</title>
    <meta name="description" content={description} />
    {children}
  </>
);

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node,
};

SEO.defaultProps = {
  description: 'CV, Portfolio and Blog website for lapostoj.',
  children: undefined,
};

export default SEO;
