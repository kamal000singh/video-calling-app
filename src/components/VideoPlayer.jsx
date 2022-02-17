import { Grid, Paper, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { SocketContext } from '../contextAPI/SocketContext'


const VideoPlayer = () => {
    const { name, callAccepted, callEnded, stream, call, myVideo, userVideo } = useContext(SocketContext);
    return (
        <>
            <Grid className="justify-content-center mt-3" spacing={2} container>
                {stream && <Paper>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom >{name || 'Name'}</Typography>
                        <video playsInline muted ref={myVideo} autoPlay style={{ width: '550px' }} />
                    </Grid>
                </Paper>}
                {callAccepted && !callEnded && <Paper>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom >{call.name || 'Name'}</Typography>
                        <video playsInline muted ref={userVideo} autoPlay style={{ width: '550px' }} />
                    </Grid>
                </Paper>}

            </Grid>
        </>
    )
}

export default VideoPlayer