import { createContext } from "react";

interface Context{
	call: any,
	callAccepted: boolean,
	myVideo: any,
	userVideo: any,
	stream: any,
	name: string,
	setName: React.Dispatch<React.SetStateAction<string>>,
	callEnded: boolean,
	me: string,
	callUser: (id: any) => void,
	leaveCall: () => void,
	answerCall: () => void
}

export const SocketContext = createContext<Context | null>(null);