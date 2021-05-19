
import { combineReducers } from 'redux';
import { user, form, language, patient } from './reducers/index'

const reducers = combineReducers({
	user,
	form,
	language,
	patient,
});

export default reducers;