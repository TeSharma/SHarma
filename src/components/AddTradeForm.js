import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTrade } from '../actions/tradeActions.js';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


const AddTradeForm = () => {
  const dispatch = useDispatch();
  const [trade, setTrade] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (trade.trim() !== '') {
      setLoading(true);
      try {
        dispatch(addTrade(trade));
        setTrade('');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={trade} 
        onChange={(e) => {
          setTrade(e.target.value);
          setError(null);
        }} 
        placeholder="Add trade" 
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add'}
      </button>
      {success && <p>Trade added successfully!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default AddTradeForm;
