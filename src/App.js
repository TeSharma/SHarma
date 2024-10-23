import React from 'react';
import TradeComponent from './components/Tradecomponent.js';
import AddTradeForm from './components/AddTradeForm.js';

function App() {
  return (
    <div className="app-container">
      <h1>Trade Application</h1>
      <AddTradeForm />
      <TradeComponent />
    </div>
  );
}

export default App;
