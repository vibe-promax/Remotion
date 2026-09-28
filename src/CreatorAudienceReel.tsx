import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring} from 'remotion';

const BG = '#F7F7F4';
const INK = '#151515';
const MUTED = '#77736D';
const RED = '#E63B32';
const BLUE = '#4778D8';
const LIME = '#C7E84B';
const CARD = '#FFFFFF';

const ease = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const fade = (f: number, start: number, end: number, inFrames = 10, outFrames = 10) =>
  interpolate(f, [start, start + inFrames, end - outFrames, end], [0, 1, 1, 0], ease);

const rise = (f: number, start: number, distance = 42, duration = 18) =>
  interpolate(f, [start, start + duration], [distance, 0], ease);

const ScaleIn = ({f, start, children, from = 0.88}: {f: number; start: number; children: React.ReactNode; from?: number}) => {
  const s = interpolate(f, [start, start + 18], [from, 1], ease);
  const o = interpolate(f, [start, start + 12], [0, 1], ease);
  return <div style={{opacity: o, transform: `scale(${s})`}}>{children}</div>;
};

const Serif = ({children, size = 92, italic = true, color = INK, weight = 500, style = {}}: any) => (
  <span style={{
    fontFamily: 'Georgia, Times New Roman, serif', fontSize: size, lineHeight: 0.9,
    fontStyle: italic ? 'italic' : 'normal', fontWeight: weight, color, letterSpacing: -3,
    ...style,
  }}>{children}</span>
);

const Sans = ({children, size = 22, color = INK, weight = 700, style = {}}: any) => (
  <span style={{fontFamily: 'Arial, Helvetica, sans-serif', fontSize: size, color, fontWeight: weight, ...style}}>{children}</span>
);

const Angular = ({rotate = 0, x = 0, y = 0, scale = 1, opacity = 0.7}: {rotate?: number; x?: number; y?: number; scale?: number; opacity?: number}) => (
  <div style={{position: 'absolute', left: x, top: y, width: 250, height: 92, opacity, transform: `rotate(${rotate}deg) scale(${scale})`, transformOrigin: 'center'}}>
    <div style={{position: 'absolute', inset: 0, clipPath: 'polygon(0 0, 28% 0, 50% 50%, 72% 0, 100% 0, 66% 100%, 34% 100%)', background: 'rgba(190,190,185,.18)', border: '1px solid rgba(30,30,30,.08)'}} />
  </div>
);

const Faceted = ({size = 180, x = 760, y = 150, rotate = 0, color = INK, opacity = 1}: any) => {
  const points = '50,0 86,16 100,50 86,84 50,100 14,84 0,50 14,16';
  return <svg style={{position: 'absolute', left: x, top: y, width: size, height: size, transform: `rotate(${rotate}deg)`, opacity, filter: 'drop-shadow(0 18px 20px rgba(0,0,0,.16))'}} viewBox="0 0 100 100">
    <polygon points={points} fill={color}/>
    <polygon points="50,0 86,16 50,50" fill="rgba(255,255,255,.18)"/>
    <polygon points="86,16 100,50 50,50" fill="rgba(255,255,255,.07)"/>
    <polygon points="50,50 100,50 86,84" fill="rgba(0,0,0,.14)"/>
    <polygon points="50,50 86,84 50,100" fill="rgba(0,0,0,.22)"/>
  </svg>;
};

const PhotoCard = ({x, y, w, h, color, label, rotate = 0}: any) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 34, background: color, transform: `rotate(${rotate}deg)`, boxShadow: '0 22px 42px rgba(0,0,0,.15)', overflow: 'hidden', border: '1px solid rgba(0,0,0,.06)'}}>
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,.32), transparent 45%, rgba(0,0,0,.08))'}} />
    <div style={{position: 'absolute', left: 24, bottom: 22}}><Sans size={18} color="rgba(255,255,255,.82)" weight={800}>{label}</Sans></div>
  </div>
);

