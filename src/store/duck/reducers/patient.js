import types from '../action/types';

const initialState = {
	pInfo: []
};

const patient = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_PATIENT_INFO:
			return {
				...state,
				pInfo: action.payload.pInfo,
			};
		default:
			return state;
	}
};
export default patient;