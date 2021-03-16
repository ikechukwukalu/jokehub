import React from 'react';
import { Link } from "react-router-dom";

import { useDispatch } from 'react-redux'
import { getUsers } from '../redux/users'
import { makeToast } from '../helpers/custom';

const Header = () => {
  const dispatch = useDispatch();

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
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={(e) => {
                e.preventDefault();
                logout();
              }}>Sign Out</a>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );

}

export default Header;
