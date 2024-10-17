import React from 'react';
import TradeComponent from './components/Tradecomponent';

import AddTradeForm from './components/AddTradeForm';
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


function App() {
  return (
    <div>
      <AddTradeForm />
      <TradeComponent />
    </div>
  );
}

export default App;
