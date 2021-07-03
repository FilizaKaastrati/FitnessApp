import React from 'react';
import { Route, Redirect  } from 'react-router-dom';

const AuthRoute = ({component: Component, ...rest}) => {
    const login = localStorage.getItem('login');

    return (
        <Route {...rest} render={props => (
            login ? 
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    )
}

export default (AuthRoute);