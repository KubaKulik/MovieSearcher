import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';

const Nav = () => {
  return(
    <nav className={styles.nav}>
      <NavLink className={styles.navItem} to="/Login/"> Login </NavLink>
      <NavLink className={styles.navItem} to="/Register/"> Register </NavLink>
      <NavLink className={styles.navItem} to="/Films/"> Films </NavLink>
    </nav >
  );
};

export default Nav;