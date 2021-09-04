import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import createRootReducer from '../reducers';
import promise from 'redux-promise-middleware'
export const history = createBrowserHistory();
const middleware = [thunk, promise, routerMiddleware(history)];
const enhancers = [];
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}
// const composedEnhancers = compose(applyMiddleware(...middleware));
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
export const store = createStore( createRootReducer(history) , composedEnhancers);