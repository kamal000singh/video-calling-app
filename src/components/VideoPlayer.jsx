import { Grid, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { SocketContext } from '../contextAPI/SocketContext'


const VideoPlayer = () => {
    const { name, callAccepted, callEnded, stream, call, myVideo, userVideo } = useContext(SocketContext);
    // const [audio, setAudio] = useState(true);
    return (
        <div className="container mt-4">
            <div className={`row justify-content-center `}>
                {stream && <div className={`col-12 col-md-6 p-2`}>
                    <Grid className='border rounded-3 bg-light' item xs={12} md={12}>
                        <Typography variant="h5" className="text-start px-2" gutterBottom >{name || 'Name'}</Typography>
                        <video style={{ width: '100%', height: '100%', padding: '5px' }} playsInline muted={true} ref={myVideo} autoPlay />
                        {/* <div><button onClick={() => setAudio(audio ? false : true)} className="btn btn-danger mb-2">{audio === true ? <i className="fa-solid fa-microphone-slash"></i> : <i className="fa-solid fa-microphone"></i>}</button></div> */}
                    </Grid>
                </div>}
                {callAccepted && !callEnded && <div className={`col-12 col-md-6 p-2`}>
                    <Grid className='border rounded-3 bg-light' item xs={12} md={12}>
                        <Typography variant="h5" className="text-start px-2" gutterBottom >{call.name || 'Name'}</Typography>
                        <video style={{ width: '100%', height: '100%', padding: '5px' }} playsInline muted={false} ref={userVideo} autoPlay />
                        {/* <div><button className="btn btn-danger mb-2" style={{ visibility: 'hidden' }}><i className="fa-solid fa-microphone-slash" /></button></div> */}
                    </Grid>
                </div>}

            </div>
        </div>
    )
}

export default VideoPlayer