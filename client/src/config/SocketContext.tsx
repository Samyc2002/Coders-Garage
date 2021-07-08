import React, { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

import { SocketContext } from '../Hooks/SocketContext';

const socket = io('http://localhost:5000');

interface Child{
	children?: React.ReactNode;
}

const ContextProvider = ({ children }: Child) => {
	
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);
	const [stream, setStream] = useState<any>(null);
	const [name, setName] = useState('');
	const [call, setCall] = useState<any>({});
	const [me, setMe] = useState('');

	const myVideo = useRef<HTMLMediaElement>(null!);
	const userVideo = useRef<HTMLMediaElement>(null!);
	const connectionRef = useRef<Peer.Instance>(null!);

	useEffect(() => {

		navigator.mediaDevices.getUserMedia({ video: true, audio: true })
		.then((currentStream) => {
			setStream(currentStream);

			if(myVideo.current) myVideo.current.srcObject = currentStream;
		});
		
		socket.on('me', id => setMe(id));
	
		socket.emit('join', JSON.parse(localStorage.getItem('room') as string)?.RoomId, (message: any) => {
			console.log(message);
		});

		socket.on('disconnected', () => {
			connectionRef.current?.destroy();
		})

		socket.on('callUser', ({ signal }) => {
			setCall({ isReceivingCall: true, signal });
		});
	}, []);

	const connect = () => {

		navigator.mediaDevices.getUserMedia({ video: true, audio: true })
		.then((currentStream) => {
			setStream(currentStream);

			if(myVideo.current) myVideo.current.srcObject = currentStream;
		});

		// const isInterviewer = (JSON.parse(localStorage.getItem('room') as string)?.InterviewerEmail === JSON.parse(localStorage.getItem('profile') as string)?.formData.Email);
		// const isInterviewee = (JSON.parse(localStorage.getItem('room') as string)?.IntervieweeEmail === JSON.parse(localStorage.getItem('profile') as string)?.formData.Email);

		// if(isInterviewer) {

		// 	const peer = new Peer({ initiator: true, trickle: false, stream });

		// 	peer.on('signal', data => {
		// 		socket.emit('interviewerJoined', { signal: data });
		// 	});

		// 	peer.on('stream', (currentStream) => {
		// 		userVideo.current.srcObject = currentStream;
		// 	});

		// 	socket.on('intervieweeJoined', data => {
		// 		peer.signal(data);
		// 	});

		// 	connectionRef.current = peer;
		// }

		// if(isInterviewee) {

		// 	const peer = new Peer({ initiator: false, trickle: false, stream });

		// 	peer.on('signal', data => {
		// 		socket.emit('intervieweeJoined', { signal: data });
		// 	});

		// 	peer.on('stream', (currentStream) => {
		// 		userVideo.current.srcObject = currentStream;
		// 	});

		// 	socket.on('interviewerJoined', data => {
		// 		peer.signal(data);
		// 	});

		// 	connectionRef.current = peer;
		// }
	}

	const answerCall = () => {
		setCallAccepted(true);
	
		const peer = new Peer({ initiator: false, trickle: false, stream });
	
		peer.on('signal', (data) => {
		  socket.emit('answerCall', { signal: data, to: call.from });
		});
	
		peer.on('stream', (currentStream) => {
		  userVideo.current.srcObject = currentStream;
		});
	
		peer.signal(call.signal);
	
		connectionRef.current = peer;
	};

	const callUser = (id: any) => {
		const peer = new Peer({ initiator: true, trickle: false, stream });
	
		peer.on('signal', (data) => {
		  socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
		});
	
		peer.on('stream', (currentStream) => {
		  userVideo.current.srcObject = currentStream;
		});
	
		socket.on('callAccepted', (signal) => {
		  setCallAccepted(true);
	
		  peer.signal(signal);
		});
	
		connectionRef.current = peer;
	  };

	const leaveCall = () => {
		setCallEnded(true);

		connectionRef.current.destroy();

		window.location.reload();
	};

	return (
		<SocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, callUser, leaveCall, answerCall, connect }}>
			{children}
		</SocketContext.Provider>
	);
};

export { ContextProvider, SocketContext };
