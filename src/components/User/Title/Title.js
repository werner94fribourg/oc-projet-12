import React from 'react';
import styles from './Title.module.scss';

const Title = props => {
  const { firstName } = props;
  return (
    <React.Fragment>
      <h1 className={styles['title__main']}>
        Bonjour <span className={styles['title__firstname']}>{firstName}</span>
      </h1>
      <p className={styles['title__description']}>
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </p>
    </React.Fragment>
  );
};

export default Title;
