import { Button, Container, TextField, Typography } from '@material-ui/core';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext } from '../contextAPI/SocketContext';
import Notifications from './Notifications';

const Options = () => {
    const { me, callAccepted, callEnded, callUser, setName, leaveCall, name } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    return (
        <>
            <Container>
                <Notifications />
                <div className="my-3 border rounded-3 bg-light container justify-content-center" >
                    <form noValidate autoComplete='off'>
                        <div className="row" >
                            <div className='p-3 my-2 col-sm-12 col-md-6 text-start'>
                                <Typography gutterBottom variant='h6'>Generate unique ID <span className='fs-6 text-muted'>(Send this ID to your Friend)</span></Typography>
                                <TextField label='Name' fullWidth value={name} onChange={(e) => { setName(e.target.value) }} />
                                <CopyToClipboard text={me}>
                                    <Button className='my-2' variant='contained' color='primary' fullWidth startIcon={<Assignment fontSize='large' />}>Copy your ID </Button>
                                </CopyToClipboard>
                            </div>
                            <div className='p-3 my-2 col-sm-12 col-md-6 text-start'>
                                <Typography gutterBottom variant='h6'>Enter Friend ID to Make a Call</Typography>
                                <TextField label='ID to Call' fullWidth value={idToCall} onChange={(e) => { setIdToCall(e.target.value) }} />
                                {callAccepted && !callEnded ?
                                    <Button className='my-2' variant='contained' color='secondary' fullWidth startIcon={<PhoneDisabled fontSize='large' />} onClick={leaveCall} >Hang Up</Button>
                                    : <Button className='my-2' variant='contained' color='primary' fullWidth startIcon={<Phone fontSize='large' />} onClick={() => callUser(idToCall)} >Make a Call</Button>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </Container>

        </>
    )
}

export default Options