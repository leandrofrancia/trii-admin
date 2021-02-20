import {NavLink} from "react-router-dom";
import React from "react";

const MainNav = () => (
  <div className="navbar-nav mr-auto">
    <NavLink
      to="/"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Home
    </NavLink>
    <NavLink
      to="/clients"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Clientes
    </NavLink>
    <NavLink
      to="/newClient"
      exact
      className="nav-link"
      activeClassName="router-link-exact-active"
    >
      Alta Cliente
    </NavLink>
  </div>
);

export default MainNav;
