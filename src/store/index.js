import { applyMiddleware, combineReducers, createStore } from 'redux';
// import userReducer from './userReducer';

const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.user;
        case 'LOGOUT':
            return null;
        default:
            return state;
    }
};

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
