import { Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext } from '../contextAPI/SocketContext'

const Options = ({ children }) => {
    const { me, callAccepted, callEnded, callUser, setName, leaveCall, name } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    return (
        <>
            <Container>
                <Paper className="my-3 justify-content-center" elevation={10} >
                    <form noValidate autoComplete='off'>
                        <Grid container >
                            <Grid className='p-2' item spacing={2} xs={12} md={6}>
                                <Typography gutterBottom variant='h6'>Account Information</Typography>
                                <TextField label='Name' fullWidth value={name} onChange={(e) => { setName(e.target.value) }} />
                                <CopyToClipboard text={me}>
                                    <Button className='my-2' variant='contained' color='primary' fullWidth startIcon={<Assignment fontSize='large' />}>Copy your ID </Button>
                                </CopyToClipboard>
                            </Grid>
                            <Grid className='p-2' item spacing={2} xs={12} md={6}>
                                <Typography gutterBottom variant='h6'>Make a Call</Typography>
                                <TextField label='ID to Call' fullWidth value={idToCall} onChange={(e) => { setIdToCall(e.target.value) }} />
                                {callAccepted && !callEnded ?
                                    <Button className='my-2' variant='contained' color='secondary' fullWidth startIcon={<PhoneDisabled fontSize='large' />} onClick={leaveCall} >Hang Up</Button>
                                    : <Button className='my-2' variant='contained' color='primary' fullWidth startIcon={<Phone fontSize='large' />} onClick={() => callUser(idToCall)} >Make a Call</Button>
                                }
                            </Grid>
                        </Grid>
                    </form>
                    {children}
                </Paper>
            </Container>
        </>
    )
}

export default Options