import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ContextProvider } from './config/SocketContext';
import Routes from './routes';
import './App.css';

const App: React.FC = () => {
  return (
    <>
		<Router>
			<ContextProvider>
				<Routes/>
			</ContextProvider>
		</Router>
    </>
  );
}

export default App;
