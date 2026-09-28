import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {CanvasTexture} from 'three';

const BG='#07111F';
const COLORS=['#FF3B81','#7C5CFF','#00D9FF','#FFD447','#5CFF9A','#FF6B35'];

const Word3D:React.FC<{text:string;color:string;scale:number;z:number;rotate:number}> = ({text,color,scale,z,rotate}) => (
  <mesh position={[0,0,z]} rotation={[0,rotate,0]} scale={scale}>
    <boxGeometry args={[3.8,1.0,.22]} />
    <meshStandardMaterial color={color} metalness={.45} roughness={.28} />
  </mesh>
);

const Scene3D:React.FC<{frame:number;scene:number}> = ({frame,scene}) => {
  const t=frame/30;
  const r=t*.42;
  return <ThreeCanvas width={1080} height={1920} camera={{position:[0,0,8],fov:42}}>
    <ambientLight intensity={.65}/>
    <directionalLight position={[4,5,6]} intensity={2.2}/>
    <pointLight position={[-4,1,4]} color={COLORS[(scene+2)%COLORS.length]} intensity={35} distance={12}/>
    <pointLight position={[4,-2,3]} color={COLORS[(scene+4)%COLORS.length]} intensity={25} distance={10}/>
    <group rotation={[Math.sin(t*.5)*.08,r*.28,Math.cos(t*.4)*.08]}>
      <Word3D text='' color={COLORS[scene%COLORS.length]} scale={1.25} z={0} rotate={Math.sin(t)*.18}/>
      <mesh position={[0,0,-1.1]} rotation={[0,r*.7,0]}>
        <torusGeometry args={[2.3,.035,16,96]} />
        <meshStandardMaterial color={COLORS[(scene+1)%COLORS.length]} emissive={COLORS[(scene+1)%COLORS.length]} emissiveIntensity={1.2}/>
      </mesh>
      {[...Array(8)].map((_,i)=>{
        const a=i*Math.PI/4+t*.4;
        return <mesh key={i} position={[Math.cos(a)*2.7,Math.sin(a)*2.7,-.7]} rotation={[a,0,r]}>
          <boxGeometry args={[.28,.28,.28]}/>
          <meshStandardMaterial color={COLORS[(i+scene)%COLORS.length]} metalness={.25} roughness={.3}/>
        </mesh>
      })}
    </group>
  </ThreeCanvas>;
};

const TextLayer:React.FC<{frame:number}> = ({frame}) => {
  const p=spring({frame,fps:30,config:{damping:16,stiffness:95}});
  const opacity=interpolate(frame,[0,12,100,115],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  const y=(1-p)*70;
  return <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 68px',opacity,transform:`translateY(${y}px)`,fontFamily:'Roboto,Arial,sans-serif'}}>
    <div style={{fontSize:18,fontWeight:800,letterSpacing:5,color:COLORS[0]}}>CREATOR ECONOMY</div>
    <div style={{fontSize:102,fontWeight:950,lineHeight:.86,letterSpacing:-5,color:'#F8FAFF',marginTop:24}}>ATTENTION<br/><span style={{color:COLORS[3]}}>+</span> TRUST</div>
    <div style={{fontSize:27,lineHeight:1.25,opacity:.65,maxWidth:800,marginTop:35}}>A trusted audience is more than followers. It can become the foundation for a product, service or brand.</div>
  </div>;
};

export const Creator3DReel:React.FC=()=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const scene=Math.floor(frame/120)%5;
  const local=frame%120;
  return <AbsoluteFill style={{background:BG,overflow:'hidden'}}>
    <Scene3D frame={frame} scene={scene}/>
    <AbsoluteFill style={{background:'radial-gradient(circle at 50% 50%, transparent 20%, rgba(7,17,31,.72) 78%)'}}/>
    <TextLayer frame={local}/>
    <div style={{position:'absolute',top:54,left:64,right:64,display:'flex',justifyContent:'space-between',fontFamily:'Roboto,Arial,sans-serif',fontSize:16,fontWeight:800,letterSpacing:3,color:'#F8FAFF',opacity:.45}}><span>SAafi SMART</span><span>3D MOTION</span></div>
    <div style={{position:'absolute',bottom:58,left:64,right:64,display:'flex',justifyContent:'space-between',fontFamily:'Roboto,Arial,sans-serif',fontSize:15,letterSpacing:2,color:'#F8FAFF',opacity:.3}}><span>ATTENTION × TRUST</span><span>{String(Math.floor(frame/fps)).padStart(2,'0')}s</span></div>
  </AbsoluteFill>;
};
