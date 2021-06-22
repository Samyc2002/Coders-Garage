import React from 'react';
import { Switch, Route } from 'react-router-dom';

import IDE from '../pages/IDE';
import Login from '../pages/Login';
import Interview from '../pages/Interview';

const Routes: React.FC = () => (
    
    <Switch>
        <Route path="/ide" exact component={IDE}/>
        <Route path="/login" component={Login}/>
        <Route path="/interview" component={Interview}/>
    </Switch>
)

export default Routes;
