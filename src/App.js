import { Typography, AppBar } from '@material-ui/core'
import Notifications from './components/Notifications';
import Options from './components/Options';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <div className='text-center'>
      <AppBar position='static' color='inherit'>
        <Typography variant='h2' align='center'>Video Calling App</Typography>
      </AppBar>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
}

export default App;
