import types from '../action/types';

const initialState = {
	uid: '',
	patientName: '',
	patientDob: '',
	patientPhoto: '',
};

const patient = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_PATIENT_INFO:
			return {
				...state,
				uid: action.payload.pInfo,
				patientName: action.payload.pInfo,
				patientDob: action.payload.pInfo,
				patientPhoto: action.payload.pInfo
			};
		default:
			return state;
	}
};
export default patient;