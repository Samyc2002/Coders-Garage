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
	const [stream, setStream] = useState<any>();
	const [name, setName] = useState('');
	const [call, setCall] = useState<any>({});
	const [me, setMe] = useState('');

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
		}

		socket.on('me', (id) => setMe(id));

		socket.on('callUser', ({ from, name: callerName, signal }) => {
		setCall({ isReceivingCall: true, from, name: callerName, signal });
		});
	}, [history.location.pathname]);

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
		<SocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, me, callUser, leaveCall, answerCall }}>
			{children}
		</SocketContext.Provider>
	);
};

export { ContextProvider, SocketContext };
