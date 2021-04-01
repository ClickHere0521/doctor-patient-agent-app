import types from '../action/types';

const initialState = {
	name: null,
	age: null,
	gender: null,
	height: null,
	weight: null,
	tobaccoUsed: false,
	riskGroupCategorySelected: null,
	permanentResidence: false,
	loading: false,
	page: null
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case types.SUBMIT_PARTIAL_FORM:
			return { ...state, ...action.payload };
		case types.REQUEST_INITIATION:
			return { ...state, loading: true };
		case types.REQUEST_COMPLETED:
			return { ...state, loading: false };
		case types.RESET_USER_STATE:
			return initialState;
		default:
			return state;
	}
};
export default user;