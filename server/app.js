const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (data) => {
    const message = data.toString();

    if (message.includes('<stream:stream')) {
      console.log('Stream tag received');
      socket.write('<?xml version="1.0"?>' +
                   '<stream:stream xmlns:stream="http://etherx.jabber.org/streams" version="1.0" xmlns="jabber:client">');
    } else if (message.includes('</stream:stream>')) {
      console.log('Stream end tag received');
      socket.write('</stream:stream>');
      socket.end();
    } else {
      console.log('Received message:', message);
      socket.write(`<message>Hi from server</message>`);
    }
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

server.on('error', (err) => {
  console.error('Error occurred:', err);
});

server.listen(5222, () => {
  console.log('Server listening on port 5222');
});




//#######################################################################################



// const net = require('net');

// const server = net.createServer((socket) => {
//   console.log('Client connected');
//   socket.write('<stream>');
//   socket.on('data', (data) => {
//     console.log('Received message:', data.toString());
//     socket.write('<message>Hi from server</message>');
//   });
//   socket.on('close', () => {
//     console.log('Client disconnected');
//   });
// });

// server.on('error', (err) => {
//   console.error('Error occurred:', err);
// });

// server.listen(5222, () => {
//   console.log('Server listening on port 5222');
// });


//#######################################################################################

// const net = require('net');


// const xmlParser = require('xml2json');


// const server = net.createServer(socket => {
//     console.log('Client connected.');


//     socket.on('data', data => {
//         console.log(data);
//         const xml = data.toString();
//         console.log(`Received: ${xml}`);
//         const parsedXml = xmlParser.toJson(xml);
//         const parseJson = JSON.parse(parsedXml);
//         console.log('parsedXml', parsedXml);
//         const to = parseJson.message.to;
//         console.log('to', to);
//         const from = parseJson.message.from;
//         const id = parseJson.message.id;
//         const body = parseJson.message.body;

//         const response = `<message to="${to}" from="${from}" type="chat" id="${id}">
//                          <body>${body}</body>
//                      </message>`;

//         socket.write(response);
//         console.log(`Sent: ${response}`);
//     });

//     socket.on('end', () => {
//         console.log('Client disconnected.');
//     });
// });

// server.on('error', error => {
//     console.error(`Error occurred: ${error}`);
// });

// server.listen(5222, () => {
//     console.log('Server started.');
// });