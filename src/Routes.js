import React from 'react';
import {Switch, Route } from 'react-router-dom';

import Feed from './pages/Index';
import edit from './pages/edit';
import form from './Components/Form';

function Routes(){
    return(
        <Switch>
            <Route path="/" exact component ={Feed} />
            <Route path="/new" component ={edit} />
        </Switch>
    )
}

export default Routes;
