import React from 'react';
import { connect } from 'react-redux';

const TradeComponent = ({ trades, isLoading }) => {
  return (
    <div>
      <h1>Trades:</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : trades.length === 0 ? (
        <p>No trades added.</p>
      ) : (
        <ul>
          {trades.map((trade, index) => (
            <li key={index}>{trade}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    trades: state.trade,
    isLoading: state.isLoadingTrades,
  };
};

export default connect(mapStateToProps)(TradeComponent);
