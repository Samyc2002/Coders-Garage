import React, { useState, useRef, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

import { SocketContext } from '../Hooks/SocketContext';
import useLocalStorage from '../Hooks/useLocalStore';

const socket = io('https://coders-garage.herokuapp.com/');

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
	const [code, setCode] = useLocalStorage('code', '');

	const myVideo = useRef<HTMLMediaElement>(null!);
	const userVideo = useRef<HTMLMediaElement>(null!);
	const connectionRef = useRef<Peer.Instance>(null!);

	useEffect(() => {

		navigator.mediaDevices.getUserMedia({ video: true, audio: true })
		.then((currentStream) => {
			setStream(currentStream);
			
			if(myVideo.current) myVideo.current.srcObject = currentStream;
		});
		
		socket.on('me', (id, cb) => {
			setMe(id);
			cb();
		});

		socket.emit('join', JSON.parse(localStorage.getItem('room') as string)?.RoomId)

		socket.on('callEnded', () => {
			connectionRef.current?.destroy();
		})

		socket.on('callUser', ({ from, name: callerName, signal }) => {
			setCall({ isReceivingCall: true, from, name: callerName, signal });
		});
	}, []);

	const sendChange = useCallback((message: any) => {

		socket.emit('send-code', { code: message });
	}, [])

	useEffect(() => {
		socket.on('code', message => {
			console.log(message);
			setCode(message);
		});
	}, [sendChange, setCode])

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
		<SocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, callUser, leaveCall, answerCall, me, sendChange, code, setCode }}>
			{children}
		</SocketContext.Provider>
	);
};

export { ContextProvider, SocketContext };
