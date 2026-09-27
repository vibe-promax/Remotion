import React from "react";
import {AbsoluteFill, Sequence} from "remotion";
import {KineticText} from "./KineticText";
import {EditorialCard} from "./EditorialCard";
import {WordReveal} from "./WordReveal";

export type SceneSpec = {id: string; type: string; start: number; duration: number; text: string; emphasis?: string[]; visual?: string};

export const SceneRenderer: React.FC<{scene: SceneSpec}> = ({scene}) => <Sequence from={scene.start} durationInFrames={scene.duration}>
  <AbsoluteFill>
    {scene.type === 'wordReveal' ? <WordReveal words={scene.text.split(/\s+/)} /> : scene.type === 'editorialCard' ? <EditorialCard eyebrow={scene.emphasis?.[0] || 'KEY IDEA'} title={scene.text} body={scene.visual} /> : <KineticText text={scene.text} />}
  </AbsoluteFill>
</Sequence>;