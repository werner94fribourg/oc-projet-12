import meditation from './meditation.svg';
import swimming from './swimming.svg';
import cycling from './cycling.svg';
import musculation from './musculation.svg';
import styles from './SideNav.module.scss';

const SideNav = () => {
  return (
    <div className={styles.sidenav}>
      <nav className={styles['sidenav__nav']}>
        <ul className={styles['sidenav__nav-list']}>
          <li className={styles['sidenav__nav-listitem']}>
            <img
              className={styles['sidenav__nav-listimg']}
              src={meditation}
              alt="Meditation"
            />
          </li>
          <li className={styles['sidenav__nav-listitem']}>
            <img
              className={styles['sidenav__nav-listimg']}
              src={swimming}
              alt="Swimming"
            />
          </li>
          <li className={styles['sidenav__nav-listitem']}>
            <img
              className={styles['sidenav__nav-listimg']}
              src={cycling}
              alt="Swimming"
            />
          </li>
          <li className={styles['sidenav__nav-listitem']}>
            <img
              className={styles['sidenav__nav-listimg']}
              src={musculation}
              alt="Swimming"
            />
          </li>
        </ul>
      </nav>
      <div className={styles['sidenav__content']}>Copyright, SportSee 2020</div>
    </div>
  );
};

export default SideNav;
