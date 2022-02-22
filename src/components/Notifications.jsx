import React, { useContext } from 'react'
import { Button } from '@material-ui/core';
import { AddIcCall, Close } from '@material-ui/icons';
import { SocketContext } from '../contextAPI/SocketContext';
import ring from '../audio/ring.mp3';

const Notifications = () => {
  const { answerCall, call, callAccepted, rejectCall } = useContext(SocketContext);
  let ringtone = new Audio(ring);
  let setRing;
  if (call.isReceivedCall && !callAccepted) {
    setRing = setInterval(() => {
      ringtone.play();
    }, 1500);
  }
  const handleCall = async () => {
    await clearInterval(setRing);
    await answerCall();
  }
  return (
    <>
      {call.isReceivedCall && !callAccepted &&
        (<div className="callReceive text-light border rounded-3">
          <h3>{call.name} is calling...</h3>
          <div className="">
            <Button variant="contained" className="m-2" color="primary" onClick={handleCall} startIcon={<AddIcCall />} >Accept</Button><Button variant='contained' color='secondary' className="m-2" startIcon={<Close />} onClick={rejectCall} >Reject</Button>
          </div>

        </div>)
      }
    </>
  )
}
export default Notifications;
