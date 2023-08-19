const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: '*' }
});

const users =[];

const messages =[];



io.on('connection', (socket) => {
    console.log('A user connected');
    console.log(socket.id);

    // when request comes from client to server for register
    socket.on('register', (name) => {
        var userObj = {
            id:socket.id,
            name:name,
            type:'user',
        }
        users.push(userObj);
        console.log(users);
        var messageObj = {
            id:socket.id,
            message:`joined the chat`,
            type:'user',
            name:name,
        }
        messages.push(messageObj);
        io.emit('register', messages);
    });

    // when request comes from client to server for get all users messages
    socket.on('message', (message) => {
        var user = users.find(user => user.id === socket.id);
        var messageObj = {
            id:socket.id,
            message:message.message,
            type:'message',
            name:user?.name,
        }
        messages.push(messageObj);
        console.log(messages);
        io.emit('message', messages);
    });

    //when user get disconnected
    socket.on('disconnect', (socket) => {
        console.log('A user disconnected');
        console.log(socket.id);
        // var user = users.find(user => user.id === socket.id);
        // //also remove user from users array
        // users.splice(users.indexOf(user), 1);
        // var messageObj = {
        //     id:socket.id,
        //     message:`${user?.name} left the chat`,
        //     type:'user',
        //     name:user?.name,
        // }
        // messages.push(messageObj);
        // io.emit('disconnect', messages);
    });
});



const port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});