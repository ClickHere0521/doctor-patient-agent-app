
import { combineReducers } from 'redux';
import { user, form, language, patient, attorney, insurance, note, doctors } from './reducers/index'

const reducers = combineReducers({
	user,
	form,
	language,
	patient,
	attorney,
	insurance,
	note,
	doctors
});

export default reducers;