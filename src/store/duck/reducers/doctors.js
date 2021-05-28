import types from '../action/types';

const initialState = {
	doctors: []
};

const attorney = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_DOCTORS:
			return {
				...state,
				doctors: [...action.payload],
			};
		default:
			return state;
	}
};
export default attorney;