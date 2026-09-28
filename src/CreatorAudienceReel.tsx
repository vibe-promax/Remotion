import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

const BG = '#f5f5f2';
const INK = '#242424';
const SOFT = '#8f8d88';
const RED = '#e94b43';
const BLUE = '#4c86dc';
const LIME = '#d1e72f';
const WHITE = '#fbfbf8';

type SceneProps = {from:number; to:number; children:React.ReactNode};
const clamp = {extrapolateLeft:'clamp' as const, extrapolateRight:'clamp' as const};
const sceneOpacity = (f:number, from:number, to:number) => interpolate(f,[from,from+14,to-16,to],[0,1,1,0],clamp);
const inUp = (f:number, at:number, distance=34) => interpolate(f,[at,at+18],[distance,0],clamp);
const scaleIn = (f:number, at:number) => interpolate(f,[at,at+20],[0.96,1],clamp);

const Serif = ({children,size=96,color=INK,style={}}:any) => (
  <span style={{fontFamily:'Baskerville, Georgia, Times New Roman, serif',fontSize:size,lineHeight:.9,fontStyle:'italic',fontWeight:600,color,letterSpacing:-2.5,...style}}>{children}</span>
);
const Hand = ({children,size=82,color=INK,style={}}:any) => (
  <span style={{fontFamily:'Bradley Hand, Comic Sans MS, cursive',fontSize:size,lineHeight:.9,fontWeight:500,color,letterSpacing:-2,...style}}>{children}</span>
);
const Tiny = ({children,style={}}:any) => (
  <span style={{fontFamily:'Baskerville, Georgia, serif',fontSize:20,lineHeight:1.05,fontStyle:'italic',color:SOFT,letterSpacing:.2,...style}}>{children}</span>
);

const Angular = ({x,y,w=420,h=180,rotate=0,opacity=.42}:any) => (
  <div style={{position:'absolute',left:x,top:y,width:w,height:h,transform:`rotate(${rotate}deg)`,opacity,clipPath:'polygon(0 0,26% 0,50% 50%,74% 0,100% 0,65% 100%,35% 100%)',background:'linear-gradient(145deg,rgba(205,205,201,.28),rgba(215,215,211,.05))'}}/>
);

const Facet = ({x,y,size=170,rotate=0,color=INK,blur=0}:any) => (
  <div style={{position:'absolute',left:x,top:y,width:size,height:size,transform:`rotate(${rotate}deg)`,filter:`drop-shadow(0 22px 18px rgba(0,0,0,.18)) blur(${blur}px)`}}>
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      <polygon points="50,0 86,15 100,50 85,86 50,100 15,85 0,50 15,15" fill={color}/>
      <polygon points="50,0 86,15 50,50" fill="rgba(255,255,255,.22)"/>
      <polygon points="86,15 100,50 50,50" fill="rgba(255,255,255,.08)"/>
      <polygon points="50,50 100,50 85,86" fill="rgba(0,0,0,.12)"/>
      <polygon points="50,50 85,86 50,100" fill="rgba(0,0,0,.23)"/>
      <polygon points="50,50 15,85 0,50" fill="rgba(0,0,0,.09)"/>
    </svg>
  </div>
);

