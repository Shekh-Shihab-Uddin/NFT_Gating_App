const axios = require('axios');

const headers = {
  'accept': 'application/json',
  'x-api-key': 'QN_49aedf1202244be2a38b464b576545b7'
};

const data = {
  name: 'NFT Transfer',
  expression:'KHR4X2xvZ3NfdG9waWMxID1+ICdmMDgxNWI4Y0NiNzA2MEVjNjc3MDQ3OWM5MjNDYTVGNDgxMGU3MzgwJykgJiYgDQoodHhfbG9nc19hZGRyZXNzID09ICcweDRkY0FjRjlBYWFDYzkxOTg4RmRjMzg3MDhCNzYxRkExYjkwNjZENDInKSAmJiANCih0eF9sb2dzX3RvcGljMCA9PSAnMHhkZGYyNTJhZDFiZTJjODliNjljMmIwNjhmYzM3OGRhYTk1MmJhN2YxNjNjNGExMTYyOGY1NWE0ZGY1MjNiM2VmJyk=',
  network: 'ethereum-sepolia',
  destinationIds: ['8442bbcf-528c-4577-9d97-174444d34a8f']
};

axios.post('https://api.quicknode.com/quickalerts/rest/v1/notifications', data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.log('error', error));


//destinaid: '85afbb5a-513f-4c95-96f5-cc100d451bd4' got after running the destination file

// (tx_logs_topic1 =~ 'f0815b8cCb7060Ec6770479c923Ca5F4810e7380') && 
// (tx_logs_address == '0x4dcAcF9AaaCc91988Fdc38708B761FA1b9066D42') && 
// (tx_logs_topic0 == '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef')

//https://www.4byte.directory/event-signatures/?sort=text_signature&page=46 see here by searchin the hash
//the 3rd line is the transaction hash that is generated from the event that is emmited in from the smart contract
//whenever there is a transaction is done