import { addTrade } from './tradeActions';

const trade = {
  id: 1,
  symbol: 'AAPL',
  quantity: 10,
};

dispatch(addTrade(trade));