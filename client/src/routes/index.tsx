import React from 'react';
import { Switch, Route } from 'react-router-dom';

import IDE from '../pages/IDE';
import Login from '../pages/Login';
import Interview from '../pages/Interview';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';

const Routes: React.FC = () => (
    
    <Switch>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/home" component={Home}/>
        <Route path="/ide" component={IDE}/>
        <Route path="/login" component={Login}/>
        <Route path="/interview" component={Interview}/>
    </Switch>
)

export default Routes;
