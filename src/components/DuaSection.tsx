import { MosqueSunset } from './art/Backdrops';
import { LightRays } from './effects/LightRays';
import { StarField } from './effects/StarField';
import { LetterReveal } from './text/LetterReveal';
import { SceneHeading } from './text/SceneHeading';
import { StoryScene } from './StoryScene';
import { dua } from '../content/story';

/** A quiet, modest scene: a personal dua written by Nasik (not a Quranic verse or hadith). */
export function DuaSection() {
  const [opening, ...rest] = dua.lines;
  const closing = rest[rest.length - 1];
  const middle = rest.slice(0, -1);

  return (
    <StoryScene
      id="dua"
      nextId="confession"
      shade={0.3}
      backdrop={(p) => <MosqueSunset progress={p} />}
      effects={
        <>
          <LightRays originX={50} originY={78} color="rgba(255, 214, 150, 0.22)" count={7} spread={110} />
          <StarField count={26} seed={52} maxY={45} slow={1.6} />
        </>
      }
    >
      <SceneHeading sceneId="dua" eyebrow={dua.eyebrow} align="center">
        {dua.heading}
      </SceneHeading>

      {/* room to see the mosque silhouette and the sunset before the dua begins */}
      <div className="h-[34vh]" aria-hidden="true" />

      <div className="mx-auto w-full max-w-xl rounded-[2rem] border border-gold/25 bg-midnight/70 px-6 py-10 text-center shadow-soft sm:bg-midnight/55 sm:px-10 sm:backdrop-blur-md">
        <LetterReveal
          lines={[opening]}
          slow
          className="mb-8"
          lineClassName="font-serif text-3xl italic text-gold text-glow sm:text-4xl"
        />
        <LetterReveal
          lines={middle}
          slow
          className="space-y-7"
          lineClassName="font-serif text-xl leading-relaxed text-ivory sm:text-2xl"
        />
        <LetterReveal
          lines={[closing]}
          slow
          className="mt-10"
          lineClassName="font-serif text-4xl italic text-gold text-glow sm:text-5xl"
        />
      </div>
    </StoryScene>
  );
}
