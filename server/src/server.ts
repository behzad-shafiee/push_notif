const net = require( 'net' );
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

let database: any = {}
let index = 0
const server = net.createServer( ( socket: any ) =>
{
    console.log( 'Client connected' );
    socket.on( 'data', ( data: string ) =>
    {
        const message = data.toString();
        console.log( message );
        if ( message.includes( '<stream:stream' ) )
        {
            console.log( 'Stream tag received' );
            socket.write( '<?xml version="1.0"?>' +
                '<stream:stream xmlns:stream="http://etherx.jabber.org/streams" version="1.0" xmlns="jabber:client">' );
        } else if ( message.includes( '</stream:stream>' ) )
        {
            console.log( 'Stream end tag received' );
            socket.write( '</stream:stream>' );
            socket.end();
        } else
        {
            console.log( 'Received message:', message );
            socket.write( `<message>Hi from server</message>` );
        }

        if ( message.includes( '<iq' ) )
        {
            const xml: any = message.toString();
            const type = xml.match( /type='([^']*)'/ );
            const id = xml.match( /id='([^']*)'/ );
            const username = xml.match( /<username>([^<]+)<\/username>/ )
            const password = xml.match( /<password>([^<]+)<\/password>/ );

            if ( type[ 1 ] === 'set' && username[ 1 ] && password[ 1 ] )
            {
                let error;
                for ( const key in database )
                {
                    if ( database[ key ].username == username[ 1 ] )
                    {
                        console.log( 'Duplicate username' );
                        // send back an error response
                        error = `<iq type="error" id="${ id }">
                                  <error type="cancel">
                                    <feature-not-implemented xmlns="urn:ietf:params:xml:ns:xmpp-stanzas"/>
                                  </error>
                                </iq>`;
                        socket.write( error );
                    }
                }
                if ( !error )
                {
                    const jid = xml.iq.query[ 0 ].register[ 0 ].jid[ 0 ];
                    console.log( jid );


                    database[ 'user' + index ] = {
                        username: username[ 1 ],
                        password: password[ 1 ]
                    }
                    console.log( database );
                    index++
                    console.log( 'Registering user:', username[ 1 ] );
                    // TODO: add code to register the user
                    // send back a response
                    const response = `<iq type="result" id="${ id }"/>`;
                    socket.write( response );
                }

            } else
            {
                console.log( 'Invalid request' );
                // send back an error response
                const response = `<iq type="error" id="${ id }">
                              <error type="cancel">
                                <feature-not-implemented xmlns="urn:ietf:params:xml:ns:xmpp-stanzas"/>
                              </error>
                            </iq>`;
                socket.write( response );
            }
        }
    } )

    socket.on( 'close', () =>
    {
        console.log( 'Client disconnected' );
    } );
} );

server.on( 'error', ( err: string ) =>
{
    console.error( 'Error occurred:', err );
} );

server.listen( 5222, () =>
{
    console.log( 'Server listening on port 5222' );
} );




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