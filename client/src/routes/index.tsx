import React from 'react';
import { Switch, Route } from 'react-router-dom';

import IDE from '../pages/IDE';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/ide" exact component={IDE}/>
    </Switch>
)

export default Routes;
