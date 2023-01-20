import React from 'react';
import Header from './Header/Header';
import SideNav from './SideNav/SideNav';
import styles from './Layout.module.scss';

const Layout = props => {
  return (
    <React.Fragment>
      <Header />
      <main className={styles.main}>
        <SideNav />
        {props.children}
      </main>
    </React.Fragment>
  );
};

export default Layout;
