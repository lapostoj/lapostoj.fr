import React from 'react';
import Helmet from 'react-helmet';
import '../assets/scss/init.scss';

class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className="layout">
        <Helmet
          title="lapostoj - Jerome Lapostolet"
          meta={[
            { name: 'description', content: 'CV, Portfolio and Blog website for lapostoj.' },
            { name: 'keywords', content: 'lapostoj, developper, software, engineer, cv, portfolio, blog, resume' },
          ]}
        />
        {children()}
      </div>
    );
  }
}

export default Layout;
