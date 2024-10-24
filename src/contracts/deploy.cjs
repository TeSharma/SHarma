const ethers = require('ethers');
const fs = require('fs');
const {AlchemyProvider } = require("@alchemy-sdk/sdk");

const url = '(https://eth-mainnet.g.alchemy.com/v2/TCr2fabwY1yTD028PORV1EwNqC6LTs3S)';

const Provider = new AlchemyProvider(url);


const bytecode = fs.readFileSync('./output/MyContract.bin', 'utf8');
const abi = JSON.parse(fs.readFileSync('./output/MyContract.abi', 'utf8'));


const deployContract = async () => {
  try {
    const wallet = ethers.Wallet.fromMnemonic('hat cherry sad behave intact dismiss expose squeeze false side bulb confirm');
    wallet.connect(Provider);

    const gasPrice = await Provider.getGasPrice();
    console.log(`Gas Price: ${gasPrice}`);

    const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);
    const deployedContract = await contractFactory.deploy({
      gasPrice: gasPrice,
    });
  await deployedContract.deployed();
    console.log(`Contract deployed at: ${deployedContract.address}`);
  } catch (error) {
    console.error('Deployment error:', error);
  }
};

deployContract();
