import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import IDE from '../pages/IDE';
import Interview_Home from '../pages/Interview_Home';
import Interview from '../pages/Interview';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Create_Questions from '../pages/Create_Questions';
import Question from '../pages/Question';
import { ContextProvider } from '../config/SocketContext';

const Routes: React.FC = () => (
    
    <Switch>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/home" component={Home}/>
        <Route path="/ide" component={IDE}/>
        <Route path="/interview_home" component={Interview_Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/create" component={Create_Questions}/>
        <Route path="/question/:id" component={Question}/>
        <ContextProvider>
            <Route path="/interview" component={Interview}/>
        </ContextProvider>
    </Switch>
)

export default Routes;
