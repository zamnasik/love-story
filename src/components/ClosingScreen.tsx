import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { CastleSunrise } from './art/Backdrops';
import { FloatingPetals } from './effects/FloatingPetals';
import { GlowParticles } from './effects/GlowParticles';
import { LightRays } from './effects/LightRays';
import { LetterReveal } from './text/LetterReveal';
import { Poem } from './text/Poem';
import { SceneHeading } from './text/SceneHeading';
import { Panel, StoryScene } from './StoryScene';
import { closing } from '../content/story';

/**
 * Final scene. If you use a music track that needs a credit (for example Creative Commons BY),
 * add one line for it just above the footer text below.
 */
export function ClosingScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <StoryScene
      id="closing"
      shade={0.2}
      backdrop={(p) => <CastleSunrise progress={p} variant="distant" />}
      effects={
        <>
          <LightRays originX={70} originY={62} color="rgba(255, 236, 190, 0.3)" count={6} spread={80} />
          <FloatingPetals count={10} slow={1.2} seed={21} />
          <GlowParticles count={12} seed={8} />
        </>
      }
    >
      <SceneHeading sceneId="closing" eyebrow={closing.eyebrow} align="center">
        {closing.heading}
      </SceneHeading>
      {/* room to see the castle in the distance, and the flowers in the breeze */}
      <div className="h-[38vh]" aria-hidden="true" />
      <Panel>
        <LetterReveal lines={closing.body} className="space-y-5" />
      </Panel>

      <Poem lines={closing.poem} className="mt-14" />

      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.6 }}
      >
        <p className="font-serif text-2xl italic text-ivory text-soft-shadow sm:text-3xl">{closing.signatureLead}</p>
        <p className="mt-2 font-script text-6xl text-gold script-glow sm:text-7xl">
          {closing.signatureName}
          <span className="ml-2 font-sans text-4xl sm:text-5xl" aria-label="white heart">
            {closing.signatureEmoji}
          </span>
        </p>
      </motion.div>

      <div className="mt-16 flex flex-col items-center gap-10">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-rose to-gold px-8 py-4 font-medium text-midnight shadow-glow transition duration-500 hover:scale-[1.04]"
        >
          <RotateCcw className="h-5 w-5" aria-hidden="true" />
          {closing.button}
        </button>
        <p className="max-w-sm text-balance text-center font-serif text-lg italic text-blush/90 text-soft-shadow">{closing.footer}</p>
      </div>
    </StoryScene>
  );
}
