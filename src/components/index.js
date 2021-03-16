import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import NoMatch from "./helpers/no-match";

import Header from "./includes/header";
import Footer from "./includes/footer";

import Home from "./session/home.jsx";

class Components extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/:category?" render={(props) => <Home />} />
          <Route render={(props) => <NoMatch />} />
        </Switch>
        <Footer />
      </Fragment>
    );
  }
}
export default Components;
