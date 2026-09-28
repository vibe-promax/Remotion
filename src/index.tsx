import {Composition, registerRoot} from 'remotion';
import {Reel} from './Reel';
import {CreatorAudienceReel} from './CreatorAudienceReel';

const RemotionRoot=()=> <><Composition id='Reel' component={Reel} durationInFrames={750} fps={30} width={1080} height={1920} defaultProps={{accent:'#EDAB18'}}/><Composition id='CreatorAudienceReel' component={CreatorAudienceReel} durationInFrames={750} fps={30} width={1080} height={1920}/></>;
registerRoot(RemotionRoot);