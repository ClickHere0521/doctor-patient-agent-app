
import { combineReducers } from 'redux';
import { user, form } from './reducers/index'

const reducers = combineReducers({
	user,
	form
});

export default reducers;