import React, { Fragment, useEffect } from "react";
import { HashRouter as Router, Link, useParams } from "react-router-dom";
import ReactDOM from 'react-dom';

import { useDispatch, useSelector } from 'react-redux';
import { globalsSelector } from '../redux/globals';


const Home = () => {
  const dispatch = useDispatch();
  const categories = localStorage.getItem("category").split(',');
  let { category } = useParams();
  console.log(category);

  const loadCategories = () => {
    let cat = categories.map((ele, inx) => <div key={'cat-' + inx} className="col-md-4 m-2"><Link to={'/' + ele} className="btn btn-light shadow-sm btn-block v-100">{ele}</Link></div>);
    ReactDOM.render(
      <Router>
        <div className="container mt-3">
          <div className="card p-3 shadow-sm mt-3">
            <div className="card-body">
              <div className="row justify-content-center align-items-center m-3">
                {cat}
              </div>
            </div>
            <div className="card-footer">
              <b>Filter jokes according to their category</b>
            </div>
          </div>
        </div>
      </Router>,
      document.getElementById('categories')
    )
  }

  useEffect(() => {
    loadCategories();
  }, [dispatch]);

  return (
    <Fragment>
      <div id="categories" className="main">
      </div>
      <div id="home" className="main">
      </div>
    </Fragment>
  );
}

export default Home;