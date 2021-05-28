import types from '../action/types';

const initialState = {
	attorneyInfo: []
};

const attorney = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_ATTORNEY_INFO:
			return {
				...state,
				attorneyInfo: action.payload.attorneyInfo,
			};
		default:
			return state;
	}
};
export default attorney;