import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";

type Props = {text: string; accent?: string; size?: number; align?: 'left' | 'center'};

export const KineticText: React.FC<Props> = ({text, accent = '#EDAB18', size = 104, align = 'left'}) => {
  const frame = useCurrentFrame();
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <AbsoluteFill style={{justifyContent: 'center', padding: 86}}>
      <div style={{maxWidth: 940, margin: align === 'center' ? '0 auto' : undefined, textAlign: align, fontFamily: 'Roboto, Arial, sans-serif', fontSize: size, lineHeight: 0.94, fontWeight: 900, letterSpacing: -3}}>
        {words.map((word, i) => {
          const delay = i * 4;
          const p = interpolate(frame, [delay, delay + 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const isLast = i === words.length - 1;
          return <span key={i} style={{display: 'inline-block', marginRight: 18, opacity: p, transform: 'translateY(' + ((1 - p) * 42) + 'px) scale(' + (0.94 + p * 0.06) + ')', color: isLast ? accent : '#F7F7F2'}}>{word}</span>;
        })}
      </div>
    </AbsoluteFill>
  );
};