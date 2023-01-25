/**
 * Component for showing details of the user.
 * @module UserHeader
 */
import React from 'react';
import styles from './Header.module.scss';
import PropTypes from 'prop-types';

/**
 * @typedef {object} Props
 * @prop {string} name - the name of the user we want to display on the header
 */

/**
 * Component for showing details of the user.
 *
 * @param {Props} props - the [props]{@link Props} passed to the React Component
 * @component
 * @example
 * const name = 'Werner';
 * return (
 *   <Header name={name} />
 * )
 */
const UserHeader = props => {
  const { name } = props;
  return (
    <div className={styles.title}>
      <h1 className={styles['title__main']}>
        Bonjour <span className={styles['title__name']}>{name}</span>
      </h1>
      <p className={styles['title__description']}>
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </p>
    </div>
  );
};

UserHeader.propTypes = {
  /**
   * The name of the user we want to display on the header
   */
  name: PropTypes.string,
};

export default UserHeader;
