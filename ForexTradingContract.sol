solidity
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract ForexTradingContract {
    using SafeMath for uint256;

    
    mapping(address => mapping(string => uint256)) public traderBalances;


    mapping(uint256 => Trade) public openTrades;

   
    uint256 public tradeIdCounter = 1;


    event TradeOpened(uint256 tradeId, address trader, string currencyPair, uint256 entryPrice, uint256 amount, bool isBuy, uint256 leverage);
    event TradeClosed(uint256 tradeId, address trader, string currencyPair, uint256 exitPrice, uint256 profit);
    event TradeCancelled(uint256 tradeId, address trader, string currencyPair);
    event BalanceUpdated(address trader, string currencyPair, uint256 balance);

    
    struct Trade {
        address trader;
        string currencyPair;
        uint256 entryPrice;
        uint256 amount;
        bool isBuy;
        uint256 leverage;
    }

   
    function openTrade(string memory currencyPair, uint256 amount, bool isBuy, uint256 leverage) public {
        require(amount > 0, "Invalid amount");
        require(leverage > 0, "Invalid leverage");
        require(traderBalances[msg.sender][currencyPair] >= amount, "Insufficient balance");

        Trade memory trade;
        trade.trader = msg.sender;
        trade.currencyPair = currencyPair;
        trade.entryPrice = getEntryPrice(currencyPair);
        trade.amount = amount;
        trade.isBuy = isBuy;
        trade.leverage = leverage;

        openTrades[tradeIdCounter] = trade;
        tradeIdCounter++;

        emit TradeOpened(tradeIdCounter - 1, msg.sender, currencyPair, trade.entryPrice, trade.amount, trade.isBuy, trade.leverage);
    }

    
    function closeTrade(uint256 tradeId) public {
        require(tradeId > 0 && tradeId < tradeIdCounter, "Invalid trade ID");
        require(openTrades[tradeId].trader == msg.sender, "Trade does not exist or belongs to another trader");

        Trade memory trade = openTrades[tradeId];
        uint256 profit = calculateProfit(trade);
        traderBalances[msg.sender][trade.currencyPair] = traderBalances[msg.sender][trade.currencyPair].add(profit);
        delete openTrades[tradeId];

        emit TradeClosed(tradeId, msg.sender, trade.currencyPair, getExitPrice(trade.currencyPair), profit);
        emit BalanceUpdated(msg.sender, trade.currencyPair, traderBalances[msg.sender][trade.currencyPair]);
    }

    
    function cancelTrade(uint256 tradeId) public {
        require(tradeId > 0 && tradeId < tradeIdCounter, "Invalid trade ID");
        require(openTrades[tradeId].trader == msg.sender, "Trade does not exist or belongs to another trader");

        delete openTrades[tradeId];
        emit TradeCancelled(tradeId, msg.sender, openTrades[tradeId].currencyPair);
    }

    
    function getEntryPrice(string memory currencyPair) internal returns (uint256) {
        AggregatorV3Interface priceFeed;
        if (keccak256(bytes(currencyPair)) == keccak256("USD/EUR")) {
            priceFeed = AggregatorV3Interface(0x...); // Replace with actual contract address
        } else if (keccak256(bytes(currencyPair)) == keccak256("USD/GBP")) {
            priceFeed = AggregatorV3Interface(0x...); // Replace with actual contract address
        }
        (
            ,
            /*uint80 roundID*/ ,
            int256 answer,
            ,
            ,
        
        ) = priceFeed.latestRoundData();
        return uint256(answer * 10**10);
    }

   
    function getExitPrice(string memory currencyPair) internal returns (uint256) {
        return getEntryPrice(currencyPair);
    }

    
    function calculateProfit(Trade memory trade) internal returns (uint256) {
        if (trade.isBuy) {
            return trade.amount * trade.leverage * (getExitPrice(trade.currencyPair) - trade.entryPrice);
        } else {
            return trade.amount * trade.leverage * (trade.entryPrice - getExitPrice(trade.currencyPair));
        }
    }
}