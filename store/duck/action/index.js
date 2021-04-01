import types from './types';

const progressUpdate = (payload) => {
	return {
		type: types.PROGRESS_UPDATE,
		payload: payload
	};
};

const submitPartialForm = (data) => (dispatch) => {
    return {
		type: types.SUBMIT_PARTIAL_FORM,
		payload: payload
	};
};

const resetUserState = () => {
	return {
		type: types.RESET_USER_STATE
	};
};
export { progressUpdate, submitPartialForm, resetUserState };