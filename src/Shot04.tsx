import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const PHOTO = 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=85';

export const Shot04: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 5, fps, config: {damping: 18, stiffness: 130, mass: 0.7}});
  const y = interpolate(enter, [0, 1], [110, 0]);
  const scale = interpolate(enter, [0, 1], [0.72, 1]);
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const push = interpolate(frame, [0, 33], [1, 1.055], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const textOpacity = interpolate(frame, [0, 8], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{backgroundColor: '#f7f7f5', overflow: 'hidden', fontFamily: 'Georgia, Times New Roman, serif'}}>
      <div style={{position: 'absolute', top: 335, left: 0, width: '100%', textAlign: 'center', opacity: textOpacity, color: '#444', fontSize: 38, fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.5px'}}>
        one is bright red with
      </div>

      <div style={{position: 'absolute', left: '50%', top: 650, width: 650, height: 650, transform: `translate(-50%, -50%) translateY(${y}px) scale(${scale * push})`, opacity, perspective: 1000}}>
        <div style={{position: 'absolute', inset: 14, borderRadius: 54, background: 'rgba(0,0,0,.16)', filter: 'blur(24px)', transform: 'translateY(25px) translateZ(-30px)'}} />
        <div style={{position: 'absolute', inset: 0, borderRadius: 54, overflow: 'hidden', background: '#ddd', boxShadow: '0 28px 55px rgba(0,0,0,.18), 0 8px 18px rgba(0,0,0,.10)', transform: 'translateZ(20px)'}}>
          <Img src={PHOTO} style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}} />
          <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,.16), transparent 40%, rgba(0,0,0,.08))'}} />
        </div>
        <div style={{position: 'absolute', left: 25, right: 25, bottom: -14, height: 18, borderRadius: '0 0 32px 32px', background: '#b9b9b9', transform: 'skewX(-7deg)', opacity: .8}} />
      </div>
    </AbsoluteFill>
  );
};
