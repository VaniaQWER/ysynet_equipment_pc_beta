import login from './login';
import user from './user';
import menu from './menu';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const reducer = combineReducers({
  routerReducer, login, user, menu
})

export default reducer;