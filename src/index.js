import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'
import  { store, history } from './redux/store';
import Product from './components/product'; 
import "semantic-ui-css/semantic.min.css";


const provider = (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Switch>
				<Route path="/" component={Product} exact/>
			</Switch>
		</ConnectedRouter>

	</Provider>
);
ReactDOM.render(provider, document.getElementById('root'));