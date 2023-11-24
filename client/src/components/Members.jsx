import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const Members = () => {
  const[socket, setSocket] = useState(null);
  const nevigateTo = useNavigate();

  useEffect(()=>{
    const socketInstance = io('http://localhost:3000');//simply just connecting with my server
    setSocket(socketInstance)
    return()=>{
      socketInstance.disconnect()
    }
  },[])

  useEffect(()=>{
    if(socket){
      socket.on('nftsUpdated',(data)=>{
        if(data.userNFTs<1){
          console.log("in members page:",data.userNFTs)
          nevigateTo('/home');
          alert("You have been logged out due to insufficient balance..!!")
        }
      })
    }
  },[socket])

  return (
    <>
    <div>
      <h1>Hey you are the elligible Member to see this message</h1>
      <p>"You Are Beautiful & You Are Doing Great"</p>
    </div>
    </>
  )
}

export default Members
