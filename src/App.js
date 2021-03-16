import React, { useEffect } from 'react';
import { HashRouter as Router } from "react-router-dom";

import User from './components';
import Visitor from './components/guest';

import ScrollToTop from './components/helpers/scroll.js';

import { useDispatch, useSelector } from 'react-redux';
import { usersSelector } from './components/redux/users';
import { setCategory } from './components/redux/globals';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/sass/style.scss';

const App = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(usersSelector);
  const authUser = () => {
    if(auth)
      return <User />
    else
      return <Visitor />
  }
  useEffect(() => {
    dispatch(setCategory());
  }, [auth]);

  return (
    <Router>
      <ScrollToTop>
        {authUser()}
      </ScrollToTop>
    </Router>
  );
}

export default App;