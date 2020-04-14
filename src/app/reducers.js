import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {reducer as apiKeyReducer} from './apikey';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  auth: apiKeyReducer,
});

export default createRootReducer;
