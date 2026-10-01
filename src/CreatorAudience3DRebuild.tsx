import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Canvas, useFrame} from '@react-three/fiber';
import {RoundedBox, Float} from '@react-three/drei';
import * as THREE from 'three';

const BG='#F2F2F2', INK='#222222', ORANGE='#E07A5F', ORANGE2='#F26B3A', BLUE='#8FAED1', MINT='#BFDCCF', WHITE='#FAFAF7';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};

type Beat={start:number;end:number;words:string[];mode:number};
const beats:Beat[]=[
 {start:0,end:75,words:['Creator','with','trust'],mode:0},
 {start:75,end:150,words:['Attention','+','Trust'],mode:1},
 {start:150,end:225,words:['Audience','already','exists'],mode:2},
 {start:225,end:300,words:['Years','of','building'],mode:3},
 {start:300,end:375,words:['Creator','has','it'],mode:2},
 {start:375,end:450,words:['Product','Service','Brand'],mode:4},
 {start:450,end:525,words:['Start','something','owned'],mode:5},
 {start:525,end:600,words:['Not','just','followers'],mode:6},
 {start:600,end:675,words:['Business','asset'],mode:7},
 {start:675,end:750,words:['Use','it','well'],mode:8},
 {start:750,end:825,words:['Audience','becomes','value'],mode:9},
 {start:825,end:900,words:['Creator','→','Business'],mode:10},
];

function Slab({position=[0,0,0],scale=[1,1,1],color=WHITE,rot=[0,0,0]}:{position?:[number,number,number];scale?:[number,number,number];color?:string;rot?:[number,number,number]}){
 return <RoundedBox position={position} scale={scale} rotation={rot} args={[1,1,.34]} radius={.16} smoothness={8} castShadow receiveShadow><meshStandardMaterial color={color} roughness={.62} metalness={.03}/></RoundedBox>;
}

function HeroObject({mode}:{mode:number}){
 const group=React.useRef<THREE.Group>(null); const f=useCurrentFrame();
 useFrame(()=>{if(!group.current)return;const t=f/30;group.current.rotation.y=.18+Math.sin(t*.55)*.12;group.current.rotation.x=.08+Math.sin(t*.42)*.035;group.current.position.y=Math.sin(t*.8)*.08;group.current.position.x=Math.sin(t*.33)*.18;});
 const entry=interpolate(f%75,[0,18,75],[.55,1,1],clamp); const action=mode%4; const ringRot=f*.018+mode*.45;
 return <group ref={group} scale={entry}>
   <RoundedBox args={[2.8,1.72,.58]} radius={.28} smoothness={10} castShadow receiveShadow><meshStandardMaterial color={ORANGE} roughness={.7} metalness={.02}/></RoundedBox>
   <RoundedBox position={[0,.18,.38]} args={[2.18,.42,.14]} radius={.09} smoothness={6} castShadow><meshStandardMaterial color={WHITE} roughness={.58}/></RoundedBox>
   <mesh position={[0,.43,.46]} castShadow><boxGeometry args={[.34,.34,.16]}/><meshStandardMaterial color={INK} roughness={.65}/></mesh>
   <mesh position={[-.72,-.38,.43]} castShadow><boxGeometry args={[.52,.13,.16]}/><meshStandardMaterial color={INK} roughness={.7}/></mesh>
   <mesh position={[.72,-.38,.43]} castShadow><boxGeometry args={[.52,.13,.16]}/><meshStandardMaterial color={INK} roughness={.7}/></mesh>
   <group rotation={[0,0,ringRot]}>
    <mesh position={[2.05,0,0]} rotation={[Math.PI/2,0,0]} castShadow><torusGeometry args={[.72,.065,12,48]}/><meshStandardMaterial color={mode%2?BLUE:ORANGE2} roughness={.42} metalness={.08}/></mesh>
    <mesh position={[-2.05,.22,-.35]} castShadow><sphereGeometry args={[.28,24,24]}/><meshStandardMaterial color={BLUE} roughness={.55}/></mesh>
    <mesh position={[1.6,-.75,.18]} castShadow><sphereGeometry args={[.2,20,20]}/><meshStandardMaterial color={MINT} roughness={.5}/></mesh>
    <mesh position={[-1.45,.78,.45]} castShadow><sphereGeometry args={[.18,20,20]}/><meshStandardMaterial color={ORANGE2} roughness={.48}/></mesh>
   </group>
   {action===0&&<group position={[0,1.45,.1]} rotation={[0,0,Math.sin(f/18)*.08]}><Slab scale={[.75,.42,.7]}/></group>}
   {action===1&&<group position={[0,1.65,.15]} rotation={[0,f*.025,0]}><Slab scale={[.58,.58,.58]} color={BLUE}/><mesh position={[0,0,.28]}><sphereGeometry args={[.18,20,20]}/><meshStandardMaterial color={WHITE}/></mesh></group>}
   {action===2&&<group position={[0,1.5,.2]} rotation={[0,f*.035,f*.02]}><Slab scale={[.9,.22,.65]} color={MINT}/><Slab position={[0,.34,.05]} scale={[.7,.16,.45]}/></group>}
   {action===3&&<group position={[0,1.5,.2]} rotation={[0,0,f*.018]}><mesh><boxGeometry args={[.72,.72,.72]}/><meshStandardMaterial color={INK} roughness={.7}/></mesh></group>}
 </group>;
}

