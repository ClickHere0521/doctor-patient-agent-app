
import { combineReducers } from 'redux';
import { user, form, language } from './reducers/index'

const reducers = combineReducers({
	user,
	form,
	language
});

export default reducers;