
import { combineReducers } from 'redux';
import { user, form, language, patient, attorney, insurance, note } from './reducers/index'

const reducers = combineReducers({
	user,
	form,
	language,
	patient,
	attorney,
	insurance,
	note,
});

export default reducers;