// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // For handling async actions
import ebikeReducer from '../actions/ebikeReducer';

const rootReducer = combineReducers({
  ebike: ebikeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk)); // Apply thunk middleware

export default store;
