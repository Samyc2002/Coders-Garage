import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

	const myVideo = useRef<any>();
	const userVideo = useRef<any>();
	const connectionRef = useRef<any>();
	const history = useHistory();

	useEffect(() => {
		if(history.location.pathname === '/interview') {
			navigator.mediaDevices.getUserMedia({ video: true, audio: true })
			.then((currentStream) => {
				setStream(currentStream);

				myVideo.current.srcObject = currentStream;
			});
			
			socket.emit('join', JSON.parse(localStorage.getItem('room') as string)?.RoomId, (message: any) => {
				console.log(message);
			});

			const isInterviewer = (JSON.parse(localStorage.getItem('room') as string)?.InterviewerEmail === JSON.parse(localStorage.getItem('profile') as string)?.formData.Email);
			const isInterviewee = (JSON.parse(localStorage.getItem('room') as string)?.IntervieweeEmail === JSON.parse(localStorage.getItem('profile') as string)?.formData.Email);

			if(isInterviewer) {

				const peer = new Peer({ initiator: true, trickle: false, stream });

				peer.on('signal', data => {
					socket.emit('interviewerJoined', data);
				});

				peer.on('stream', (currentStream) => {
					userVideo.current.srcObject = currentStream;
					userVideo.current.play();
				});

				socket.on('intervieweeJoined', data => {
					peer.signal(data);
				});

				connectionRef.current = peer;
			}

			if(isInterviewee) {

				const peer = new Peer({ initiator: false, trickle: false, stream });

				peer.on('signal', data => {
					socket.emit('intervieweeJoined', data);
				});

				peer.on('stream', (currentStream) => {
					userVideo.current.srcObject = currentStream;
					userVideo.current.play();
				});

				socket.on('interviewerJoined', data => {
					peer.signal(data);
				});

				connectionRef.current = peer;
			}
		}

		socket.on('callUser', ({ signal }) => {
			setCall({ isReceivingCall: true, signal });
		});
	}, []);

	const answerCall = () => {
		setCallAccepted(true);

		const peer = new Peer({ initiator: false, trickle: false, stream });

		peer.on('signal', (data) => {
			socket.emit('answerCall', { signal: data });
		});

		peer.on('stream', (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		peer.signal(call.signal);

		connectionRef.current = peer;
	};

	const callUser = () => {
		const peer = new Peer({ initiator: true, trickle: false, stream });

		peer.on('signal', (data) => {
			socket.emit('callUser', { signalData: data });
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
		<SocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, callUser, leaveCall, answerCall }}>
			{children}
		</SocketContext.Provider>
	);
};

export { ContextProvider, SocketContext };
