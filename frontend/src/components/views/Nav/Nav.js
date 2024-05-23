import { NavLink } from "react-router-dom";
import styles from "./Nav.module.scss";
import { PiFilmSlateBold } from "react-icons/pi";

const Nav = ({ loggedIn }) => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logoSection}>
        <PiFilmSlateBold className={styles.logo} /> Movie<span className={styles.colored}>Searcher</span>AEH
      </div>

      <div>
        {loggedIn ? (
          <>
            <NavLink className={styles.navItem} to="/films">
              Films
            </NavLink>
            <NavLink className={styles.navItem} to="/logout">
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className={styles.navItem} to="/login">
              Login
            </NavLink>
            <NavLink className={styles.navItem} to="/register">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
