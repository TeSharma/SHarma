import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await axios.get('/api/wallet/balance');
      setBalance(response.data.balance);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/api/wallet/transactions');
      setTransactions(response.data.transactions);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeposit = async (event) => {
    event.preventDefault();
    if (depositAmount <= 0) {
      setError('Invalid deposit amount');
      return;
    }
    try {
      const response = await axios.post('/api/wallet/deposit', { amount: depositAmount });
      fetchBalance();
      fetchTransactions();
      setDepositAmount(0);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleWithdrawal = async (event) => {
    event.preventDefault();
    if (withdrawalAmount <= 0) {
      setError('Invalid withdrawal amount');
      return;
    }
    try {
      const response = await axios.post('/api/wallet/withdrawal', { amount: withdrawalAmount });
      fetchBalance();
      fetchTransactions();
      setWithdrawalAmount(0);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Wallet Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Balance: {balance}</p>
      <form onSubmit={handleDeposit}>
        <label>Deposit Amount:</label>
        <input type="number" value={depositAmount} onChange={(event) => setDepositAmount(event.target.value)} />
        <button type="submit">Deposit</button>
      </form>
      <form onSubmit={handleWithdrawal}>
        <label>Withdrawal Amount:</label>
        <input type="number" value={withdrawalAmount} onChange={(event) => setWithdrawalAmount(event.target.value)} />
        <button type="submit">Withdraw</button>
      </form>
      <h2>Transaction History:</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={(index)}>
            {transaction.type} {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WalletPage;