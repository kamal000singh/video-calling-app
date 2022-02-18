import { Grid, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { SocketContext } from '../contextAPI/SocketContext'


const VideoPlayer = () => {
    const { name, callAccepted, callEnded, stream, call, myVideo, userVideo } = useContext(SocketContext);

    return (
        <div className="mt-4">
            <div className={`row justify-content-center`}>
                {stream && <div className={`col col-md-5 m-1 bg-light border rounded-3`}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h5" className="text-start px-1" gutterBottom >{name || 'Name'}</Typography>
                        <video style={{ width: '100%', height: '100%' }} playsInline muted ref={myVideo} autoPlay />
                    </Grid>
                </div>}
                {callAccepted && !callEnded && <div className={`col col-md-5  m-1 bg-light border rounded-3`}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h5" className="text-start px-1" gutterBottom >{call.name || 'Name'}</Typography>
                        <video style={{ width: '100%', height: '100%' }} playsInline muted ref={userVideo} autoPlay />
                    </Grid>
                </div>}

            </div>
        </div>
    )
}

export default VideoPlayer