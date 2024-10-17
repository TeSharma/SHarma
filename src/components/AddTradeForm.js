import React, { useState } from 'react';
import { connect } from 'react-redux';
import tradeActions from '../actions/tradeActions.js';

const AddTradeForm = ({ dispatch }) => {
  const [trade, setTrade] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTrade(trade));
    setTrade('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={trade}
        onChange={(e) => setTrade(e.target.value)}
        placeholder="Add trade"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default connect(null, null)(AddTradeForm);