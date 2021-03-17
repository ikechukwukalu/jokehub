import React from 'react';
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div className="main">
      <div className="min-vh-cs text-center m-0 d-flex flex-column justify-content-center align-items-center">
        <h1 align="center">404</h1>
        <div className="text-center">
          <h2 align="center">Page Not Found</h2>
          <p className="text-sm" align="center">It seems we can’t find the page you are looking for. <Link to="/" className="text-info">Go back to the Home page</Link><br /></p>
        </div>
      </div>
    </div>
  )
};

export default NoMatch;