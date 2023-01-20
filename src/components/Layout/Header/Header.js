import logo from './logo.svg';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles['header__title']}>
        <img className={styles['header__logo']} src={logo} alt="Logo" />
        SportSee
      </div>
      <nav className={styles['header__nav']}>
        <ul className={styles['header__nav-list']}>
          <li className={styles['header__nav-listitem']}>Accueil</li>
          <li className={styles['header__nav-listitem']}>Profil</li>
          <li className={styles['header__nav-listitem']}>Réglage</li>
          <li className={styles['header__nav-listitem']}>Communauté</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
