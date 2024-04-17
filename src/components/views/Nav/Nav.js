import { NavLink } from 'react-router-dom';


const Nav = () => {
  return(
    <nav>
      <NavLink to="/Login/"> Login </NavLink>
      <NavLink to="/Register/"> Register </NavLink>
    </nav >
  );
};

export default Nav;