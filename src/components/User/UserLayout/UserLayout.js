/**
 * User data layout of the application, wrapping the graphs and the cards in the application.
 * @module UserLayout
 */
import styles from './UserLayout.module.scss';
import PropTypes from 'prop-types';

/**
 * @typedef {object} Props
 * @prop {React.Component} children - the children components wrapped by the UserLayout component
 */

/**
 * User data layout of the application, wrapping the graphs and the cards in the application.
 *
 * @param {Props} props - the [props]{@link Props} passed to the React Component
 * @component
 * @example
 * const App = () => {
 *   return (
 *     <UserLayout>
 *       <UserLeftLayout>...</UserLeftLayout>
 *       <UserRightLayout>...</UserRightLayout>
 *     </UserLayout>
 *    );
 * };
 */
const UserLayout = props => {
  return <div className={styles.layout}>{props.children}</div>;
};

UserLayout.propTypes = {
  /**
   * The children components wrapped by the UserLayout component
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default UserLayout;
