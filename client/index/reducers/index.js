import { combineReducers } from 'redux';

import todos from './TodoReducer';
import login from './LoginReducer';

export default combineReducers({todos, login});
