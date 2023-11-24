import React from 'react';
import { useNavigate } from 'react-router-dom';

const Wallet = () => {
    const nevigateTo = useNavigate()
    const connectToMetamask = async()=>{
        try{
            if(window.ethereum){
                const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
                //console.log(accounts);
                nevigateTo("/home",{state:{address:accounts[0]}})
            }else{
                alert("Install Metamask")
            }
        }catch(err){
            console.log("Error message: ", err);
        }
    }
  return (
    <div>
     <h1>Welcome to my NFT gating App</h1>
      <button onClick={connectToMetamask}>Connect To Metamask</button>
    </div>
  )
}

export default Wallet
