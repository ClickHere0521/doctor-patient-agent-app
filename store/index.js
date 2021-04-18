
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import reducers from './duck/index';
import ExpoFileSystemStorage from "redux-persist-expo-filesystem"

export function configureStore (initialState = {}) {
	const persistConfig = {
		key: "root",
		storage: ExpoFileSystemStorage
	  };
 
	const persistedReducer = persistReducer(persistConfig, reducers);
	
	let middleware = [];
	const logger = createLogger({ collapsed: true });

	middleware = [ thunk, logger ];
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const store = createStore(persistedReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
	// const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middleware)));
	const persistor  = persistStore(store);
	return { store, persistor };
	// return store;
}
