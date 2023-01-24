import styles from './UserLeftLayout.module.scss';

const UserLeftLayout = props => {
  return <div className={styles.layout}>{props.children}</div>;
};

export default UserLeftLayout;
