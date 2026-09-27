# Kinetic Editorial Motion Reel

## Mission
Turn a plain script into a production-ready vertical motion-design reel using Remotion. The system must behave like a visual director, not a caption generator.

## Default output
- 1080x1920
- 30fps
- 9:16
- MP4/H.264
- Align scene timing to supplied voice-over when available.
- Keep important text inside an 8% edge margin.

## Creative direction
Premium editorial kinetic typography for modern short-form motion design. Typography is the primary visual instrument. Use supporting visuals only when they improve comprehension.

### Motion rules
- Prefer decisive entrances, controlled exits, masking, crop reveals, blur, scale, parallax and directional movement.
- Use spring motion sparingly and with damping; avoid childish bounce.
- Avoid repeated animation patterns across consecutive scenes.
- Every major visual change must correspond to meaning, rhythm, emphasis or a structural beat.
- Use negative space deliberately.
- Use subtle grain/noise only as texture.
- Use UI, charts, timelines, diagrams, screenshots and icons when the script benefits from visual explanation.

## Script analysis
1. Extract hook, thesis, supporting claims, examples and CTA.
2. Identify emphasis words and phrases.
3. Estimate narration duration.
4. Divide into semantic scenes, not arbitrary time slices.
5. Assign a visual treatment to each scene.
6. Produce storyboard JSON.
7. Validate the storyboard before rendering.

## Scene grammar
- kineticText
- wordReveal
- phraseEmphasis
- editorialCard
- uiFrame
- chart
- timeline
- imageReveal
- talkingHeadOverlay
- diagram
- quote
- transition

Do not force every scene to use typography alone.

## Quality control
- No clipped text.
- No accidental overlaps.
- No unexplained repeated animation.
- Text contrast remains readable.
- Animation stays inside scene boundaries.
- No accidental frame flashes.
- Assets exist.
- Font loading is deterministic.
- Final duration matches the storyboard.
- Render a preview before final when practical.

## Output contract
Every generated reel should create:
- output/storyboard.json
- output/scene-plan.md
- output/final-reel.mp4

Optional:
- output/preview.mp4
- output/qa-report.md

Do not imitate or copy a named creator. Use broad descriptors such as editorial kinetic typography, premium social motion design, data-driven motion and UI storytelling.