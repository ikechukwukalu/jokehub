import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

class Home extends Component {
  componentDidMount() {
    // this.props.setGlobals();
  }
  render() {
    const { base_url, api_url } = this.props;
    console.info(base_url, api_url);
    return (
      <Fragment>
        <div id="home" className="main">
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  base_url: state.globals.base_url,
  api_url: state.globals.api_url,
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setGlobals: () => {
//       dispatch(setGlobals());
//     },
//   };
// };

export default connect(mapStateToProps)(Home);