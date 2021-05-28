import types from '../action/types';

const initialState = {
	caseStatus: []
};

const attorney = (state = initialState, action) => {
	switch (action.type) {
		case types.CHANGE_CASESTATUS:
			return {
				...state,
				caseStatus: action.payload.caseStatus,
			};
		default:
			return state;
	}
};
export default attorney;