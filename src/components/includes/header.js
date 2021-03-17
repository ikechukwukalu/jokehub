import React from 'react';
import { Link, useHistory } from "react-router-dom";

import { useDispatch } from 'react-redux'
import { getUsers } from '../redux/users'
import { makeToast } from '../helpers/custom';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Header = () => {
  const dispatch = useDispatch();
  let history = useHistory();

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
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <h1>JokeHub</h1>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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

        </div>
      </div>
    </nav>
  );

}

export default Header;
