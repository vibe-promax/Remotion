import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const BG = '#060C1C';
const GOLD = '#EDAB18';
const WHITE = '#F7F7F2';

const Grid = () => (
  <AbsoluteFill style={{
    opacity: 0.12,
    backgroundImage:
      'linear-gradient(rgba(247,247,242,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(247,247,242,.12) 1px, transparent 1px)',
    backgroundSize: '54px 54px',
    maskImage: 'linear-gradient(to bottom, black, transparent 78%)',
  }} />
);

const Noise = () => (
  <AbsoluteFill style={{opacity: .10, mixBlendMode: 'screen', pointerEvents: 'none'}}>
    <svg width="100%" height="100%">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" opacity=".32" />
    </svg>
  </AbsoluteFill>
);

const Scanlines = () => (
  <AbsoluteFill style={{
    opacity: .055,
    backgroundImage: 'repeating-linear-gradient(0deg, transparent 0, transparent 5px, #fff 6px)',
    pointerEvents: 'none',
  }} />
);

const Header = ({label}:{label:string}) => (
  <div style={{
    position:'absolute', left:64, right:64, top:58, display:'flex',
    justifyContent:'space-between', alignItems:'center', zIndex:10,
    fontFamily:'Roboto, Arial, sans-serif', fontSize:18, fontWeight:700, letterSpacing:3,
  }}>
    <span style={{color:GOLD}}>SAAFI SMART</span>
    <span style={{opacity:.42}}>{label}</span>
  </div>
);

const BarChart = ({p}:{p:number}) => {
  const values = [28, 43, 57, 74, 91];
  return (
    <div style={{position:'absolute', left:78, right:78, top:410, height:560}}>
      <div style={{position:'absolute', left:0, right:0, bottom:0, height:1, background:'rgba(247,247,242,.25)'}}/>
      {values.map((v,i) => {
        const h = interpolate(p,[0,1],[0,v]);
        return <div key={i} style={{
          position:'absolute', left:i*174, bottom:0, width:116, height:h*5,
          background:GOLD, transformOrigin:'bottom',
          boxShadow:'0 0 28px rgba(237,171,24,.16)',
        }}>
          <span style={{position:'absolute', bottom:h*5+16, left:0, fontSize:22, fontWeight:800, color:WHITE}}>{Math.round(h)}%</span>
          <span style={{position:'absolute', top:18, left:0, fontSize:15, letterSpacing:2, opacity:.45}}>Q{i+1}</span>
        </div>
      })}
    </div>
  );
};

