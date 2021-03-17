import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import { useDispatch } from 'react-redux'
import { getUsers } from '../redux/users'
import { makeToast } from '../helpers/custom';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Collapse, NavbarToggler } from 'reactstrap';

const Header = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  let [toggle, setToggle] = useState(false);

  const logout = () => {
    localStorage.clear();
    makeToast("Farewell!", "success");
    setTimeout(() => {
      const data = {
        name: null,
        email: null,
        auth: false
      }
      dispatch(getUsers(data));
      history.push("/");
    }, 1000)
  }

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <h1>JokeHub</h1>
        </Link>
        <NavbarToggler onClick={() => setToggle(!toggle) } className="navbar-toggler" />
        <Collapse isOpen={toggle} navbar>
          <ul className="navbar-nav ml-auto">
            <UncontrolledDropdown tag="li" className="nav-item">
              <DropdownToggle tag="a" className="nav-link" href="/" onClick={(e) => e.preventDefault()} caret>
                {localStorage.getItem("name").toUpperCase()}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header><a className="nav-link" href="/" onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}>Sign Out</a></DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </ul>
        </Collapse>
      </div>
    </nav>
  );

}

export default Header;
