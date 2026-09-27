import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";

export const WordReveal: React.FC<{words: string[]; accent?: string}> = ({words, accent = '#EDAB18'}) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: 80}}>
    <div style={{display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center'}}>
      {words.map((word, i) => {
        const p = interpolate(frame, [i*5, i*5+12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const active = i === words.length - 1;
        return <div key={word + i} style={{padding: '12px 22px', borderRadius: 999, background: active ? accent : 'rgba(247,247,242,.08)', color: active ? '#060C1C' : '#F7F7F2', fontSize: 46, fontWeight: 850, transform: 'translateY(' + ((1-p)*30) + 'px) scale(' + (0.9+p*0.1) + ')', opacity: p}}>{word}</div>;
      })}
    </div>
  </AbsoluteFill>;
};