const Timeline = ({p}:{p:number}) => {
  const items = [
    ['1984','Macintosh'], ['1998','iMac'], ['2007','iPhone'], ['2024','AI'], ['2026','Remotion']
  ];
  const move = interpolate(p,[0,1],[0,-210],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return (
    <div style={{position:'absolute', left:0, right:0, top:620, height:420, overflow:'hidden'}}>
      <div style={{position:'absolute', left:110+move, top:170, width:1700, height:4, background:WHITE, opacity:.22}}/>
      {items.map(([year,name],i) => (
        <div key={year} style={{position:'absolute', left:100+i*340+move, top:135, width:250}}>
          <div style={{width:22,height:22,borderRadius:'50%',background:GOLD,boxShadow:'0 0 0 8px rgba(237,171,24,.12)'}}/>
          <div style={{marginTop:24,fontSize:20,fontWeight:800,color:GOLD}}>{year}</div>
          <div style={{marginTop:8,fontSize:34,fontWeight:800,whiteSpace:'nowrap'}}>{name}</div>
        </div>
      ))}
    </div>
  );
};

const Portal = ({p}:{p:number}) => {
  const scale = interpolate(p,[0,.55,1],[.15,1,7]);
  const opacity = interpolate(p,[0,.15,.7,1],[0,1,1,0]);
  return (
    <AbsoluteFill style={{opacity}}>
      <div style={{
        position:'absolute', left:'50%', top:'50%', width:330, height:330,
        transform:`translate(-50%,-50%) scale(${scale})`,
        borderRadius:'50%',
        border:'8px solid '+GOLD,
        boxShadow:'0 0 35px rgba(237,171,24,.65), 0 0 130px rgba(237,171,24,.24), inset 0 0 80px rgba(237,171,24,.18)',
      }}/>
      <div style={{
        position:'absolute', left:'50%', top:'50%', width:210, height:210,
        transform:`translate(-50%,-50%) scale(${scale*.72})`,
        borderRadius:'50%', border:'2px solid rgba(247,247,242,.65)',
      }}/>
    </AbsoluteFill>
  );
};

const Browser = ({p}:{p:number}) => {
  const y = interpolate(p,[0,1],[70,0]);
  return (
    <div style={{position:'absolute', left:70, right:70, top:430, transform:`translateY(${y}px)`}}>
      <div style={{border:'1px solid rgba(247,247,242,.18)',borderRadius:22,overflow:'hidden',background:'rgba(247,247,242,.035)',boxShadow:'0 35px 90px rgba(0,0,0,.35)'}}>
        <div style={{height:58,borderBottom:'1px solid rgba(247,247,242,.12)',display:'flex',alignItems:'center',gap:9,padding:'0 22px'}}>
          {[1,2,3].map(x=><i key={x} style={{width:10,height:10,borderRadius:'50%',background:'rgba(247,247,242,.35)'}}/>)}
          <span style={{marginLeft:18,fontSize:14,opacity:.42}}>localhost:3000 / Remotion Studio</span>
        </div>
        <div style={{height:610,padding:28,display:'grid',gridTemplateColumns:'1fr 250px',gap:24}}>
          <div style={{border:'1px solid rgba(247,247,242,.12)',borderRadius:14,position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',left:28,top:38,fontSize:15,letterSpacing:2,color:GOLD}}>FRAME 0001</div>
            <div style={{position:'absolute',left:28,right:28,bottom:44,height:7,background:'rgba(247,247,242,.12)'}}>
              <div style={{width:`${p*72}%`,height:'100%',background:GOLD}}/>
            </div>
            <div style={{position:'absolute',left:28,top:150,fontSize:62,fontWeight:900}}>CODE</div>
            <div style={{position:'absolute',left:28,top:225,fontSize:62,fontWeight:900,color:GOLD}}>→ VIDEO</div>
          </div>
          <div style={{border:'1px solid rgba(247,247,242,.12)',borderRadius:14,padding:22}}>
            <div style={{fontSize:13,letterSpacing:2,opacity:.45}}>PROPS</div>
            {['accent','duration','fps'].map((x,i)=><div key={x} style={{marginTop:28,paddingBottom:16,borderBottom:'1px solid rgba(247,247,242,.1)',fontSize:16}}>{x}<span style={{float:'right',color:GOLD}}>{i===0?'#EDAB18':i===1?'25s':'30'}</span></div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

const Scene = ({children, start, end}:{children:React.ReactNode,start:number,end:number}) => {
  const frame=useCurrentFrame();
  const local=frame-start, len=end-start;
  const opacity=interpolate(local,[0,10,len-12,len],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const y=interpolate(local,[0,18],[30,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <AbsoluteFill style={{opacity,transform:`translateY(${y}px)`}}>{children}</AbsoluteFill>;
};

export const Reel: React.FC<{accent?:string}> = ({accent=GOLD}) => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const scene = frame < 105 ? 0 : frame < 225 ? 1 : frame < 345 ? 2 : frame < 465 ? 3 : frame < 600 ? 4 : 5;
  const local = scene===0?frame:scene===1?frame-105:scene===2?frame-225:scene===3?frame-345:scene===4?frame-465:frame-600;
  const p = spring({frame:Math.max(0,local),fps,config:{damping:16,stiffness:80}});
  const title = ['REMOTION','CODE → VIDEO','BUILD 01 / DATA','BUILD 02 / TIME','BUILD 03 / REEL','MOTION, WITHOUT KEYFRAMES'][scene];

  return <AbsoluteFill style={{background:BG,color:WHITE,fontFamily:'Roboto,Arial,sans-serif',overflow:'hidden'}}>
    <Grid/><Noise/><Scanlines/><Header label={scene===0?'MASTERCLASS':'REMOTION / 2026'}/>

    {scene===0 && <Scene start={0} end={105}>
      <div style={{position:'absolute',left:72,right:72,top:470}}>
        <div style={{fontSize:22,letterSpacing:6,color:accent,fontWeight:800}}>A NEW WAY TO MAKE MOTION</div>
        <div style={{fontSize:126,lineHeight:.9,fontWeight:900,marginTop:26,letterSpacing:-5}}>REMOTION</div>
        <div style={{fontSize:34,marginTop:34,opacity:.68}}>Code becomes a timeline.<br/>The timeline becomes a video.</div>
        <div style={{marginTop:52,width:300,height:6,background:accent,transformOrigin:'left',transform:`scaleX(${p})`}}/>
      </div>
    </Scene>}

    {scene===1 && <Scene start={105} end={225}>
      <Browser p={p}/>
      <div style={{position:'absolute',left:74,top:350,fontSize:22,letterSpacing:4,color:accent,fontWeight:800}}>REMOTION STUDIO</div>
    </Scene>}

    {scene===2 && <Scene start={225} end={345}>
      <div style={{position:'absolute',left:72,top:330,fontSize:22,letterSpacing:5,color:accent,fontWeight:800}}>BUILD 01</div>
      <div style={{position:'absolute',left:72,top:380,fontSize:64,fontWeight:900}}>DATA THAT MOVES.</div>
      <BarChart p={p}/>
      <div style={{position:'absolute',left:72,bottom:150,fontSize:20,opacity:.48}}>EASING • SCALE • DATA</div>
    </Scene>}

    {scene===3 && <Scene start={345} end={465}>
      <div style={{position:'absolute',left:72,top:330,fontSize:22,letterSpacing:5,color:accent,fontWeight:800}}>BUILD 02</div>
      <div style={{position:'absolute',left:72,top:380,fontSize:64,fontWeight:900}}>ONE CAMERA MOVE.</div>
      <Timeline p={p}/>
      <div style={{position:'absolute',left:72,bottom:150,fontSize:20,opacity:.48}}>TIMELINE • MACINTOSH • HALFTONE</div>
    </Scene>}

    {scene===4 && <Scene start={465} end={600}>
      <div style={{position:'absolute',left:72,top:330,fontSize:22,letterSpacing:5,color:accent,fontWeight:800}}>BUILD 03</div>
      <div style={{position:'absolute',left:72,top:380,fontSize:64,fontWeight:900}}>VIRAL REEL.</div>
      <Portal p={p}/>
      <div style={{position:'absolute',left:72,right:72,bottom:170,display:'flex',justifyContent:'space-between',fontSize:20,letterSpacing:2,opacity:.5}}>
        <span>PORTAL ZOOM</span><span>FILM GRAIN</span><span>SCANLINES</span>
      </div>
    </Scene>}

    {scene===5 && <Scene start={600} end={750}>
      <div style={{position:'absolute',left:72,right:72,top:510}}>
        <div style={{fontSize:24,letterSpacing:5,color:accent,fontWeight:800}}>THE TAKEAWAY</div>
        <div style={{fontSize:88,lineHeight:.98,fontWeight:900,marginTop:26,letterSpacing:-3}}>MOTION,<br/>WITHOUT<br/>KEYFRAMES.</div>
        <div style={{marginTop:38,fontSize:30,opacity:.65}}>No After Effects.<br/>No manual keyframes.<br/><b style={{color:WHITE}}>Just a system you can iterate.</b></div>
      </div>
      <div style={{position:'absolute',left:72,right:72,bottom:76,display:'flex',justifyContent:'space-between',fontSize:18,letterSpacing:2,opacity:.45}}>
        <span>CLAUDE CODE × REMOTION</span><span>@SAAFI SMART</span>
      </div>
    </Scene>}

    <div style={{position:'absolute',left:72,right:72,bottom:76,display:'flex',justifyContent:'space-between',fontSize:16,letterSpacing:2,opacity:.28}}>
      <span>STRATEGY • CREATIVE • AI</span><span>{String(Math.floor(frame/fps)).padStart(2,'0')}s</span>
    </div>
  </AbsoluteFill>;
};
