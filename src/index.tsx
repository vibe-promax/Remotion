import {Composition, registerRoot} from 'remotion';
import {Reel} from './Reel';
import {CreatorAudienceReel} from './CreatorAudienceReel';
import {Creator3DReel} from './Creator3DReel';

const RemotionRoot=()=> <>
  <Composition id='Reel' component={Reel} durationInFrames={750} fps={30} width={1080} height={1920} defaultProps={{accent:'#EDAB18'}}/>
  <Composition id='CreatorAudienceReel' component={CreatorAudienceReel} durationInFrames={810} fps={30} width={1080} height={1920}/>
  <Composition id='Creator3DReel' component={Creator3DReel} durationInFrames={600} fps={30} width={1080} height={1920}/>
</>;
registerRoot(RemotionRoot);