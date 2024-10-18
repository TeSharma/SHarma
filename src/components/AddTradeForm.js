import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addActions } from '../actions/tradeActions.js';

const AddTradeForm = ({ addTrade }) => {
  const [trade, setTrade] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addTrade(trade);
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

export default connect(null, { addTrade })(AddTradeForm);