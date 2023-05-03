const net = require('net');

const client = new net.Socket();

// Connect to the XMPP server
client.connect(5222, '127.0.0.1', () => {
  console.log('Connected');

  // Send an XML message to the server
  const xml = `<message to="user2@example.com" type="chat">
                <body>Hello from client</body>
              </message>`;
  client.write(xml);
});

// Handle data received from the serve
client.on('data', (data) => {
  console.log(`Received: ${data}`);
});

// Handle errors
client.on('error', (err) => {
  console.error(`Error occurred: ${err}`);
});

// Close the connection when the server closes the connection
client.on('close', () => {
  console.log('Connection closed');
});