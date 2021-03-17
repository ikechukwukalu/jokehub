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
    let [failMessage, setFailMessage] = useState("We've become the joke...");

    const { api_url, blacklist, category, safe } = useSelector(globalsSelector);
    const { fetch, amount, both, langParam, typeParam, categoryParam } = props;
    const checkForCategory = () => {
        let ary = [];
        if (categoryParam === null)
            return category === null ? ['Any'] : category.split(",");
        else {
            ary.push(categoryParam);
            return ary;
        }
    }
    const lang = langParam !== "en" ? "lang=" + langParam : "";
    const type = typeParam !== "all" ? "type=" + typeParam : "";
    const cat = checkForCategory();

    const displayFailMessage = () => {
        switch (error) {
            case 'api':
                return <Fragment><b>{failMessage}!</b> We failed you. <span style={{ fontSize: '30px' }}>😭</span></Fragment>;
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
            <Alert color="danger" isOpen={noJokes} toggle={() => { setNoJokes(false); setTimeout(() => landingJoke(), 1000); }}>
                {displayFailMessage()}
            </Alert>
        )
    }
    const noJokesResponse = (message = "We've become the joke...") => {
        setFailMessage(message);
        setErrorMessage('api');
        setNoJokes(true)
        ReactDOM.render(
            null,
            document.getElementById('jokes-hub')
        )
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
        setNoJokes(false);
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
            action: api_url + cat[0] + '?amount=' + amount + '&' + blacklist + '&' + lang + '&' + safe + '&' + type,
            method: 'GET'
        }
        const thenFunc = (response) => {
            let data = response.data;
            if (amount < 1) {
                noJokesResponse();
            } else if ((amount > 0 && amount < 2)) {
                if (data.error) {
                    noJokesResponse(data.message);
                } else {
                    let ary = {
                        jokes: []
                    }
                    ary.jokes.push(data);
                    displayJokes(ary);
                }
            } else {
                if (data.error) {
                    noJokesResponse(data.message);
                } else {
                    displayJokes(data)
                };
            }

        };
        const catchFunc = (e) => {
            if (typeof e === 'object' && 'toJSON' in e) {
                if (e.toJSON().message === 'Network Error')
                    setErrorMessage('network');
            } else {
                setErrorMessage('other');
                ReactDOM.render(failMessage, document.getElementById('jokes-hub'));
            }
            setNoJokes(true);
        };
        sendRequest(form, {}, thenFunc, catchFunc);
    }

    useEffect(() => {
        landingJoke();
    }, [fetch, both, langParam, typeParam, categoryParam]);

    return (
        <Fragment>
            <div className="col-12">
                <div id="jokes-hub" className="text-white">Loading...</div>
            </div>
            <div className="col-12">
                {checkForNoJokes()}
            </div>
        </Fragment>
    );
}

Joke.defaultProps = {
    both: false,
    amount: 1,
    categoryParam: null,
    langParam: 'en',
    typeParam: 'all',
    fetch: null
}

export default Joke;