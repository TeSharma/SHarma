
const initialState =[];

const tradeReducer = (state = initialState,
action) =>{

switch(action.type){case 'ADD_TRADE':
    return [...state,action.payload];
    default:return state;

 }
};
export default tradeReducer;


