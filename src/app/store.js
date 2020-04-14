import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import createRootReducer from "./reducers";
import {saga as authSaga} from './apikey';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const middleware = [
  sagaMiddleware,
  routerMiddleware(history),
  createLogger()
];

const store = createStore(
  createRootReducer(history),
  {},
  compose(
    applyMiddleware(...middleware)
  )
);

sagaMiddleware.run(authSaga);

export default store;
