import {Composition, registerRoot} from 'remotion';
import {Reel} from './Reel';

const RemotionRoot = () => (
  <Composition id="Reel" component={Reel} durationInFrames={750} fps={30} width={1080} height={1920} defaultProps={{accent:'#EDAB18'}} />
);

registerRoot(RemotionRoot);
