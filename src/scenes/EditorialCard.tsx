import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";

type Props = {eyebrow: string; title: string; body?: string; accent?: string};

export const EditorialCard: React.FC<Props> = ({eyebrow, title, body, accent = '#EDAB18'}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, 14], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{padding: 78, justifyContent: 'center'}}>
    <div style={{border: '1px solid rgba(247,247,242,.16)', borderRadius: 28, padding: 48, background: 'rgba(247,247,242,.035)', boxShadow: '0 30px 90px rgba(0,0,0,.32)', transform: 'translateY(' + ((1-p)*50) + 'px)', opacity: p}}>
      <div style={{fontSize: 20, fontWeight: 800, letterSpacing: 4, color: accent}}>{eyebrow}</div>
      <div style={{fontSize: 72, lineHeight: 0.98, fontWeight: 900, marginTop: 24}}>{title}</div>
      {body && <div style={{fontSize: 28, lineHeight: 1.25, opacity: 0.68, marginTop: 28}}>{body}</div>}
    </div>
  </AbsoluteFill>;
};