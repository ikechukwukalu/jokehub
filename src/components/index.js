import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import NoMatch from "./helpers/no-match";

import Header from "./includes/header";
import Footer from "./includes/footer";

import Home from "./session/home";
import Jokes from "./session/jokes";

const Components = () => {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/" render={(props) => <Home />} />
        <Route exact path="/jokes/:category" render={(props) => <Jokes />} />
        <Route render={(props) => <NoMatch />} />
      </Switch>
      <Footer />
    </Fragment>
  );
}

export default Components;
