const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        method: ['GET', 'POST']
    }
})
const port = process.env.PORT || 8080;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Running server');
});

io.on('connection', (socket) => {
    console.log('connection established')
    socket.emit('me', socket.id);
    socket.on('disconnect', () => {
        socket.broadcast.emit('callended');
    });
    socket.on('calluser', ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit('calluser', { signal: signalData, from, name })
    });
    socket.on('answerCall', (data) => {
        io.to(data.to).emit('callaccepted', data.signal);
    })
})

server.listen(port, () => { console.log(`listening port on ${port}`); })