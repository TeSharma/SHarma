import {combineReducers} from 'redux';
import tradeReducer from './tradeReducer.js';

const rootReducer = combineReducers({
    trade:
    tradeReducer,
});

export default rootReducer;

