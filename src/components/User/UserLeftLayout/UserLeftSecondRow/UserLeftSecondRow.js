import styles from './UserLeftSecondRow.module.scss';

const UserLeftSecondRow = props => {
  return <div className={styles.layout}>{props.children}</div>;
};

export default UserLeftSecondRow;
