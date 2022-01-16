import { applyMiddleware, combineReducers, createStore } from 'redux';
import userReducer from './userReducer';

const localStorageMiddleware = store => next => action => {
	let result = next(action);
	localStorage.setItem('session', JSON.stringify(store.getState()));
	return result;
};

const store = createStore(
	combineReducers({
		user: userReducer,
	}),
	JSON.parse(localStorage.getItem('session')) || {},
	applyMiddleware(localStorageMiddleware)
);

export default store;