function DepthLayers({mode}:{mode:number}){return <>
 <group position={[0,0,-3]}><Slab position={[-3.5,2.3,0]} scale={[2.2,1.3,.35]} rot={[0,.15,-.08]}/><Slab position={[3.3,2,0]} scale={[1.8,1.1,.3]} color={mode%2?MINT:WHITE} rot={[0,-.18,.1]}/></group>
 <group position={[0,0,-1.3]}><Slab position={[-3.9,-.2,0]} scale={[1.35,.7,.35]} color={mode%3===0?BLUE:WHITE} rot={[0,.2,-.12]}/><Slab position={[3.6,-.65,0]} scale={[1.55,.8,.32]} rot={[0,-.16,.09]}/></group>
 <group position={[0,0,1]}><mesh position={[-3.5,1.15,0]} castShadow><sphereGeometry args={[.22,20,20]}/><meshStandardMaterial color={ORANGE2}/></mesh><mesh position={[3.2,1.1,.2]} castShadow><sphereGeometry args={[.28,20,20]}/><meshStandardMaterial color={BLUE}/></mesh></group>
 </>}
function Wipe({beatIndex}:{beatIndex:number}){const f=useCurrentFrame();const local=f%75;const x=interpolate(local,[0,14,28,75],[-7,-1.5,8,8],clamp);if(local>32)return null;return <mesh position={[x,0,4]}><boxGeometry args={[2.4,7,.35]}/><meshStandardMaterial color={beatIndex%2?ORANGE2:INK} roughness={.5}/></mesh>}
function CameraRig(){const f=useCurrentFrame();const t=(f%75)/75;return <group rotation={[.015*Math.sin(t*Math.PI*2),.035*Math.sin(t*Math.PI*2),0]}><perspectiveCamera makeDefault position={[.2*Math.sin(t*Math.PI*2),.15*Math.cos(t*Math.PI*2),10-.65*t]} fov={38}/></group>}
function Scene3D({mode,beatIndex}:{mode:number;beatIndex:number}){return <Canvas shadows gl={{antialias:true,alpha:true}} dpr={[1,1.5]} camera={{position:[0,0,10],fov:38}}><CameraRig/><color attach="background" args={[BG]}/><ambientLight intensity={1.25}/><directionalLight position={[-5,7,8]} intensity={2.8} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-camera-left={-7} shadow-camera-right={7} shadow-camera-top={7} shadow-camera-bottom={-7}/><directionalLight position={[5,-1,5]} intensity={.7}/><mesh position={[0,0,-4]} receiveShadow><planeGeometry args={[24,24]}/><meshStandardMaterial color={BG} roughness={1}/></mesh><DepthLayers mode={mode}/><Float speed={1.2} rotationIntensity={.1} floatIntensity={.08}><HeroObject mode={mode}/></Float><Wipe beatIndex={beatIndex}/></Canvas>}
function Caption({beat}:{beat:Beat}){const f=useCurrentFrame();const local=f-beat.start;return <div style={{position:'absolute',left:45,right:45,top:'63%',height:'17%',display:'flex',justifyContent:'center',alignItems:'center',zIndex:20,pointerEvents:'none'}}><div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'0 20px',fontFamily:'Inter,Arial,sans-serif',fontSize:78,fontWeight:650,lineHeight:1,letterSpacing:-3,textAlign:'center',color:INK}}>{beat.words.map((word,i)=>{const at=8+i*14;const p=interpolate(local,[at,at+10],[0,1],clamp);const y=interpolate(local,[at,at+10],[36,0],clamp);const blur=interpolate(local,[at,at+10],[7,0],clamp);return <span key={word+i} style={{opacity:p,transform:`translateY(${y}px)`,filter:`blur(${blur}px)`,fontWeight:i===beat.words.length-1?800:650,color:i===beat.words.length-1?'#666':INK}}>{word}</span>})}</div></div>}
export const CreatorAudience3DRebuild:React.FC=()=>{const f=useCurrentFrame();const beatIndex=Math.min(beats.length-1,Math.floor(f/75));const beat=beats[beatIndex];return <AbsoluteFill style={{background:BG,overflow:'hidden'}}><Scene3D mode={beat.mode} beatIndex={beatIndex}/><Caption beat={beat}/><div style={{position:'absolute',top:'91.5%',width:'100%',textAlign:'center',fontFamily:'Inter,Arial,sans-serif',fontSize:17,fontWeight:600,letterSpacing:3,color:'#8A8A86',zIndex:25}}>CREATOR • AUDIENCE • VALUE</div></AbsoluteFill>};
