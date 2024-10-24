import Web3 from 'web3';

const getWeb3 = () => {
  if (window.ethereum) {
    return new Web3(window.ethereum);
  } 

  else {
    return new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  }
};

const web3 = getWeb3();

export default web3;