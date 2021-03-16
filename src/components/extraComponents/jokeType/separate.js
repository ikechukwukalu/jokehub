import React from 'react';

const Separate = (props) => {
    const { single, twopart } = props;
    const SingleJokes = single.map((ele, inx) => <p key={'sg-' + inx}>{inx + 1}.&nbsp;{ele.joke}</p>);
    const TwoPartJokes = twopart.map((ele, inx) => <p key={'tp-' + inx}>{inx + 1}.&nbsp;{ele.setup + ' - (' + ele.delivery + ')'}</p>);

    return (
        <div className="row">
            <div className="col-md-6">
                <h3>Single - Jokes</h3>
                {SingleJokes}
            </div>
            <div className="col-md-6">
                <h3>TwoPart - Jokes</h3>
                {TwoPartJokes}
            </div>
        </div>
    );
}

export default Separate;