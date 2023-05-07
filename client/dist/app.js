"use strict";
const net = require('net');
// آدرس IP و پورت سرور XMPP
const host = 'localhost';
const port = 5222;
// اتصال به سرور XMPP
const client = net.createConnection({ host, port }, () => {
    console.log('Connected to server');
    // ارسال پیام XML مربوط به ایجاد ارتباط XMPP
    const xmlConnection = `<?xml version="1.0"?>
              <stream:stream xmlns:stream="http://etherx.jabber.org/streams" xmlns="jabber:client" to="localhost" version="1.0">`;
    client.write(xmlConnection);
    const xmlRegister = `<iq type='set' id='register'>
    <query xmlns='jabber:iq:register'>
      <username>Behzad</username>
      <password>123</password>
    </query>
  </iq>`;
    client.write(xmlRegister);
});
// دریافت داده‌ها از سرور XMPP
client.on('data', (data) => {
    console.log(`Received data: ${data}`);
    // اگر پاسخ به درخواست ایجاد ارتباط XMPP شامل تگ stream باشد، می‌توان ادامه ارتباط XMPP را ایجاد کرد
    if (data.includes('<stream:stream')) {
        console.log('XMPP connection established');
    }
});
// دریافت خطاها در اتصال به سرور XMPP
client.on('error', (err) => {
    console.error(`Error occurred: ${err}`);
});
// بستن اتصال با سرور XMPP
client.on('close', () => {
    console.log('Connection closed');
});
//###############################################################################
// const net = require('net');
// const client = new net.Socket();
// // Connect to the XMPP server
// client.connect(5222, '127.0.0.1', () => {
//   console.log('Connected');
//   // Send an XML message to the server
//   const xml = `<message to="user2@example.com" type="chat">
//                 <body>Hello from client</body>
//               </message>`;
//   client.write(xml);
// });
// // Handle data received from the serve
// client.on('data', (data) => {
//   console.log(`Received: ${data}`);
// });
// // Handle errors
// client.on('error', (err) => {
//   console.error(`Error occurred: ${err}`);
// });
// // Close the connection when the server closes the connection
// client.on('close', () => {
//   console.log('Connection closed');
// });
