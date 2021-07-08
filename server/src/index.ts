import { Server, Socket } from "socket.io";
import { createServer } from "http";

import { server } from './server';

const app = new server().app;
const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: [ 'GET', 'POST' ]
    }
});
io.on("connection", (socket: Socket) => {
    socket.emit("me", socket.id);

    var room = '';

    socket.on('join', (id, cb) => {
        socket.join(id);
        room += id;
        cb(`Joined room ${room}`);
    });

    socket.on('interviewerJoined', data => {
        console.log('interviewerJoined');
        socket.to(data.to).emit('interviewerJoined', data.signal);
    });

    socket.on('intervieweeJoined', data => {
        console.log('intervieweeJoined');
        socket.to(data.to).emit('intervieweeJoined', data.signal);
    });

    socket.on("disconnect", () => {
        socket.to(room).emit("disconnected");
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.emit("callUser", { signal: signalData, from, name });
	});

    socket.on("answerCall", (data) => {
		io.emit("callAccepted", data.signal)
	});
});

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})