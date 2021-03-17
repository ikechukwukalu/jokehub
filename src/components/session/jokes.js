import React, { Fragment, useState } from "react";
import { useParams, Link } from "react-router-dom";

import JokeComponent from '../extraComponents/joke'

const Jokes = () => {
    let [both, setBoth] = useState(true);
    let [lang, setLang] = useState('en');
    let [type, setType] = useState('all');
    let [randomize, setRandomize] = useState(null);
    const { category } = useParams();

    return (
        <Fragment>
            <div className="main">
                <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card p-3 shadow-sm bg-dark">
                                <div className="card-header text-white">
                                    <b>View Jokes&nbsp;{"for " + category + " Category"}</b>
                                    <div className="float-right">
                                        <div className="btn-group">
                                            <button type="button" onClick={() => setRandomize(Math.random())} className="btn btn-green shadow-sm">More Jokes Please?</button>
                                            <Link to={'/'} className="btn btn-danger shadow-sm">Home Page</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row justify-content-center align-items-center m-3">
                                        <JokeComponent
                                            fetch={randomize}
                                            amount={10}
                                            both={both}
                                            typeParam={type}
                                            langParam={lang}
                                            categoryParam={category}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-3 shadow-sm">
                                <div className="card-header">
                                    <b>Customise Your Jokes</b>
                                </div>
                                <div className="card-body">
                                    <div className="row justify-content-center align-items-center m-3">
                                        <div className="col-md-12 p-3">
                                            <label>Language:</label>
                                            <select defaultValue={"en"} className="form-control" id="lang" name="lang">
                                                <option value="cs">Czech</option>
                                                <option value="en">English</option>
                                                <option value="fr">French</option>
                                                <option value="de">German</option>
                                                <option value="other">Other / Custom</option>
                                                <option value="pt">Portuguese</option>
                                                <option value="es">Spanish</option>
                                            </select>
                                        </div>
                                        <div className="col-md-12 p-3">
                                            <label>Display Jokes:</label>
                                            <select defaultValue={true} className="form-control" id="both" name="both">
                                                <option value={true}>Together</option>
                                                <option value={false}>Separately</option>
                                            </select>
                                        </div>
                                        <div className="col-md-12 p-3">
                                            <label>Jokes To show:</label>
                                            <select defaultValue={"all"} className="form-control" id="type" name="type">
                                                <option value="all">All</option>
                                                <option value="single">Single</option>
                                                <option value='twopart'>Two Part</option>
                                            </select>
                                        </div>
                                    </div>
                                    <p align="center" className="p-3">
                                        <button type="button" className="btn btn-danger" onClick={() => {
                                            setBoth($('#both').val() === 'true' ? true : false);
                                            setType($('#type').val());
                                            setLang($('#lang').val())
                                            console.log($('#both').val(), $('#type').val(), $('#lang').val());
                                        }}>Adjust Settings</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Jokes;