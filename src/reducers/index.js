import {combineReducers} from 'redux';
import tradeReducer from './tradeReducer';

const rootReducer = combineReducers({
    trade:
    tradeReducer,
});

export default rootReducer;

