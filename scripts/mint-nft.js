require("dotenv").config();
const {Web3} = require('web3');


// Replace 'YOUR_INFURA_API_KEY' with your actual Infura API key and the network you want to connect to (e.g., 'mainnet', 'ropsten', etc.)
const API_URL = process.env.API_URL;

// Create a new Web3 instance with the Infura provider
const web3 = new Web3(API_URL);

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const contract = require ("../artifacts/contracts/MyNFT.sol/MyNFT.json");

//console.log(JSON.stringify(contract.abi));

const contractAddress = "0xeEDBC7c07eCBae6761d235F8Be50E03a074dFd20";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);


//creating our transaction:

async function mintNFT(tokenURI){

    //generating a nonce
    const _nonce = await web3.eth.getBlockTransactionCount(PUBLIC_KEY,"latest");

    //creating the transaction object
    const tnx={
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: _nonce,
        gas: 500000,
        gasPrice: await web3.eth.getGasPrice(),
        data: nftContract.methods.awardItem(PUBLIC_KEY, tokenURI).encodeABI(),
    };

    //code to sign the transaction
    const signPromise = web3.eth.accounts.signTransaction(tnx,PRIVATE_KEY);
    signPromise
        .then((signedTx)=>{
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function(err,hash){
                    if(!err){
                        console.log(
                            "The hash of the transaction is:",
                            hash,
                            "\nCheck Infura's Mempool to view the status of your transaction"
                        )
                    }else{
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        )
                    }
                }
            )
        })
        .catch((err)=>{
            console.log("Promise failed:", err)
        })
}

mintNFT(
    "https://ipfs.io/ipfs/QmZPSWjGkfEGzPbyTmyMt1tujyiGoxTo532H9kpj9z5NBD?filename=nft-metadata.json"
    //link of the meta-data.json file
);


//Image hash: QmZui4PuXhQhZogXEn5ighqeJuQ7SSyeGDTPKj6rj6YyWt
//metadata File Hash: QmZPSWjGkfEGzPbyTmyMt1tujyiGoxTo532H9kpj9z5NBD
//link: https://ipfs.io/ipfs/QmZPSWjGkfEGzPbyTmyMt1tujyiGoxTo532H9kpj9z5NBD?filename=nft-metadata.json