import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';
import './App.css';

const App: React.FC = () => {
  return (
    <>
    <Scrollbars autoHide autoHideTimeout={2000} style={{ height: '100vh', width: '100vw' }}>
		<Router>
			<Routes/>
		</Router>
    </Scrollbars>
    </>
  );
}

export default App;
