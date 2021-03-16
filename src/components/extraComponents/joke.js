import React, { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Alert } from 'reactstrap';

import { useSelector } from 'react-redux'
import { globalsSelector } from '../redux/globals'

import { sendRequest } from '../helpers/custom';

import Separate from './jokeType/separate';
import Both from './jokeType/both';

const Joke = (props) => {
    let [noJokes, setNoJokes] = useState(false);
    let [error, setErrorMessage] = useState('other');

    const { api_url, blacklist, lang, category, safe } = useSelector(globalsSelector);
    const { amount, both } = props;
    const onTheHouse = 'We\'ve become the joke...';

    let cat = category === null ? ['Any'] : category.split(",");

    const displayFailMessage = () => {
        switch (error) {
            case 'api':
                return <Fragment><b>Sorry, but we could't fetch you some good jokes!</b> We failed you. <span style={{ fontSize: '30px' }}>😭</span></Fragment>;
                break;
            case 'network':
                return <Fragment><b>Network Error!</b> Please check your network connection</Fragment>;
                break;
            case 'other':
                return <Fragment><b>Opps, something went wrong!</b> Try again?</Fragment>;
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
    const noJokesResponse = () => {
        console.error("Could not fetch jokes");
        setErrorMessage('api');
        setNoJokes(true);
    }
    const separateJokes = (data) => {
        let single = [];
        let twopart = [];
        data.jokes.map((ele) => {
            ele.type === 'single' ? single.push(ele) : twopart.push(ele);
        });
        ReactDOM.render(
            <Separate single={single} twopart={twopart} />,
            document.getElementById('jokes-hub')
        );
    }
    const bothJokes = (data) => {
        let ary = data.jokes.map((ele, inx) =>
            ele.type === 'single' ?
                <p key={'sg-' + inx}>{inx + 1}.&nbsp;{ele.joke}</p>
                :
                <p key={'tp-' + inx}>{inx + 1}.&nbsp;{ele.setup + ' - (' + ele.delivery + ')'}</p>
        );
        ReactDOM.render(
            <Both jokes={ary} />,
            document.getElementById('jokes-hub')
        )
    }
    const displayJokes = (data) => {
        if (both)
            bothJokes(data);
        else
            separateJokes(data);
    }
    const landingJoke = () => {
        ReactDOM.render(
            'loading...',
            document.getElementById('jokes-hub')
        );
        let form = {
            action: api_url + cat[0] + '?amount=' + amount + '&' + blacklist + '&' + lang + '&' + safe,
            method: 'GET'
        }
        const thenFunc = (response) => {
            let data = response.data;
            if (amount < 1) {
                noJokesResponse();
            } else if ((amount > 0 && amount < 2)) {
                if (data.error) {
                    noJokesResponse();
                } else {
                    let ary = {
                        jokes: []
                    }
                    ary.jokes.push(data);
                    displayJokes(ary);
                }
            } else {
                displayJokes(data);
            }

        };
        const catchFunc = (e) => {
            if (typeof e === 'object' && 'toJSON' in e) {
                if (e.toJSON().message === 'Network Error')
                    setErrorMessage('network');
            } else {
                setErrorMessage('other');
                ReactDOM.render(onTheHouse, document.getElementById('jokes-hub'));
            }
            setNoJokes(true);
        };
        sendRequest(form, {}, thenFunc, catchFunc);
    }

    useEffect(() => {
        landingJoke();
    }, [both]);

    return (
        <Fragment>
            <div id="jokes-hub" className="text-white">Loading...</div>
            {checkForNoJokes()}
        </Fragment>
    );
}

Joke.defaultProps = {
    both: false,
    amount: 1
}

export default Joke;