import styles from './UserLayout.module.scss';

const UserLayout = props => {
  return <div className={styles.layout}>{props.children}</div>;
};

export default UserLayout;
