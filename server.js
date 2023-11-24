// const socketIO = require('socket.io')
const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors());
// app.use(
//     cors({
//         credential: true,
//         origin: "http://localhost:5173"
//     })
// )


require("dotenv").config();
const {Web3} = require('web3');

const API_URL = process.env.API_URL;
const web3 = new Web3(API_URL);
const tokenURI = "https://ipfs.io/ipfs/QmWNJXvdFGjCjY1NuMDbBpnSrgKWZDyxaKED8ZCMNAqnPK?filename=nft-metadata2.json"
const contractAddress = "0x4dcAcF9AaaCc91988Fdc38708B761FA1b9066D42"
const contract = require ("../NFT_gating_project-2/artifacts/contracts/MyNFT.sol/MyNFT.json");
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
// console.log(contract)

const fetchNFTs = async(account)=>{
    try{
       const nftBalance = await nftContract.methods.balanceOf(account).call();
       console.log("Fetch nft called. now nft balance: ",Number(nftBalance));
       return {userNFTs:Number(nftBalance)}
    }catch(error){
       console.log('Error fetching NFTs',error);
    }
}


async function mintNFT(account,tokenURI){
    const _nonce= await web3.eth.getTransactionCount(account, "latest")
        const tx = {
          from: account,
          to: contractAddress,
          nonce: _nonce,
          gas: 800000,
          gasPrice: await web3.eth.getGasPrice(),
          data: nftContract.methods.awardItem(account, tokenURI).encodeABI(),
        };
        //console.log(tx)
        const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
        await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        return signedTx.transactionHash
        
}

app.post('/members',async(req,res)=>{
    try{
       const account = req.body.from;
    //    console.log(account)
       const numNFTs = await fetchNFTs(account)
    // console.log(numNFTs);

       if(numNFTs.userNFTs>0){
         res.status(200).json({status:200,numNFTs})
       }else{
         res.status(404).json({status:404,message:"You don't own any nft",numNFTs});
       }
    }catch(error){
        res.status(500).json({status:500,message:"Internal Server Error"});
    }
})

app.post('/mint', async (req,res)=>{
    try{
        const account = req.body.to;
        //console.log(account);
        const mint = await mintNFT(account, "https://ipfs.io/ipfs/QmZPSWjGkfEGzPbyTmyMt1tujyiGoxTo532H9kpj9z5NBD?filename=nft-metadata.json")
        //console.log(mint);
        if(mint){
            res.status(200).json({Result:mint})
        }else{
            res.status(400).json({status: 400, message: "No tokens transfered"});
        }
    }catch(err){
        res.status(500).json({message:"Internal Server Error"});    
    }
})


app.post('/webhook', async(req,res)=>{
    //console.log("Hi there");
    try{
        const account = req.body[0].from;
        //after parsing the request body we can see in which form we are getting data
        //from there we can see that writing in this from we can get the account that we are supervising
        //console.log(account);
        console.log("Webhook called")
        const numOfNFT = await fetchNFTs(account);
        console.log("in webhook api",numOfNFT);
        io.emit('nftsUpdated',{userNFTs:numOfNFT.userNFTs});
        res.status(200).json({status:200, message:"Webhook Triggered"})
    }catch(err){
        console.log(err);
    }
})

const PORT = 3000;
const server= app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`)
})

// const io = socketIO(server);

const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

 io.on('connection',()=>{
    console.log("Socket connected");
})
  