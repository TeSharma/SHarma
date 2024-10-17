import React from 'react';
import { connect } from 'react-redux';


const TradeComponent = ({ trades }) => {//component code};{
  return (
    <div>
      <h1>Trades:</h1>
      <ul>
        {trades.map((trade, index) => (
          <li key={index}>{trade}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { trades: state.trade };
};

export default connect(mapStateToProps)(TradeComponent);

