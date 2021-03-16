import React from 'react';

const Both = (props) => {
    const { jokes } = props;
    return (
        <div className="row">
            <div className="col-md-12">
                {jokes}
            </div>
        </div>
    );
}

export default Both;