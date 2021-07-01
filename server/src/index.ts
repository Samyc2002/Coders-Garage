import { Server, Socket } from "socket.io";
import { server } from './server';

const app = new server().app;
const PORT = process.env.PORT || 5000;

;

const io = new Server(app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}), {
    cors: {
        origin: '*',
        methods: [ 'GET', 'POST' ]
    }
});
io.on("connection", (socket: Socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    });

    socket.on("callUser", ({ userToCall, signalData, from, name }: any) => {
        io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });

    socket.on("answerCall", (data: any) => {
        io.to(data.to).emit("callAccepted", data.signal)
    });
});