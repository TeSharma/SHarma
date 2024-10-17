const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// API Endpoints

// Get wallet balance
app.get('/api/wallet/balance', (req, res) => {
  const balance = 100.00; // Temporary hardcoded balance
  res.json({ balance });
});

// Get transaction history
app.get('/api/wallet/transactions', (req, res) => {
  const transactions = [
    { id: 1, type: 'deposit', amount: 50.00, date: '2023-01-01T00:00:00.000Z' },
    { id: 2, type: 'withdrawal', amount: 20.00, date: '2023-01-02T00:00:00.000Z' },
  ]; // Temporary hardcoded transactions
  res.json({ transactions });
});

// Deposit funds
app.post('/api/wallet/deposit', (req, res) => {
  const { amount } = req.body;
  // Update balance in database (TO DO)
  res.json({ message: 'Deposit successful' });
});

// Withdraw funds
app.post('/api/wallet/withdrawal', (req, res) => {
  const { amount } = req.body;
  // Update balance in database (TO DO)
  res.json({ message: 'Withdrawal successful' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
