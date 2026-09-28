import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring} from 'remotion';

const BG='#060C1C'; const GOLD='#EDAB18'; const WHITE='#F7F7F2';

const Noise=()=> <AbsoluteFill style={{opacity:.08,pointerEvents:'none'}}><svg width='100%' height='100%'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='.35'/></svg></AbsoluteFill>;
const Grid=()=> <AbsoluteFill style={{opacity:.08,backgroundImage:'linear-gradient(rgba(247,247,242,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(247,247,242,.15) 1px,transparent 1px)',backgroundSize:'72px 72px',maskImage:'linear-gradient(to bottom,black,transparent 80%)'}}/>;

const Word=({children,accent=false,size=100}:{children:React.ReactNode;accent?:boolean;size?:number})=> <span style={{display:'inline-block',color:accent?GOLD:WHITE,fontSize:size,fontWeight:950,letterSpacing:-4}}>{children}</span>;

const Scene=({start,end,children}:{start:number;end:number;children:React.ReactNode})=>{
 const f=useCurrentFrame(); const local=f-start; const len=end-start;
 const opacity=interpolate(local,[0,10,len-10,len],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const y=interpolate(local,[0,12],[34,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return <AbsoluteFill style={{opacity,transform:`translateY(${y}px)`}}>{children}</AbsoluteFill>;
};

const Network=({p}:{p:number})=>{
 const pts=[['18%','28%'],['48%','18%'],['78%','30%'],['28%','65%'],['62%','72%'],['84%','60%']];
 return <AbsoluteFill>{pts.map(([x,y],i)=><React.Fragment key={i}><div style={{position:'absolute',left:x,top:y,width:26,height:26,borderRadius:'50%',background:i===1||i===4?GOLD:WHITE,opacity:.9,transform:`scale(${.5+p*.5})`,boxShadow:`0 0 35px ${i===1||i===4?'rgba(237,171,24,.45)':'rgba(247,247,242,.2)'}`}}/></React.Fragment>)}
 <svg width='100%' height='100%' style={{position:'absolute',inset:0,opacity:.24}}><line x1='18%' y1='28%' x2='48%' y2='18%' stroke='white'/><line x1='48%' y1='18%' x2='78%' y2='30%' stroke='white'/><line x1='18%' y1='28%' x2='28%' y2='65%' stroke='white'/><line x1='28%' y1='65%' x2='62%' y2='72%' stroke='white'/><line x1='62%' y1='72%' x2='84%' y2='60%' stroke='white'/><line x1='78%' y1='30%' x2='84%' y2='60%' stroke='white'/></svg></AbsoluteFill>;
};

export const CreatorAudienceReel:React.FC=()=>{
 const frame=useCurrentFrame(); const {fps}=useVideoConfig();
 const scene=frame<90?0:frame<210?1:frame<330?2:frame<450?3:frame<600?4:5;
 const local=scene===0?frame:scene===1?frame-90:scene===2?frame-210:scene===3?frame-330:scene===4?frame-450:frame-600;
 const p=spring({frame:Math.max(0,local),fps,config:{damping:18,stiffness:90}});
 return <AbsoluteFill style={{background:BG,color:WHITE,fontFamily:'Roboto,Arial,sans-serif',overflow:'hidden'}}><Grid/><Noise/>
 <div style={{position:'absolute',left:64,right:64,top:54,display:'flex',justifyContent:'space-between',fontSize:17,fontWeight:800,letterSpacing:3,zIndex:5}}><span style={{color:GOLD}}>SAAFI SMART</span><span style={{opacity:.38}}>CREATOR ECONOMY</span></div>

 {scene===0&&<Scene start={0} end={90}><div style={{position:'absolute',left:68,right:68,top:510}}><div style={{fontSize:22,color:GOLD,fontWeight:800,letterSpacing:5}}>THE CREATOR ADVANTAGE</div><div style={{marginTop:24,lineHeight:.9}}><Word size={116}>AUDIENCE</Word><br/><Word accent size={116}>IS ASSET.</Word></div><div style={{marginTop:34,fontSize:29,opacity:.6}}>A trusted audience gives a creator something<br/>a new company may spend years building.</div></div></Scene>}

 {scene===1&&<Scene start={90} end={210}><div style={{position:'absolute',left:68,top:390,fontSize:20,color:GOLD,fontWeight:800,letterSpacing:5}}>WHAT THEY REALLY OWN</div><div style={{position:'absolute',left:68,top:485,lineHeight:.92}}><Word size={104}>ATTENTION</Word><br/><span style={{fontSize:74,fontWeight:900,opacity:.35}}>+</span><br/><Word accent size={116}>TRUST.</Word></div><Network p={p}/></Scene>}

 {scene===2&&<Scene start={210} end={330}><div style={{position:'absolute',left:68,right:68,top:360}}><div style={{fontSize:21,color:GOLD,fontWeight:800,letterSpacing:5}}>THE OLD PATH</div><div style={{fontSize:66,fontWeight:900,lineHeight:1.02,marginTop:24}}>A NEW COMPANY<br/>CAN TAKE <span style={{color:GOLD}}>YEARS</span><br/>TO BUILD AN AUDIENCE.</div></div><div style={{position:'absolute',left:70,right:70,bottom:220,height:5,background:'rgba(247,247,242,.15)'}}><div style={{height:'100%',width:`${p*78}%`,background:GOLD}}/></div><div style={{position:'absolute',left:70,bottom:165,fontSize:18,opacity:.42,letterSpacing:3}}>TIME → AWARENESS → TRUST</div></Scene>}

 {scene===3&&<Scene start={330} end={450}><div style={{position:'absolute',left:68,right:68,top:390}}><div style={{fontSize:21,color:GOLD,fontWeight:800,letterSpacing:5}}>THE CREATOR ALREADY HAS IT</div><div style={{fontSize:104,fontWeight:950,lineHeight:.9,marginTop:28}}>THE<br/><span style={{color:GOLD}}>AUDIENCE.</span></div><div style={{marginTop:34,fontSize:31,opacity:.6}}>That changes the starting point.</div></div><div style={{position:'absolute',right:76,bottom:200,width:210,height:300,border:'1px solid rgba(247,247,242,.2)',borderRadius:30,transform:`rotate(${(1-p)*8-3}deg) scale(${.88+p*.12})`,background:'linear-gradient(150deg,rgba(237,171,24,.22),rgba(247,247,242,.03))'}}><div style={{padding:22,fontSize:16,letterSpacing:2,opacity:.5}}>CREATOR</div><div style={{position:'absolute',left:22,bottom:62,fontSize:22,fontWeight:800}}>100K+<br/><span style={{fontSize:14,opacity:.45}}>TRUSTED REACH</span></div></div></Scene>}

 {scene===4&&<Scene start={450} end={600}><div style={{position:'absolute',left:68,right:68,top:350}}><div style={{fontSize:20,color:GOLD,fontWeight:800,letterSpacing:5}}>WHAT CAN THAT BECOME?</div><div style={{marginTop:32,display:'flex',flexDirection:'column',gap:18}}>{['PRODUCT','SERVICE','PERSONAL BRAND'].map((x,i)=><div key={x} style={{fontSize:62,fontWeight:900,padding:'18px 24px',border:'1px solid rgba(247,247,242,.12)',borderRadius:18,transform:`translateX(${(1-interpolate(local,[i*12,i*12+16],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}))*70}px)`,opacity:interpolate(local,[i*12,i*12+16],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>{x}<span style={{float:'right',color:GOLD}}>→</span></div>)}</div></div></Scene>}

 {scene===5&&<Scene start={600} end={750}><div style={{position:'absolute',left:68,right:68,top:390}}><div style={{fontSize:21,color:GOLD,fontWeight:800,letterSpacing:5}}>THE BUSINESS IDEA</div><div style={{fontSize:72,fontWeight:950,lineHeight:1.02,marginTop:26}}>FOLLOWERS<br/><span style={{opacity:.35}}>ARE NOT THE POINT.</span></div><div style={{fontSize:45,fontWeight:900,lineHeight:1.05,marginTop:30}}>AUDIENCE = <span style={{color:GOLD}}>BUSINESS ASSET</span></div><div style={{marginTop:38,fontSize:25,opacity:.58,maxWidth:800}}>When attention and trust are used well, an audience can become the foundation for something much bigger.</div></div><div style={{position:'absolute',left:68,right:68,bottom:62,display:'flex',justifyContent:'space-between',fontSize:16,letterSpacing:2,opacity:.35}}><span>CREATOR ECONOMY • STRATEGY</span><span>@SAAFI SMART</span></div></Scene>}

 <div style={{position:'absolute',left:68,right:68,bottom:62,display:'flex',justifyContent:'space-between',fontSize:15,letterSpacing:2,opacity:.25}}><span>ATTENTION × TRUST</span><span>{String(Math.floor(frame/fps)).padStart(2,'0')}s</span></div>
 </AbsoluteFill>;
};