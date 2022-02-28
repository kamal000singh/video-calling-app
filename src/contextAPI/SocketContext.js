import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Peer from 'simple-peer';
const SocketContext = createContext();
const ENDPOINT = 'https://video-calling-server.herokuapp.com';
// const LOCAL_ENDPOINT = 'http://localhost:8080';
const socket = io(ENDPOINT);

const ContextProvider = ({ children }) => {
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream);
            myVideo.current.srcObject = stream;
        });
        socket.on('me', (id) => {
            setMe(id);
        });
        socket.on('calluser', ({ from, name: callName, signal }) => {
            setCall({ isReceivedCall: true, from, name: callName, signal })
        })
    }, []);
    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({ initiator: false, trickle: false, stream });
        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        })
        peer.on('stream', (stream) => {
            userVideo.current.srcObject = stream;
        });
        peer.signal(call.signal);
        connectionRef.current = peer;
    };
    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });
        peer.on('signal', (data) => {
            socket.emit('calluser', { userToCall: id, signalData: data, from: me, name });
        })
        peer.on('stream', (stream) => {
            userVideo.current.srcObject = stream;
        });
        socket.on('callaccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        })
        connectionRef.current = peer;
    };
    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    };
    const rejectCall = () => {
        setCallEnded(true);
        setCallAccepted(false);
        window.location.reload();
    }
    return (<SocketContext.Provider value={{
        call, callAccepted, myVideo, userVideo, stream,
        name, setName, callEnded, me, callUser, leaveCall, answerCall, rejectCall
    }}>
        {children}
    </SocketContext.Provider>)
}

export { ContextProvider, SocketContext };