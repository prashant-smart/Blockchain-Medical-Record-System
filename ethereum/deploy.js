const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledRecord = require('./build/Record.json');

//Link to rinkeby network by using Infura and providing seed phrase of metamask wallet
const provider = new HDWalletProvider(
    'body twice snack anxiety barrel common spoon lumber when sword bulb giggle',
    'https://sepolia.infura.io/v3/1c1750cf0fec41f09aec9ee69e5c5594',
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    //Deploy contract to rinkeby network
    const result = await new web3.eth.Contract(JSON.parse(compiledRecord.interface))
        .deploy({ data: compiledRecord.bytecode })
        .send({ gas: '10000000', from: accounts[0] });

    //Display the address of the contract 
    console.log('Contract deployed to', result.options.address);

    //Always go to record.js after updating solidity code
};

// Fetch data from Aadhaar API (simplified example)
async function fetchAadhaarData(aadhaarId) {
    // Implement Aadhaar API integration here
    // Fetch and process Aadhaar data based on the provided ID
    const aadhaarData = await fetch('AADHAAR_API_URL');
    return aadhaarData;
}

// Store Aadhaar data on the blockchain
async function storeDataOnBlockchain(aadhaarData) {
    const accounts = await web3.eth.getAccounts();
    const userAccount = accounts[0];

    // Call the smart contract's addRecord function to store data
    await medicalRecordContract.methods.addRecord(aadhaarData).send({ from: userAccount });
}

// Example usage
(async () => {
    const aadhaarId = '123456789012'; // Replace with actual Aadhaar ID
    const aadhaarData = await fetchAadhaarData(aadhaarId);
    await storeDataOnBlockchain(aadhaarData);
    console.log('Aadhaar data stored on the blockchain.');
})();


deploy();