const PhotoCard = ({x,y,w=390,h=360,kind='creator',rotate=0,scale=1}:any) => {
  const styles:any = {
    creator:{bg:'linear-gradient(145deg,#d8dce0 0%,#9ea8ae 38%,#eef0ed 39%,#c3c8c7 100%)',accent:'#2c3a46'},
    product:{bg:'linear-gradient(145deg,#d7e8f5 0%,#83a8c4 42%,#17314c 43%,#9bbbd0 100%)',accent:'#e7f2fa'},
    service:{bg:'linear-gradient(145deg,#f1f1ed 0%,#d2d2ce 48%,#fafaf7 49%,#bfc1bd 100%)',accent:'#4d4d4a'},
    brand:{bg:'linear-gradient(145deg,#202020,#5a5a58 55%,#151515)',accent:'#fff'},
  }[kind];
  return <div style={{position:'absolute',left:x,top:y,width:w,height:h,borderRadius:34,overflow:'hidden',transform:`rotate(${rotate}deg) scale(${scale})`,background:styles.bg,boxShadow:'0 28px 48px rgba(0,0,0,.22)',border:'1px solid rgba(255,255,255,.7)'}}>
    <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 30% 20%,rgba(255,255,255,.55),transparent 32%),linear-gradient(160deg,transparent 50%,rgba(0,0,0,.16))'}}/>
    {kind==='creator' && <><div style={{position:'absolute',left:'18%',top:'18%',width:'36%',height:'48%',borderRadius:'48% 48% 42% 42%',background:'linear-gradient(145deg,#e4b79b,#8b5848)',boxShadow:'inset -18px -12px 22px rgba(0,0,0,.18)'}}/><div style={{position:'absolute',left:'13%',top:'14%',width:'47%',height:'22%',borderRadius:'50%',background:'#1e242a'}}/><div style={{position:'absolute',right:'12%',top:'28%',width:'34%',height:'34%',borderRadius:20,background:'rgba(245,247,246,.7)',transform:'rotate(-8deg)',boxShadow:'0 12px 18px rgba(0,0,0,.16)'}}/></>}
    {kind==='product' && <><div style={{position:'absolute',left:'8%',bottom:'18%',width:'84%',height:'34%',borderRadius:'45% 45% 12% 12%',background:'linear-gradient(180deg,#f5f9fb,#789bb4)',transform:'skewX(-8deg)'}}/><div style={{position:'absolute',left:'38%',bottom:'38%',width:'25%',height:'28%',borderRadius:'48% 48% 15% 15%',background:'linear-gradient(145deg,#e9eef0,#526f82)',transform:'rotate(-12deg)',boxShadow:'inset -10px -12px 14px rgba(0,0,0,.22)'}}/></>}
    {kind==='service' && <><div style={{position:'absolute',left:'15%',top:'20%',width:'70%',height:'54%',borderRadius:18,background:'rgba(255,255,255,.74)',boxShadow:'0 18px 25px rgba(0,0,0,.13)'}}/><div style={{position:'absolute',left:'25%',top:'31%',width:'48%',height:8,borderRadius:8,background:'#aaa'/><div style={{position:'absolute',left:'25%',top:'42%',width:'35%',height:7,borderRadius:7,background:'#c2c2be'}}/></div>}
    {kind==='brand' && <><div style={{position:'absolute',left:'15%',top:'19%',fontFamily:'Baskerville,Georgia,serif',fontStyle:'italic',fontSize:32,color:styles.accent}}>ATTENTION × TRUST</div><div style={{position:'absolute',left:'15%',bottom:'18%',width:'68%',height:2,background:'rgba(255,255,255,.45)'}}/></>}
    <div style={{position:'absolute',left:22,bottom:18,fontFamily:'Arial,sans-serif',fontSize:13,fontWeight:700,letterSpacing:2,color:styles.accent,opacity:.8}}>{kind.toUpperCase()} / VISUAL</div>
  </div>;
};

const Network = ({x=80,y=1030,scale=1}:any) => {
  const nodes=[[50,80],[190,30],[330,90],[100,230],[250,260],[390,190]];
  const edges=[[0,1],[1,2],[0,3],[3,4],[4,2],[2,5],[4,5]];
  return <div style={{position:'absolute',left:x,top:y,transform:`scale(${scale})`,transformOrigin:'top left',width:440,height:310}}>
    <svg width="440" height="310" style={{position:'absolute'}}>{edges.map(([a,b],i)=><line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#444" strokeOpacity=".23" strokeWidth="2"/>)}</svg>
    {nodes.map(([nx,ny],i)=><div key={i} style={{position:'absolute',left:nx-17,top:ny-17,width:34,height:34,borderRadius:'50%',background:i===1||i===4?RED:WHITE,border:`2px solid ${i===1||i===4?RED:'#4b4b49'}`,boxShadow:'0 8px 14px rgba(0,0,0,.12)'}}/>) }
  </div>;
};

const Scene = ({from,to,children}:SceneProps) => {const f=useCurrentFrame(); if(f<from-30||f>to+30)return null; return <AbsoluteFill style={{opacity:sceneOpacity(f,from,to)}}>{children}</AbsoluteFill>};

export const CreatorAudienceReel:React.FC = () => {
  const f=useCurrentFrame();
  return <AbsoluteFill style={{background:BG,color:INK,overflow:'hidden'}}>
    <Angular x={-95} y={170} rotate={-8}/><Angular x={560} y={360} rotate={14} w={520}/><Angular x={-120} y={1110} rotate={-12} w={520}/><Angular x={600} y={1370} rotate={10} w={480}/>

    <Scene from={0} to={65}>
      <Tiny style={{position:'absolute',left:74,top:270,letterSpacing:3}}>SIDAAS OO KALE</Tiny>
      <div style={{position:'absolute',left:74,top:320,transform:`translateY(${inUp(f,8)}px) scale(${scaleIn(f,8)})`}}><Serif size={126}>Creator</Serif></div>
      <div style={{position:'absolute',left:74,top:445,transform:`translateY(${inUp(f,16)}px) scale(${scaleIn(f,16)})`}}><Serif size={126} color={RED}>le</Serif> <Serif size={126}>audience</Serif></div>
      <div style={{position:'absolute',left:76,top:590}}><Tiny>ku kalsoon wuxuu haystaa wax aad u qiimo badan.</Tiny></div>
      <Facet x={785} y={95} size={155} rotate={18}/><Facet x={-72} y={1425} size={170} rotate={-15}/>
    </Scene>

    <Scene from={55} to={155}>
      <Tiny style={{position:'absolute',left:74,top:250,letterSpacing:3}}>THE REAL ASSET</Tiny>
      <div style={{position:'absolute',left:74,top:310}}><Serif size={124}>Attention</Serif><div style={{marginTop:-5}}><Serif size={82} color={RED}>+</Serif></div><div style={{marginTop:-8}}><Serif size={124}>Trust.</Serif></div></div>
      <Network x={560} y={650} scale={1.05}/>
      <Facet x={-75} y={1240} size={175} rotate={10}/><Facet x={770} y={1030} size={155} rotate={-18} color={RED}/>
      <div style={{position:'absolute',left:74,bottom:255,width:900,height:1,background:'rgba(40,40,40,.17)'}}/><Tiny style={{position:'absolute',left:74,bottom:220}}>AUDIENCE = ATTENTION × TRUST</Tiny>
    </Scene>

    <Scene from={145} to={285}>
      <Tiny style={{position:'absolute',left:74,top:250,letterSpacing:3}}>THE OLD PATH</Tiny>
      <div style={{position:'absolute',left:74,top:315}}><Serif size={100}>Shirkad cusub</Serif><div><Serif size={100}>waxay qaadan kartaa</Serif></div><div style={{marginTop:18}}><Serif size={128} color={RED}>sannado.</Serif></div></div>
      <div style={{position:'absolute',left:75,top:820,width:880,height:5,background:'rgba(40,40,40,.13)',overflow:'hidden'}}><div style={{height:'100%',width:`${interpolate(f,[150,260],[0,88],clamp)}%`,background:INK}}/></div>
      <div style={{position:'absolute',left:75,top:850,width:880,display:'flex',justifyContent:'space-between'}}><Tiny>AWARENESS</Tiny><Tiny>AUDIENCE</Tiny><Tiny>TRUST</Tiny></div>
      <PhotoCard x={630} y={1030} w={310} h={390} kind="creator" rotate={-5}/><Facet x={-65} y={1280} size={170} rotate={12} color={BLUE}/>
    </Scene>

    <Scene from={275} to={375}>
      <Tiny style={{position:'absolute',left:74,top:250,letterSpacing:3}}>THE CREATOR ALREADY HAS IT</Tiny>
      <div style={{position:'absolute',left:74,top:320}}><Serif size={126}>Hore ayuu</Serif><div><Serif size={132} color={BLUE}>u haystaa.</Serif></div></div>
      <PhotoCard x={600} y={930} w={330} h={400} kind="creator" rotate={-6}/><Facet x={790} y={95} size={130} rotate={28} color={LIME}/>
    </Scene>

    <Scene from={365} to={500}>
      <Tiny style={{position:'absolute',left:74,top:235,letterSpacing:3}}>WHAT IT CAN BECOME</Tiny>
      <div style={{position:'absolute',left:74,top:300}}><Serif size={108}>Product.</Serif><div><Serif size={108} color={RED}>Service.</Serif></div><div><Serif size={108}>Brand.</Serif></div></div>
      <PhotoCard x={590} y={925} w={350} h={420} kind="product" rotate={5}/>
      <PhotoCard x={-45} y={1180} w={260} h={320} kind="service" rotate={-7} scale={.82}/>
      <Facet x={-72} y={1430} size={150} rotate={-18} color={RED}/>
    </Scene>

    <Scene from={490} to={610}>
      <Tiny style={{position:'absolute',left:74,top:250,letterSpacing:3}}>THE BUSINESS VALUE</Tiny>
      <div style={{position:'absolute',left:74,top:315}}><Serif size={100}>Audience ma aha</Serif><div><Serif size={108} color={RED}>followers.</Serif></div><div style={{marginTop:28}}><Serif size={104}>Waa hanti.</Serif></div></div>
      <PhotoCard x={565} y={1020} w={380} h={310} kind="brand" rotate={-3}/>
      <Network x={35} y={1010} scale={.82}/><Facet x={800} y={100} size={150} rotate={20} color={BLUE}/>
    </Scene>

    <Scene from={600} to={705}>
      <Tiny style={{position:'absolute',left:74,top:250,letterSpacing:3}}>THE RIGHT USE</Tiny>
      <div style={{position:'absolute',left:74,top:315}}><Serif size={105}>Product.</Serif><div><Serif size={105} color={RED}>Service.</Serif></div><div><Serif size={105}>Brand.</Serif></div></div>
      <PhotoCard x={590} y={980} w={360} h={400} kind="product" rotate={5}/>
      <PhotoCard x={-30} y={1130} w={285} h={340} kind="service" rotate={-7} scale={.85}/>
      <Facet x={-70} y={1390} size={155} rotate={-16} color={RED}/>
    </Scene>

    <Scene from={695} to={810}>
      <Tiny style={{position:'absolute',left:74,top:245,letterSpacing:3}}>CREATOR ECONOMY</Tiny>
      <div style={{position:'absolute',left:74,top:315}}><Serif size={108}>Audience</Serif><div><Serif size={108} color={RED}>waa hanti.</Serif></div><div style={{marginTop:30,maxWidth:820}}><Tiny>Audience-ku ma aha oo keliya followers. Waa hanti business haddii si sax ah loo isticmaalo.</Tiny></div></div>
      <Facet x={805} y={100} size={145} rotate={16}/><Facet x={-72} y={1410} size={170} rotate={-14}/>
      <div style={{position:'absolute',right:80,bottom:125,width:92,height:92,borderRadius:'50%',background:LIME,boxShadow:'0 10px 20px rgba(0,0,0,.08)'}}/>
      <Tiny style={{position:'absolute',left:74,bottom:78,fontFamily:'Arial,sans-serif',fontStyle:'normal',fontSize:14}}>#InfluencerMarketing #ContentCreator</Tiny>
      <Tiny style={{position:'absolute',right:74,bottom:78,fontFamily:'Arial,sans-serif',fontStyle:'normal',fontSize:14}}>#DigitalMarketing #Entrepreneur</Tiny>
    </Scene>

    <div style={{position:'absolute',left:70,right:70,bottom:28,display:'flex',justifyContent:'space-between',opacity:.26,fontFamily:'Arial,sans-serif',fontSize:12,letterSpacing:1.5}}><span>ATTENTION × TRUST</span><span>{String(Math.floor(f/30)).padStart(2,'0')}s</span></div>
  </AbsoluteFill>;
};
