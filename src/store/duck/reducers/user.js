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
	role: '',
	page: null,

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
		case types.AGENT_ROLE:
			return { ...state, role: 'agent' };
		case types.PATIENT_ROLE:
			return { ...state, role: 'patient' };
		case types.DOCTOR_ROLE:
			return { ...state, role: 'doctor' };
		default:
			return state;
	}
};
export default user;