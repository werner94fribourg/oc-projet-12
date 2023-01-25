import styles from './UserRightLayout.module.scss';

const UserRightLayout = props => {
  return <div className={styles.layout}>{props.children}</div>;
};

export default UserRightLayout;
