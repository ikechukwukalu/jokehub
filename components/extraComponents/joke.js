import React, { Fragment, useEffect, useState } from 'react';

import { Alert } from 'reactstrap';

import { useSelector } from 'react-redux'
import { globalsSelector } from '../redux/globals'

import { sendRequest } from '../helpers/custom';

const Joke = (props) => {
    let [noJokes, setNoJokes] = useState(false);
    let [error, setErrorMessage] = useState('network');
    
    const { api_url, blacklist, lang, category, safe } = useSelector(globalsSelector);
    const onTheHouse = 'We\'ve become the joke...';
    const { amount } = props;

    const displayFailMessage = () => {
        switch (error) {
            case 'api':
                return <Fragment><b>Sorry, but we could't fetch some jokes!</b> We failed you. <span style={{ fontSize: '30px' }}>😭</span></Fragment>;
                break;
            case 'network':
                return <Fragment><b>Network Error!</b> Please check your network connection</Fragment>;
                break;
            default:
                return <Fragment><b>Network Error!</b> Please check your network connection</Fragment>;
        }
    }
    const checkForNoJokes = () => {
        return (
            <Alert color="danger" isOpen={noJokes} toggle={() => setNoJokes(false)}>
                {displayFailMessage()}
            </Alert>
        )
    }
    const landingJoke = () => {
        let form = {
            action: api_url + category[0] + '?amount=' + amount + '&' + blacklist + '&' + lang + '&' + safe,
            method: 'GET'
        }
        const thenFunc = (response) => {
            let data = response.data;
            if (data.error) {
                console.error("Could not fetch jokes");
                $('#landing-joke').html(onTheHouse);
                setNoJokes(true);
            } else
                data.type == 'single' ?
                    $('#landing-joke').html(data.joke)
                    :
                    $('#landing-joke').html(data.setup + ' - (' + data.delivery + ')');
        };
        const catchFunc = (e) => {
            if (e.toJSON().message === 'Network Error') {
                setErrorMessage('network');
            } else {
                setErrorMessage('api');
                $('#landing-joke').html(onTheHouse);
            }
            setNoJokes(true);
        };
        sendRequest(form, {}, thenFunc, catchFunc);
    }

    useEffect(() => {
        landingJoke();
    }, [noJokes]);

    return (
        <Fragment>
            <span id="landing-joke">Loading...</span>
            {checkForNoJokes()}
        </Fragment>
    );
}

export default Joke;