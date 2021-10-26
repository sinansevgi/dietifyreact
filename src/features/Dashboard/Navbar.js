import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { MdHome, MdOutlineExitToApp } from 'react-icons/md';
import { GiMeal } from 'react-icons/gi';
import { ImStatsDots } from 'react-icons/im';
import '../../assets/Navbar.css';

const Navbar = () => {
  const history = useHistory();

  const onLogOut = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };
  return (

    <div className="bottom-nav">
      <NavLink to="/" className="bottom-nav-item" exact activeClassName="bottom-nav-item active">
        <MdHome />
        <h3 className="bottom-nav-item--title">Home</h3>
      </NavLink>
      <NavLink to="/meals" className="bottom-nav-item" activeClassName="bottom-nav-item active">
        <GiMeal />
        <h3 className="bottom-nav-item--title">Meals</h3>
      </NavLink>
      <NavLink to="/tracker" className="bottom-nav-item" activeClassName="bottom-nav-item active">
        <ImStatsDots />
        <h3 className="bottom-nav-item--title">Tracker</h3>
      </NavLink>
      <div onClick={onLogOut} aria-hidden="true" className="bottom-nav-item">
        <MdOutlineExitToApp />
        <h3 className="bottom-nav-item--title">Log Out</h3>
      </div>
    </div>
  );
};

export default Navbar;
