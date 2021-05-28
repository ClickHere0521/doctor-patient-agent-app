import types from '../action/types';

const initialState = {
	language: "en-US",
};

const language = (state = initialState, action) => {
	switch (action.type) {
		case types.SET_LAN:
			return { ...state, language:action.payload };
        default:
            return state;
	}
};
export default language;