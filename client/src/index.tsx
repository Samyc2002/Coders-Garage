import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from '@material-ui/core/styles'

import './index.css';
import App from './App';
import reducers from './reducers';
import { theme } from './styles';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
    	    <App/>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
);