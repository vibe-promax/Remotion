import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Canvas, useFrame} from '@react-three/fiber';
import {RoundedBox, Environment, Float} from '@react-three/drei';
import * as THREE from 'three';

const BG='#F2F2F2', INK='#222222', ORANGE='#E07A5F', BLUE='#6D8FB8';
const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};

function Hero({mode=0}: {mode?:number}) {
  const ref=React.useRef<THREE.Group>(null); const f=useCurrentFrame();
  useFrame(()=>{if(ref.current){ref.current.rotation.y=0.18+Math.sin(f/38)*0.08;ref.current.rotation.x=0.08+Math.sin(f/52)*0.025;ref.current.position.y=Math.sin(f/24)*0.08;}});
  const scale=interpolate(f,[0,20,60],[.45,1,1],clamp);
  return <group ref={ref} scale={scale}>
    <RoundedBox args={[2.7,1.75,.48]} radius={.22} smoothness={6} castShadow receiveShadow><meshStandardMaterial color={ORANGE} roughness={.72} metalness={.04}/></RoundedBox>
    <RoundedBox position={[0,.02,.29]} args={[2.25,.42,.12]} radius={.08} smoothness={4} castShadow><meshStandardMaterial color={WHITE()} roughness={.55}/></RoundedBox>
    <mesh position={[0,.28,.33]} castShadow><boxGeometry args={[.38,.38,.14]}/><meshStandardMaterial color={INK} roughness={.7}/></mesh>
    <mesh position={[-.72,-.42,.34]} castShadow><boxGeometry args={[.55,.14,.14]}/><meshStandardMaterial color={INK} roughness={.75}/></mesh>
    <mesh position={[.72,-.42,.34]} castShadow><boxGeometry args={[.55,.14,.14]}/><meshStandardMaterial color={INK} roughness={.75}/></mesh>
  </group>;
}
function WHITE(){return '#FAFAF8'}
function Scene({mode}:{mode:number}){const f=useCurrentFrame(); return <Canvas orthographic camera={{position:[0,0,9],zoom:92}} shadows gl={{antialias:true}} style={{position:'absolute',inset:0}}>
  <ambientLight intensity={1.7}/><directionalLight position={[-4,6,8]} intensity={2.3} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}/><directionalLight position={[5,-2,3]} intensity={.45}/><Environment preset="studio"/>
  <mesh position={[0,0,-1]} receiveShadow><planeGeometry args={[30,30]}/><meshStandardMaterial color={BG} roughness={1}/></mesh>
  <Float speed={.9} rotationIntensity={.12} floatIntensity={.08}><Hero mode={mode}/></Float>
  <group position={[0,-1.7,-.7]}><RoundedBox args={[4.8,.13,.18]} radius={.05}><meshStandardMaterial color="#D7D7D3" roughness={1}/></RoundedBox></group>
  {mode>0 && <group position={[3.1,1.6,-.9]}><RoundedBox args={[1.2,1.2,.22]} radius={.18} rotation={[0,.2,.12]}><meshStandardMaterial color={mode===1?BLUE:'#333'} roughness={.78}/></RoundedBox></group>}
  {mode===2 && <group position={[-3,-1,-.8]}><RoundedBox args={[1.5,.8,.25]} radius={.18} rotation={[0,-.15,-.1]}><meshStandardMaterial color={WHITE()} roughness={.82}/></RoundedBox></group>}
</Canvas>}
function Kinetic({words}:{words:string[]}){const f=useCurrentFrame(); return <div style={{position:'absolute',left:55,right:55,top:'64%',textAlign:'center',fontFamily:'Inter,Arial,sans-serif',fontSize:70,fontWeight:700,lineHeight:1.03,letterSpacing:-2,color:INK,display:'flex',justifyContent:'center',gap:18,flexWrap:'wrap',zIndex:10}}>{words.map((w,i)=>{const at=30+i*10;const y=interpolate(f,[at,at+12],[28,0],clamp);const op=interpolate(f,[at,at+12],[0,1],clamp);return <span key={i} style={{transform:`translateY(${y}px)`,opacity:op,filter:`blur(${interpolate(f,[at,at+12],[5,0],clamp)}px)`,color:i===words.length-1?'#777':INK}}>{w}</span>})}</div>}
export const CreatorAudience3DRebuild:React.FC=()=>{const f=useCurrentFrame(); const beat=Math.floor(f/100); const zoom=interpolate(f,[0,900],[1,1.12],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}); const sets=[['Attention','+','Trust'],['Creator','already','has','it'],['Product','Service','Brand'],['Business','asset']]; return <AbsoluteFill style={{background:BG,overflow:'hidden'}}><Scene mode={beat%3}/><div style={{position:'absolute',inset:0,transform:`scale(${zoom})`,pointerEvents:'none'}}><Kinetic words={sets[beat%sets.length]}/></div><div style={{position:'absolute',top:'92%',width:'100%',textAlign:'center',fontFamily:'Inter,Arial,sans-serif',fontSize:18,letterSpacing:2,color:'#888',zIndex:20}}>CREATOR → AUDIENCE → VALUE</div></AbsoluteFill>}
