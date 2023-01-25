/**
 * Global layout of the application, rendering the Header and the SideNav. It wraps all the whole content of the application inside of it.
 * @module Layout
 */
import React from 'react';
import Header from './Header/Header';
import SideNav from './SideNav/SideNav';
import styles from './Layout.module.scss';
import PropTypes from 'prop-types';

/**
 * @typedef {object} Props
 * @prop {React.Component} children - the children components wrapped by the Layout component
 */

/**
 * Global layout of the application, rendering the Header and the SideNav. It wraps all the other content inside.
 *
 * @param {Props} props - the [props]{@link Props} passed to the React Component
 * @component
 * @example
 * const App = () => {
 *   return (
 *     <Layout>
 *       <AppRouter />
 *     </Layout>
 *    );
 * };
 */
const Layout = props => {
  return (
    <React.Fragment>
      <Header />
      <main className={styles.main}>
        <SideNav />
        <div className={styles['main__content']}>{props.children}</div>
      </main>
    </React.Fragment>
  );
};

Layout.propTypes = {
  /**
   * The children components wrapped by the Layout component
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
