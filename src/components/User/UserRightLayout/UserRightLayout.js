/**
 * Inside the global User layout, it wraps the content that will be displayed on the right on the screen.
 * @module UserRightLayout
 */
import styles from './UserRightLayout.module.scss';
import PropTypes from 'prop-types';

/**
 * @typedef {object} Props
 * @prop {React.Component} children - the children components wrapped by the UserRightLayout component
 */

/**
 * Inside the global User layout, it wraps the content that will be displayed on the right on the screen.
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
const UserRightLayout = props => {
  return <div className={styles.layout}>{props.children}</div>;
};

UserRightLayout.propTypes = {
  /**
   * The children components wrapped by the UserRightLayout component
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default UserRightLayout;
