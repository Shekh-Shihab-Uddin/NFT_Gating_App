import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./mint.css";

const Home = () => {
    const location = useLocation();
    const nevigateTo = useNavigate();
    const revealMessage = async()=>{
        try{
            const account = location.state.address;
            //console.log(account);
            const res = await fetch(`http://localhost:3000/members`,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({from:account})
            })
            const data = await res.json();
            //nevigateTo("/members")

            console.log(data);
            if(data.status==200){
                nevigateTo("/members")
            }else{
                window.alert("You don't have any NFT with this contract: 0xeEDBC7c07eCBae6761d235F8Be50E03a074dFd20")
            }
        }catch(err){
            console.log(err);
        }
    }

const goToMint = async ()=>{
    nevigateTo('/handlenft')
}
  return (
    <>
        <div>
        <button onClick={revealMessage}>Reveal Message</button>
        </div>
        <div>
        <button onClick={goToMint} >Mint or Transfer NFT</button>
        </div>
    </>
  )
}

export default Home
