/**
 * Component that wraps, inside the left layout of the screen, the 3 score, performance and score charts and displays it on a single line.
 * @module UserLeftSecondRow
 */
import styles from './UserLeftSecondRow.module.scss';
import PropTypes from 'prop-types';

/**
 * @typedef {object} Props
 * @prop {React.Component} children - the children components wrapped by the UserLeftSecondRow component
 */

/**
 * Component that wraps, inside the left layout of the screen, the 3 score, performance and score charts and displays it on a single line.
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
const UserLeftSecondRow = props => {
  return <div className={styles.layout}>{props.children}</div>;
};

UserLeftSecondRow.propTypes = {
  /**
   * The children components wrapped by the UserLeftSecondRow  component
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default UserLeftSecondRow;
