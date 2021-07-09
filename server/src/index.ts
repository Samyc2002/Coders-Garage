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

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})