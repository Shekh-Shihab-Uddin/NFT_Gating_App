const axios = require('axios');

const headers = {
  'accept': 'application/json',
  'x-api-key': 'QN_49aedf1202244be2a38b464b576545b7'//api key from quicknode
};

const data = {
  name: 'My Destination',
  to_url: 'https://0e9e-103-230-106-51.ngrok-free.app/webhook',//url from ngrok
//these two things(header and data) will operate over the internet. internet doesnot know my localhost
//that is why we need an url that will define my localhost:3000 uniquely.
//this thing is done by the ngrok

//watch in the server.js there is a app.post('/webhook'()=>{})
//means in directly by this we are defining localhost:3000/webhook will be fired/triggered
//whenever from by the notification.js the transfer function's event emission is detected.
  webhook_type: 'POST',
  service: 'webhook',
  payload_type: 5
};



axios.post('https://api.quicknode.com/quickalerts/rest/v1/destinations', data, { headers })
  .then(response => console.log("Response Data",response.data))
  .catch(error => console.log('error', error));

//destinaid: '8442bbcf-528c-4577-9d97-174444d34a8f'