import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../redux/users'
import { globalsSelector } from '../redux/globals'

import submitForm, { makeToast } from '../helpers/custom';
import JokeComponent from '../extraComponents/joke'

const Guest = () => {
    const dispatch = useDispatch();
    const { base_url } = useSelector(globalsSelector);
    let [both, setBoth] = useState(true);

    useEffect(() => {
        const original_value = 'Jump Right In';
        const loginForm = $('#loginForm');

        const thenFunc = () => {
            setTimeout(() => {
                loginForm.find('button[type="submit"]').html(original_value);
                loginForm.find('button[type="submit"]').prop("disabled", false);

                localStorage.setItem("name", $('#login-name').val());
                localStorage.setItem("email", $('#login-email').val());

                const data = {
                    name: localStorage.getItem("name"),
                    email: localStorage.getItem("email"),
                    auth: true
                }
                dispatch(getUsers(data))
                makeToast("Welcome!", "success");
            }, 1500)
        };
        submitForm(thenFunc);
    }, [dispatch]);

    return (
        <section id="main">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-6 d-none d-md-block bg-dark">
                        <div className="min-vh-100 text-center m-0 d-flex flex-column justify-content-center align-items-center">
                            <h3 className="text-white font-900">We've got really cool jokes. You can tell <span style={{ fontSize: '30px' }}>👇🏽</span></h3>
                            <JokeComponent amount={4} both={both} />
                        </div>
                    </div>
                    <div className="col-md-6 p-3">
                        <div className="min-vh-100 text-center m-0 d-flex flex-column justify-content-center align-items-center">
                            <div className="card shadow-sm w-75 p-3">
                                <div className="card-body">
                                    <h1 className="mb-3">JokeHub</h1>
                                    <form id="loginForm" action={base_url} method="GET">
                                        <div className="form-group">
                                            <label htmlFor="formGroupExampleInput" className="float-left">Fullname:</label>
                                            <input type="text" className="form-control" id="login-name" name="name" placeholder="" autoFocus required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="formGroupExampleInput2" className="float-left">Email:</label>
                                            <input type="email" className="form-control" id="login-email" name="email" placeholder="" required />
                                        </div>
                                        <div className="form-group pt-3">
                                            <button type="submit" className="btn btn-success">See More Jokes!</button>
                                            <button type="button" className="btn btn-link" onClick={() => setBoth(!both)}>{both ? "Want to see separate jokes?" : "Show jokes together?"}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Guest;