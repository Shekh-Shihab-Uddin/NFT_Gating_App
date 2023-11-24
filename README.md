Steps:
1. run the server.js(comand: node server)
2. run ngrok cli and get the link created by the ngrok(comand: ngrok http <server_port_no>)
3. paste the link in the destination.js (node destination)
4. then get the generated destinationID from the console and paste it in the notification.js
5. run the notification.js(comand: node notification)
6. it will create the api for calling the webhook in the quickode
7. then run the client app. (comand: cd client -> npm run dev)
8. then visualize the operations here for example example: nft gating or nft minting
