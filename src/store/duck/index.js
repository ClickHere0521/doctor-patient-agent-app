
import { combineReducers } from 'redux';
import { user, form, language, patient, attorney, insurance, note, doctors, caseStatus } from './reducers/index'

const reducers = combineReducers({
	user,
	form,
	language,
	patient,
	attorney,
	insurance,
	note,
	doctors,
	caseStatus,
});

export default reducers;