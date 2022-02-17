import { Button } from '@material-ui/core';
import { AddIcCall, Close } from '@material-ui/icons';
import React, { useContext } from 'react'
import { SocketContext } from '../contextAPI/SocketContext';

const Notifications = () => {
    const { answerCall, call, callAccepted, leaveCall } = useContext(SocketContext);
    return (
        <>
            {call.isReceivedCall && !callAccepted && (<div className="d-flex justify-content-center p-2">
                <h3>{call.name} is calling...</h3>
                <Button variant="contained" color="primary" onClick={answerCall} startIcon={<AddIcCall />} >Accept</Button><Button variant='contained' color='secondary' startIcon={<Close />} onClick={leaveCall} >Reject</Button>
            </div>)}
        </>
    )
}

export default Notifications