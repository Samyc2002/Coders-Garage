import React from 'react';
import { Switch, Route } from 'react-router-dom';

import IDE from '../pages/IDE';
import Login from '../pages/Login';
import Interview from '../pages/Interview';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
    
    <Switch>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/ide" component={IDE}/>
        <Route path="/login" component={Login}/>
        <Route path="/interview" component={Interview}/>
    </Switch>
)

export default Routes;
