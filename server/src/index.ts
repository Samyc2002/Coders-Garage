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
	socket.emit("me", socket.id, () => console.log('recieved'));

	let roomId = '';

	socket.on('join', room => {
		socket.join(room);

		roomId = room;
	})

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
	
	socket.on('send-code', data => {
		io.to(roomId).emit('code', data.code)
	});
});

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})