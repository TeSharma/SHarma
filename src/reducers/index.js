import {combineReducers} from '@reduxjs/toolkit';
import tradeReducer from './tradeReducer.js';

const rootReducer = combineReducers({
    trade:
    tradeReducer,
});

export default rootReducer;

