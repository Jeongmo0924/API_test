import React, { memo } from 'react';

const ErrorView = memo(({error}) => {
    return (
        <div>
            <h1>Oops~!!! {error.code} Error.</h1>
            <hr/>
            <p>{error.message}</p>
        </div>
    );
});

export default ErrorView;