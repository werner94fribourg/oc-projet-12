import React from 'react';
import styles from './Header.module.scss';

const Header = props => {
  const { firstName } = props;
  return (
    <div className={styles.title}>
      <h1 className={styles['title__main']}>
        Bonjour <span className={styles['title__firstname']}>{firstName}</span>
      </h1>
      <p className={styles['title__description']}>
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </p>
    </div>
  );
};

export default Header;