const NodeNetwork = ({f, start}: {f: number; start: number}) => {
  const p = spring({frame: Math.max(0, f - start), fps: 30, config: {damping: 16, stiffness: 70}});
  const nodes = [[130,240],[380,160],[650,250],[250,470],[530,500],[820,410]];
  return <AbsoluteFill style={{opacity: p}}>
    <svg width="100%" height="100%" style={{position: 'absolute', inset: 0}}>
      {[[0,1],[1,2],[0,3],[3,4],[4,2],[2,5],[4,5]].map(([a,b],i)=><line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#222" strokeOpacity=".16" strokeWidth="3" />)}
    </svg>
    {nodes.map(([x,y],i)=><div key={i} style={{position: 'absolute', left:x-20, top:y-20, width:40, height:40, borderRadius:'50%', background:i===1||i===4?RED:CARD, border:`3px solid ${i===1||i===4?RED:INK}`, boxShadow:'0 8px 18px rgba(0,0,0,.12)', transform:`scale(${.65+p*.35})`}} />)}
  </AbsoluteFill>;
};

export const CreatorAudienceReel: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const duration = 27 * fps;

  return <AbsoluteFill style={{background: BG, color: INK, overflow: 'hidden'}}>
    <Angular x={-35} y={130} rotate={-10} opacity={0.8}/>
    <Angular x={690} y={430} rotate={18} scale={1.15}/>
    <Angular x={-55} y={1260} rotate={-14} scale={1.3}/>
    <Faceted x={800} y={75} size={170} rotate={18} opacity={.95}/>
    <Faceted x={-72} y={1490} size={190} rotate={-12} opacity={.82}/>

    {/* 0:00–0:02 */}
    {f < 60 && <AbsoluteFill style={{opacity: fade(f,0,60)}}>
      <div style={{position:'absolute', left:72, top:300}}>
        <Sans size={21} color={MUTED} weight={700} style={{letterSpacing:4}}>SIDAAS OO KALE</Sans>
        <div style={{marginTop:34}}><Serif size={118}>Creator</Serif></div>
        <div style={{marginTop:6}}><Serif size={118} color={RED}>le</Serif> <Serif size={118}>audience</Serif></div>
        <div style={{marginTop:34}}><Sans size={27} color={MUTED} weight={500}>ku kalsoon wuxuu haystaa wax aad u qiimo badan.</Sans></div>
      </div>
    </AbsoluteFill>}

    {/* 0:02–0:08 Attention + Trust */}
    {f >= 60 && f < 240 && <AbsoluteFill style={{opacity: fade(f,60,240)}}>
      <div style={{position:'absolute', left:72, top:270}}>
        <Sans size={20} color={MUTED} weight={800} style={{letterSpacing:4}}>THE REAL ASSET</Sans>
        <div style={{marginTop:28}}><Serif size={128}>Attention</Serif></div>
        <div style={{marginTop:-6}}><Serif size={82} color={RED}>+</Serif></div>
        <div style={{marginTop:-4}}><Serif size={128}>Trust.</Serif></div>
      </div>
      <NodeNetwork f={f} start={80}/>
      <div style={{position:'absolute', left:74, bottom:245, width:850, height:2, background:'rgba(20,20,20,.12)'}} />
      <div style={{position:'absolute', left:74, bottom:208}}><Sans size={20} color={MUTED} weight={700}>AUDIENCE = ATTENTION × TRUST</Sans></div>
      <Faceted x={735} y={1180} size={150} rotate={-8} color={RED} opacity={.9}/>
    </AbsoluteFill>}

    {/* 0:08–0:13 New company takes years */}
    {f >= 240 && f < 390 && <AbsoluteFill style={{opacity: fade(f,240,390)}}>
      <div style={{position:'absolute', left:72, top:310}}>
        <Sans size={20} color={MUTED} weight={800} style={{letterSpacing:4}}>THE OLD PATH</Sans>
        <div style={{marginTop:28}}><Serif size={105}>Shirkad cusub</Serif></div>
        <div style={{marginTop:12}}><Serif size={105}>waxay qaadan kartaa</Serif></div>
        <div style={{marginTop:18}}><Serif size={132} color={RED}>sannado.</Serif></div>
      </div>
      <div style={{position:'absolute', left:72, right:72, bottom:360, height:5, background:'rgba(20,20,20,.12)', borderRadius:5}}>
        <div style={{height:'100%', width:`${interpolate(f,[240,340],[4,92],ease)}%`, background:INK, borderRadius:5}} />
      </div>
      <div style={{position:'absolute', left:72, bottom:315, display:'flex', justifyContent:'space-between', width:870}}>
        <Sans size={19} color={MUTED}>AWARENESS</Sans><Sans size={19} color={MUTED}>AUDIENCE</Sans><Sans size={19} color={MUTED}>TRUST</Sans>
      </div>
      <Faceted x={-55} y={1160} size={180} rotate={12} color={BLUE} opacity={.82}/>
    </AbsoluteFill>}

    {/* 0:13–0:15 Creator already has it */}
    {f >= 390 && f < 450 && <AbsoluteFill style={{opacity: fade(f,390,450)}}>
      <div style={{position:'absolute', left:72, top:340}}>
        <Sans size={20} color={MUTED} weight={800} style={{letterSpacing:4}}>THE CREATOR ALREADY HAS IT</Sans>
        <div style={{marginTop:30}}><Serif size={128}>Hore ayuu</Serif></div>
        <div style={{marginTop:8}}><Serif size={138} color={BLUE}>u haystaa.</Serif></div>
      </div>
      <PhotoCard x={670} y={1030} w={300} h={390} color={BLUE} label="TRUSTED AUDIENCE" rotate={-6}/>
      <Faceted x={790} y={140} size={130} rotate={28} color={LIME} opacity={.9}/>
    </AbsoluteFill>}

    {/* 0:15–0:21 Product / service / brand */}
    {f >= 450 && f < 630 && <AbsoluteFill style={{opacity: fade(f,450,630)}}>
      <div style={{position:'absolute', left:72, top:260}}>
        <Sans size={20} color={MUTED} weight={800} style={{letterSpacing:4}}>WHAT IT CAN BECOME</Sans>
        <div style={{marginTop:30}}><Serif size={104}>Product.</Serif></div>
        <div style={{marginTop:10}}><Serif size={104} color={RED}>Service.</Serif></div>
        <div style={{marginTop:10}}><Serif size={104}>Brand.</Serif></div>
      </div>
      <div style={{position:'absolute', right:74, top:1040, width:350, height:390, borderRadius:38, background:CARD, boxShadow:'0 22px 50px rgba(0,0,0,.15)', border:'1px solid rgba(0,0,0,.07)', transform:`rotate(${interpolate(f,[450,520],[7,2],ease)}deg)`}}>
        <div style={{position:'absolute', inset:24, borderRadius:26, background:'linear-gradient(145deg,#f1f1ee,#d7d7d2)'}} />
        <div style={{position:'absolute', left:48, bottom:45}}><Sans size={18} color={MUTED} weight={800}>CREATOR → BUSINESS</Sans></div>
      </div>
      <Faceted x={-60} y={1350} size={170} rotate={-18} color={RED} opacity={.88}/>
    </AbsoluteFill>}

    {/* 0:21–0:25.5 Business asset */}
    {f >= 630 && f < 765 && <AbsoluteFill style={{opacity: fade(f,630,765)}}>
      <div style={{position:'absolute', left:72, top:260}}>
        <Sans size={20} color={MUTED} weight={800} style={{letterSpacing:4}}>THE BUSINESS VALUE</Sans>
        <div style={{marginTop:30}}><Serif size={103}>Followers ma aha</Serif></div>
        <div style={{marginTop:10}}><Serif size={108} color={RED}>ujeeddada.</Serif></div>
        <div style={{marginTop:38}}><Sans size={39} weight={800}>Audience = <span style={{color:BLUE}}>Business Asset</span></Sans></div>
      </div>
      <div style={{position:'absolute', right:70, bottom:300, width:360, height:260, background:INK, borderRadius:32, transform:`rotate(${interpolate(f,[630,700],[-5,0],ease)}deg)`, boxShadow:'0 28px 55px rgba(0,0,0,.22)'}}>
        <div style={{position:'absolute', left:26, top:24}}><Sans size={16} color="#fff" weight={800} style={{letterSpacing:3}}>BUSINESS ASSET</Sans></div>
        <div style={{position:'absolute', left:26, bottom:28}}><Serif size={53} color="#fff">Attention × Trust</Serif></div>
      </div>
      <Faceted x={780} y={80} size={150} rotate={20} color={BLUE} opacity={.88}/>
    </AbsoluteFill>}

    {/* 0:25.5–0:27 CTA */}
    {f >= 765 && <AbsoluteFill style={{opacity: fade(f,765,duration,10,0)}}>
      <div style={{position:'absolute', left:72, top:340}}>
        <Sans size={20} color={MUTED} weight={800} style={{letterSpacing:4}}>CREATOR ECONOMY</Sans>
        <div style={{marginTop:30}}><Serif size={101}>Audience</Serif></div>
        <div style={{marginTop:8}}><Serif size={101} color={RED}>waa hanti.</Serif></div>
        <div style={{marginTop:40, maxWidth:820}}><Sans size={24} color={MUTED} weight={500}>Haddii si sax ah loo isticmaalo, waxay noqon kartaa saldhig business oo dhab ah.</Sans></div>
      </div>
      <div style={{position:'absolute', left:72, right:72, bottom:80, display:'flex', justifyContent:'space-between'}}>
        <Sans size={16} color={MUTED} weight={700}>#InfluencerMarketing #ContentCreator</Sans>
        <Sans size={16} color={MUTED} weight={700}>#DigitalMarketing #Entrepreneur</Sans>
      </div>
      <div style={{position:'absolute', right:80, bottom:130, width:90, height:90, borderRadius:'50%', background:LIME, boxShadow:'0 14px 28px rgba(0,0,0,.12)'}} />
    </AbsoluteFill>}

    <div style={{position:'absolute', left:72, right:72, bottom:36, display:'flex', justifyContent:'space-between', opacity:.34}}>
      <Sans size={13} color={INK} weight={700}>ATTENTION × TRUST</Sans>
      <Sans size={13} color={INK} weight={700}>{String(Math.floor(f/fps)).padStart(2,'0')}s</Sans>
    </div>
  </AbsoluteFill>;
};
