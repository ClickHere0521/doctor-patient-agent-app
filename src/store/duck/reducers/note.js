import types from '../action/types';

const initialState = {
	noteInfo: []
};

const note = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_NOTE_INFO:
			return {
				...state,
				noteInfo: action.payload.noteInfo,
			};
		default:
			return state;
	}
};
export default note;