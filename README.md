# Kinetic Editorial Motion Reel

A Remotion production system for turning scripts into premium short-form motion-design reels.

## Goal
Script -> analysis -> storyboard -> scene selection -> motion design -> render.

Default format: 1080x1920, 30fps, 9:16.

## Creative system
The project combines reusable patterns for kinetic typography, editorial cards, word emphasis, UI/data storytelling and controlled transitions. The goal is to avoid the repetitive caption-template look.

## Components
- KineticText
- WordReveal
- EditorialCard
- SceneRenderer
- timing utilities
- storyboard schema
- script analyzer prompt
- visual director prompt

## Development
npm install
npm run studio
npm run render

## Production workflow
1. Supply the script.
2. Generate storyboard JSON.
3. Validate the JSON.
4. Render scenes through reusable components.
5. Run visual QA.
6. Render the final MP4.

The system must understand the script before choosing animation. It should never turn every sentence into the same animated caption.

## 3D rebuild
CreatorAudience3DRebuild uses Remotion Three / React Three Fiber and runs the visual QA gate before final rendering.
