import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
const alchemyUrl = process.env.ALCHEMY_API_KEY;

app.use(express.json());

app.get('/api/wallet/balance', (req, res) => {
  const balance = 100.00;
  res.json({ balance });
});

app.get('/api/wallet/transactions', (req, res) => {
  const transactions = [
    { id: 1, type: 'deposit', amount: 50.00, date: '2023-01-01T00:00:00.000Z' },
    { id: 2, type: 'withdrawal', amount: 20.00, date: '2023-01-02T00:00:00.000Z' },
  ];
  res.json({ transactions });
});

app.post('/api/wallet/deposit', (req, res) => {
  const { amount } = req.body;
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  res.json({ message: 'Deposit successful' });
});

app.post('/api/wallet/withdrawal', (req, res) => {
  const { amount } = req.body;
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  res.json({ message: 'Withdrawal successful' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});