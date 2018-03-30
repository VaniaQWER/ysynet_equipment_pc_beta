import user from './user';
import menu from './menu';
import repairRecord from './repairRecord'
import { combineReducers } from 'redux';

const reducer = combineReducers({
  user, menu, repairRecord
})

export default reducer;