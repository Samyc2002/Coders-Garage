import React from 'react';
import { Switch, Route } from 'react-router-dom';

import IDE from '../pages/IDE';
import Login from '../pages/Login';

const Routes: React.FC = () => (
    
    <Switch>
        <Route path="/ide" exact component={IDE}/>
        <Route path="/login" component={Login}/>
    </Switch>
)

export default Routes;
