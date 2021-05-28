import types from '../action/types';

const initialState = {
	insuranceInfo: []
};

const insurance = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_INSURANCE_INFO:
			return {
				...state,
				insuranceInfo: action.payload.insuranceInfo,
			};
		default:
			return state;
	}
};
export default insurance;