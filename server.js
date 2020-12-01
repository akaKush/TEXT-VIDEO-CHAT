const express = require('express');
const app = express(); //creates the express app
const http = require('http').Server(app); //app is an http server
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000; //tria un altre port si 3000 no està disponible

http.listen(PORT, () => {
    console.log("listening on port " + PORT);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log("client is connected " + socket.id )
    
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    });

})