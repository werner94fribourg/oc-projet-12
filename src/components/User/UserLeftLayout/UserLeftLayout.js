/**
 * Inside the global User layout, it wraps the content that will be displayed on the left on the screen.
 * @module UserLeftLayout
 */
import styles from './UserLeftLayout.module.scss';
import PropTypes from 'prop-types';

/**
 * @typedef {object} Props
 * @prop {React.Component} children - the children components wrapped by the UserLeftLayout component
 */

/**
 * Inside the global User layout, it wraps the content that will be displayed on the left on the screen.
 *
 * @param {Props} props - the [props]{@link Props} passed to the React Component
 * @component
 * @example
 * const App = () => {
 *   return (
 *     <UserLeftLayout>
 *       <Activity />
 *         <UserLeftSecondRow>...</UserLeftSecondRow>
 *     </UserLeftLayout>
 *  );
 * };
 */
const UserLeftLayout = props => {
  return <div className={styles.layout}>{props.children}</div>;
};

UserLeftLayout.propTypes = {
  /**
   * The children components wrapped by the UserLeftLayout component
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default UserLeftLayout;
