module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "1", 
      },
      mainnet: {
        provider: function() {
          return new Web3.providers.HttpProvider('(https://eth-mainnet.g.alchemy.com/v2/gBSmz4J2TWUmam9f8a94SmrcnfqfuCps)');
        },
        network_id: 1,
        gas: 50,
        gasPrice: 200000,
        from: '0xd3D7EDeb681EEb9E22131998813ef50B7C9EcEb7',
      },
      
    },
    compilers: {
      solc: {
        version: "^0.8.0",
      },
    },
    db: {
      enabled: false,
    },
    mocha: {
      reporter: "eth-gas-reporter",
      reporterOptions: {
        currency: "USD",
        gasPrice: 20,
      },
    },
  };
  