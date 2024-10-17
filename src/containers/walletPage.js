import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await axios.get('/api/wallet/balance');
      setBalance(response.data.balance);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/api/wallet/transactions');
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeposit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/wallet/deposit', { amount: depositAmount });
      fetchBalance();
      fetchTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleWithdrawal = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/wallet/withdrawal', { amount: withdrawalAmount });
      fetchBalance();
      fetchTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Wallet Page</h1>
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
        {transactions.map((transaction) => (
          <li key={}>
            {transaction.type} {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WalletPage;