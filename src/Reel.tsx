import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const scenes = [
  {start:0,end:105,kicker:'THE NEW WORKFLOW',title:'AI is changing\nhow businesses work.',body:'Not by replacing every person. By compressing the work between an idea and the result.'},
  {start:105,end:225,kicker:'THE SHIFT',title:'From hours of work\nto minutes of iteration.',body:'Research. Design. Content. Analysis. The bottleneck is moving from production to direction.'},
  {start:225,end:345,kicker:'THE ADVANTAGE',title:'Speed becomes\na creative advantage.',body:'The faster you can test, learn and improve, the more ideas you can turn into real output.'},
  {start:345,end:465,kicker:'THE NEW SKILL',title:'The valuable skill\nis knowing what to build.',body:'Tools can execute. Humans still decide the problem, the story, the taste and the standard.'},
  {start:465,end:600,kicker:'THE FORMULA',title:'Direction × Speed\n× Iteration.',body:'That is where AI becomes more than a tool: it becomes part of the production system.'},
  {start:600,end:750,kicker:'SAAFI SMART',title:'Build faster.\nThink bigger.',body:'The future belongs to teams that combine strategy, creativity and intelligent automation.'}
];

export const Reel: React.FC<{accent:string}> = ({accent}) => {
 const frame=useCurrentFrame(); const {fps}=useVideoConfig();
 const scene=scenes.find(s=>frame>=s.start&&frame<s.end)??scenes[5];
 const local=frame-scene.start; const len=scene.end-scene.start;
 const enter=spring({frame:local,fps,config:{damping:18,stiffness:90}});
 const fade=interpolate(local,[0,12,len-18,len],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const scale=interpolate(enter,[0,1],[1.06,1]); const line=interpolate(enter,[0,1],[0,100]);
 return <AbsoluteFill style={{background:'#060C1C',color:'#F7F7F2',fontFamily:'Arial,Helvetica,sans-serif',overflow:'hidden'}}>
  <AbsoluteFill style={{opacity:.22,backgroundImage:'radial-gradient(circle at 75% 20%,rgba(237,171,24,.35),transparent 30%),radial-gradient(circle at 15% 80%,rgba(80,130,255,.18),transparent 28%)'}}/>
  <AbsoluteFill style={{opacity:.07,backgroundImage:'repeating-linear-gradient(0deg,transparent 0px,transparent 3px,#fff 4px)',mixBlendMode:'screen'}}/>
  <div style={{position:'absolute',left:72,right:72,top:70,display:'flex',justifyContent:'space-between',fontSize:22,letterSpacing:3,fontWeight:700}}><span style={{color:accent}}>SAAFI SMART</span><span style={{opacity:.45}}>AI / 2026</span></div>
  <div style={{position:'absolute',left:72,top:'38%',right:72,opacity:fade,transform:`scale(${scale})`,transformOrigin:'left center'}}>
   <div style={{fontSize:20,letterSpacing:4,fontWeight:700,color:accent,marginBottom:28}}>{scene.kicker}</div>
   <div style={{fontSize:78,lineHeight:1.02,fontWeight:800,whiteSpace:'pre-line',maxWidth:920}}>{scene.title}</div>
   <div style={{marginTop:32,width:`${line}%`,height:5,background:accent,borderRadius:5}}/>
   <div style={{fontSize:27,lineHeight:1.35,color:'rgba(247,247,242,.68)',maxWidth:800,marginTop:28}}>{scene.body}</div>
  </div>
  <div style={{position:'absolute',left:72,right:72,bottom:70,display:'flex',justifyContent:'space-between',fontSize:18,letterSpacing:1.5,opacity:.5}}><span>STRATEGY • CREATIVE • AI</span><span>{String(Math.floor(frame/fps)).padStart(2,'0')}s</span></div>
 </AbsoluteFill>;
};
