import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import IDE from '../pages/IDE';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import Question from '../pages/Question';
import Dashboard from '../pages/Dashboard';
import Interview from '../pages/Interview';
import LoginSignin from '../pages/Login-Signin';
import Interview_Home from '../pages/Interview_Home';
import Create_Questions from '../pages/Create_Questions';
import Interview_Schedule from '../pages/Interview_Schedule';
import UnauthorisedDialog from '../components/UnauthorisedDialog';
import { ContextProvider } from '../config/SocketContext';

const Routes: React.FC = () => {

    // const isLoggedIn = (JSON.parse(localStorage.getItem('profile') as string)?.data.token !== null);
    
    return (
        <Switch>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/home" component={Home}/>
            <Route path="/ide" component={IDE}/>
            <Route path="/interview_home" component={Interview_Home}/>
            <Route path="/signin" component={LoginSignin}/>
            <Route path="/signup" component={Signup}/>
            <Route path='/profile' component={(JSON.parse(localStorage.getItem('profile') as string) !== null)?Profile:UnauthorisedDialog}/>
            <Route path='/create' component={(JSON.parse(localStorage.getItem('profile') as string) !== null)?Create_Questions:UnauthorisedDialog}/>
            <Route path="/question/:id" component={Question}/>
            <Route path='/schedule' component={(JSON.parse(localStorage.getItem('profile') as string) !== null)?Interview_Schedule:UnauthorisedDialog}/>
            <ContextProvider>
                <Route path='/interview/:id' component={(JSON.parse(localStorage.getItem('profile') as string) !== null)?Interview:UnauthorisedDialog}/>
            </ContextProvider>
            <Redirect to="/"/>
        </Switch>
    )
}

export default Routes;
