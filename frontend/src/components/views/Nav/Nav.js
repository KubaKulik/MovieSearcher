import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';

const Nav = ({ loggedIn }) => {
  return (
    <nav className={styles.nav}>
      {loggedIn ? (
        <>
          <NavLink className={styles.navItem} to="/films">Films</NavLink>
          <NavLink className={styles.navItem} to="/logout">Logout</NavLink>
        </>
      ) : (
        <>
          <NavLink className={styles.navItem} to="/login">Login</NavLink>
          <NavLink className={styles.navItem} to="/register">Register</NavLink>
        </>
      )}
    </nav>
  );
};

export default Nav;
