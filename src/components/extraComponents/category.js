import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";

const Category = () => {
    const categories = localStorage.getItem("category") !== null ? localStorage.getItem("category").split(',') : ['Any'];
    const cat = categories.map((ele, inx) => <div key={'cat-' + inx} className="col-md-4 m-2"><Link to={'/jokes/' + ele} className="btn btn-light shadow-sm btn-block v-100">{ele}</Link></div>);

    return (
        <Router>
            <div className="min-vh-cs text-center m-0 d-flex flex-column justify-content-center align-items-center">
                <div className="container">
                    <div className="card shadow-sm">
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
            </div>
        </Router>
    );
}

export default Category;