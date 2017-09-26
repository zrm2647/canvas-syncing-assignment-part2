const http = require('http');
const fs = require('fs');
const socketio = require('socket.io');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// read the client html file into memory
// __dirname in the node is the current directoy
// in this case the same folder as the server js file
const index = fs.readFileSync(`${__dirname}/../client/index.html`);

const onRequest = (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(index);
    response.end();
};

const app = http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

// pass in the http server into socketio and grab the websocket server as io
const io = socketio(app);

let newSqu = {};

const sendSquare = (sock) => {
    const socket = sock;
    
    const rX = Math.floor((Math.random() * 200) + 1);
    const rY = Math.floor((Math.random() * 200) + 1);
    
    let newSqu = {
        sX: rX,
        sY: rY,
    };
    
    io.emit('update', newSqu);
};

io.sockets.on('connection', (socket) => {
    console.log('started');
    
    sendSquare(socket);
});

console.log('Websocket server started');