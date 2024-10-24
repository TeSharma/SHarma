import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState.js';

const tradeSlice = createSlice({
  name: 'trade',
  initialState,
  reducers: {
    addTrade(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addTrade } = tradeSlice.actions;
export default tradeSlice.reducer;
