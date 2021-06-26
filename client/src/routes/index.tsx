import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import IDE from '../pages/IDE';
import Interview from '../pages/Interview';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

const Routes: React.FC = () => (
    
    <Switch>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/home" component={Home}/>
        <Route path="/ide" component={IDE}/>
        <Route path="/interview" component={Interview}/>
        <Route path="/login" component={Login}/>
        <Route path="/profile" component={Profile}/>
    </Switch>
)

export default Routes;
