import types from '../action/types';

const initialState = {
	progress: 'Page1'
};

const form = (state = initialState, action) => {
	switch (action.type) {
		case types.PROGRESS_UPDATE:
			return { ...state, progress: action.payload };
		default:
			return state;
	}
};
export default form;