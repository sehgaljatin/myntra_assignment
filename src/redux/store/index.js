import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import createRootReducer from '../reducers';
import promise from 'redux-promise-middleware'
export const history = createBrowserHistory();


const middleware = [thunk, promise, routerMiddleware(history)];


const composedEnhancers = compose(applyMiddleware(...middleware));
export const store = createStore( createRootReducer(history) , composedEnhancers);