import React, { useState } from 'react';

import "./mint.css";

const HandleNFT = () => {
    const [receiver, setReceiver] = useState(null);
    const [status, setStatus] = useState(null);
  
    const mintNFT = async()=>{
        try{
            const account = receiver;
            //console.log(account);
            const res = await fetch(`http://localhost:3000/mint`,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({to:account})
            })
            const data = await res.json();
            //console.log(await res.json());
            if(res.status===200){
                setStatus(data.Result)
            }else{
                window.alert("NFT minting failed with this contract: 0x4dcAcF9AaaCc91988Fdc38708B761FA1b9066D42")
            }
        }catch(err){
            console.log(err);
        }
    }
  
  return (
      <>
      <div>
        <input
            className='inputField'
              type="text"
              placeholder="Account for minting NFT"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />
      </div>
      <div>
      <button onClick={mintNFT}>MintNFT</button>
      {status && <h1>{`Minting is Sucessful with the transaction hash \n${status}`}</h1>}
      </div>
      </>
    )
}

export default HandleNFT
