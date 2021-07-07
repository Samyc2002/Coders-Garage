import { Server, Socket } from "socket.io";
import { server } from './server';

const app = new server().app;
const PORT = process.env.PORT || 5000;

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

    var room = '';

    socket.on('join', (id, cb) => {
        socket.join(id);
        room += id;
        cb(`Joined room ${room}`);

        socket.on('interviewerJoined', data => {
            console.log('interviewerJoined');
            socket.to(id).emit('interviewerJoined', data);
        });

        socket.on('intervieweeJoined', data => {
            console.log('intervieweeJoined');
            socket.to(id).emit('intervieweeJoined', data);
        });
    })

    socket.on("disconnect", () => {
        socket.to(room).emit("callEnded")
    });

    socket.on("callUser", ({ signalData }: any) => {
        io.to(room).emit("callUser", { signal: signalData });
    });

    socket.on("answerCall", (data: any) => {
        io.to(room).emit("callAccepted", data.signal)
    });
});