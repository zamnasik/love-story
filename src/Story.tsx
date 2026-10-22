import { motion } from 'framer-motion';
import {
  BlossomNight,
  CastleSunrise,
  DeskScene,
  DeskToStars,
  GardenSunset,
  RoomToMoonGarden,
  RoomWindow,
  TwoStarsSky,
  VillageSunrise,
} from './components/art/Backdrops';
import { ClosingScreen } from './components/ClosingScreen';
import { DuaSection } from './components/DuaSection';
import { FinalConfession } from './components/FinalConfession';
import { FabricMotif } from './components/FabricMotif';
import { FlowerWords } from './components/FlowerWords';
import { FloatingPetals } from './components/effects/FloatingPetals';
import { GlowParticles } from './components/effects/GlowParticles';
import { LightRays } from './components/effects/LightRays';
import { StarField } from './components/effects/StarField';
import { MemoryCard } from './components/MemoryCard';
import { Pillars } from './components/Pillars';
import { ProgressPath } from './components/ProgressPath';
import { Panel, StoryScene } from './components/StoryScene';
import { HandwrittenReveal } from './components/text/HandwrittenReveal';
import { LetterReveal } from './components/text/LetterReveal';
import { Poem } from './components/text/Poem';
import { SceneHeading } from './components/text/SceneHeading';
import { TypewriterText } from './components/text/TypewriterText';
import { boy, building, castle, before, firstSight, neverFelt, saved, talking, thatNight } from './content/story';

const bodyLine = 'text-base leading-relaxed text-ivory/90 sm:text-lg';
const freeLine = 'text-lg leading-relaxed text-ivory text-soft-shadow sm:text-xl';

/** Scenes 2 to 10, plus the dua, the confession and the closing scene. */
export function Story({ onRestart }: { onRestart: () => void }) {
  return (
    <>
      {/* 2. THE BOY I WAS */}
      <StoryScene
        id="boy"
        nextId="building"
        shade={0.3}
        backdrop={(p) => <VillageSunrise progress={p} />}
        effects={
          <>
            <LightRays originX={50} originY={64} color="rgba(255, 226, 168, 0.3)" count={7} spread={100} />
            <GlowParticles count={14} seed={2} />
          </>
        }
      >
        <Panel>
          <SceneHeading sceneId="boy" eyebrow={boy.eyebrow}>
            {boy.heading}
          </SceneHeading>
          <LetterReveal lines={boy.body} className="mt-8 space-y-5" lineClassName={bodyLine} />
        </Panel>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {boy.cards.map((c, i) => (
            <MemoryCard key={c.title} title={c.title} subtitle={c.subtitle} icon={c.icon} index={i} />
          ))}
        </div>
        <Poem lines={boy.poem} className="mt-16" />
      </StoryScene>

      {/* 3. A LIFE I AM STILL BUILDING */}
      <StoryScene
        id="building"
        nextId="never-felt"
        shade={0.2}
        backdrop={(p) => <DeskScene progress={p} />}
        effects={<GlowParticles count={12} seed={6} />}
      >
        <Panel>
          <SceneHeading sceneId="building" eyebrow={building.eyebrow}>
            {building.heading}
          </SceneHeading>
          <LetterReveal lines={building.body} className="mt-8 space-y-5" lineClassName={bodyLine} />
        </Panel>
        <div className="mt-14">
          <ProgressPath labels={building.path} />
        </div>
        <Poem lines={building.poem} className="mt-16" />
        <div className="mt-16 text-center">
          <HandwrittenReveal text={building.handwritten} />
        </div>
      </StoryScene>

      {/* 4. THE LOVE I NEVER KNEW I WAS WAITING FOR (slower, the words breathe) */}
      <StoryScene
        id="never-felt"
        nextId="before"
        shade={0.12}
        backdrop={(p) => <DeskToStars progress={p} />}
        effects={
          <>
            <StarField count={90} seed={4} maxY={70} slow={1.4} />
            <FloatingPetals count={6} direction="cross" slow={1.5} seed={12} />
          </>
        }
      >
        <SceneHeading sceneId="never-felt" eyebrow={neverFelt.eyebrow}>
          {neverFelt.heading}
        </SceneHeading>
        <LetterReveal slow lines={neverFelt.body} className="mt-12 space-y-9" lineClassName={freeLine} />
        <p className="mt-16 text-center font-serif text-2xl italic leading-snug text-gold text-glow sm:text-4xl">
          <TypewriterText text={neverFelt.highlight} speed={58} />
        </p>
        <Poem lines={neverFelt.poem} className="mt-20" />
      </StoryScene>

      {/* 5. BEFORE I SAW YOU */}
      <StoryScene
        id="before"
        nextId="first-sight"
        shade={0.3}
        backdrop={(p) => <GardenSunset progress={p} />}
        effects={
          <>
            <FloatingPetals count={14} seed={5} />
            <GlowParticles count={8} seed={17} />
          </>
        }
      >
        <Panel>
          <SceneHeading sceneId="before" eyebrow={before.eyebrow}>
            {before.heading}
          </SceneHeading>
          <LetterReveal lines={before.body} className="mt-8 space-y-5" lineClassName={bodyLine} />
        </Panel>
        <div className="mt-16">
          <FlowerWords words={before.words} caption={before.wordsCaption} />
        </div>
        <p className="mt-14 text-center font-serif text-2xl italic leading-snug text-ivory text-soft-shadow sm:text-3xl">
          <TypewriterText text={before.closing} speed={50} />
        </p>
        <Poem lines={before.poem} className="mt-16" />
      </StoryScene>

      {/* 6. THE FIRST TIME I SAW YOU */}
      <StoryScene
        id="first-sight"
        nextId="talking"
        shade={0.28}
        backdrop={(p) => <RoomWindow progress={p} />}
        effects={
          <>
            <LightRays originX={50} originY={14} color="rgba(255, 224, 150, 0.3)" count={5} spread={50} />
            <GlowParticles count={14} seed={23} slow={1.3} />
            <FloatingPetals count={5} slow={1.5} seed={30} />
          </>
        }
      >
        <Panel>
          <SceneHeading sceneId="first-sight" eyebrow={firstSight.eyebrow}>
            {firstSight.heading}
          </SceneHeading>
          <LetterReveal lines={firstSight.body} className="mt-8 space-y-5" lineClassName={bodyLine} />
        </Panel>
        <div className="mt-14">
          <FabricMotif />
        </div>
        <motion.blockquote
          className="mx-auto mt-14 max-w-xl rounded-[2rem] border border-gold/30 bg-midnight/70 p-7 text-center font-serif text-xl italic leading-relaxed text-ivory shadow-glow sm:bg-midnight/55 sm:p-10 sm:text-2xl sm:backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ duration: 1.8 }}
        >
          {firstSight.memory}
        </motion.blockquote>
        <Poem lines={firstSight.poem} className="mt-16" />
      </StoryScene>

      {/* 7. OUR FIRST CONVERSATION */}
      <StoryScene
        id="talking"
        nextId="that-night"
        shade={0.24}
        backdrop={(p) => <RoomToMoonGarden progress={p} />}
        effects={<GlowParticles count={14} seed={27} slow={1.3} />}
      >
        <Panel>
          <SceneHeading sceneId="talking" eyebrow={talking.eyebrow}>
            {talking.heading}
          </SceneHeading>
          <LetterReveal lines={talking.body} className="mt-8 space-y-5" lineClassName={bodyLine} />
        </Panel>
        <div className="mt-16 text-center">
          <HandwrittenReveal text={talking.handwritten} />
        </div>
        <Poem lines={talking.poem} className="mt-16" />
      </StoryScene>

      {/* 8. THAT NIGHT, WE WERE THINKING ABOUT EACH OTHER */}
      <StoryScene
        id="that-night"
        nextId="saved"
        shade={0.1}
        backdrop={(p) => <TwoStarsSky progress={p} />}
        effects={<StarField count={95} seed={8} maxY={70} slow={1.3} />}
      >
        <div className="h-[8vh]" aria-hidden="true" />
        <SceneHeading sceneId="that-night" eyebrow={thatNight.eyebrow} align="center">
          {thatNight.heading}
        </SceneHeading>
        <LetterReveal
          slow
          lines={thatNight.body}
          className="mt-16 space-y-8 text-center"
          lineClassName={freeLine}
        />
        <p className="mt-16 text-center font-serif text-2xl italic leading-snug text-gold text-glow sm:text-3xl">
          <TypewriterText text={thatNight.closing} speed={50} />
        </p>
        <Poem lines={thatNight.poem} className="mt-16" />
      </StoryScene>

      {/* 9. THE LOVE I SAVED FOR YOU: slow, quiet, one sentence at a time */}
      <StoryScene
        id="saved"
        nextId="castle"
        shade={0.08}
        backdrop={(p) => <BlossomNight progress={p} />}
        effects={
          <>
            <StarField count={70} seed={9} maxY={65} slow={1.6} />
            <GlowParticles count={16} seed={36} slow={1.5} />
            <FloatingPetals count={6} slow={1.8} seed={40} />
            <div
              className="heartbeat absolute left-1/2 top-1/2 h-[64vmin] w-[64vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(244,185,200,0.26) 0%, rgba(244,185,200,0.08) 45%, transparent 70%)' }}
            />
          </>
        }
      >
        <SceneHeading sceneId="saved" eyebrow={saved.eyebrow} align="center">
          {saved.heading}
        </SceneHeading>
        <LetterReveal
          slow
          lines={saved.lines}
          className="mt-[14vh] space-y-12 text-center sm:space-y-14"
          lineClassName="font-serif text-2xl leading-snug text-ivory text-soft-shadow sm:text-4xl"
        />
        <motion.p
          className="mt-[16vh] text-center font-serif text-3xl italic leading-snug text-gold text-glow sm:text-5xl"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ duration: 2.6, ease: 'easeOut' }}
        >
          {saved.highlight}
        </motion.p>
        <Poem lines={saved.poem} className="mt-[14vh]" />
      </StoryScene>

      {/* 10. THE CASTLE WE CAN BUILD TOGETHER */}
      <StoryScene
        id="castle"
        nextId="dua"
        shade={0.26}
        backdrop={(p) => <CastleSunrise progress={p} variant="near" />}
        effects={
          <>
            <LightRays originX={50} originY={58} color="rgba(255, 232, 180, 0.26)" count={7} spread={110} />
            <FloatingPetals count={9} slow={1.3} seed={50} />
            <GlowParticles count={10} seed={51} />
          </>
        }
      >
        <SceneHeading sceneId="castle" eyebrow={castle.eyebrow} align="center">
          {castle.heading}
        </SceneHeading>
        {/* room to see the castle on its hill before the letter begins */}
        <div className="h-[46vh]" aria-hidden="true" />
        <Panel>
          <LetterReveal lines={castle.body} className="space-y-5" lineClassName={bodyLine} />
        </Panel>

        <div className="mt-12 rounded-[2rem] border border-gold/25 bg-midnight/70 p-6 shadow-soft sm:bg-midnight/55 sm:p-10 sm:backdrop-blur-md">
          <LetterReveal
            lines={castle.home}
            className="space-y-4"
            lineClassName="font-serif text-xl leading-relaxed text-ivory sm:text-2xl"
          />
        </div>

        <Panel className="mt-12">
          <LetterReveal lines={castle.afterHome} className="space-y-5" lineClassName={bodyLine} />
        </Panel>

        <div className="mt-16">
          <Pillars labels={castle.pillars} />
        </div>

        <motion.p
          className="mx-auto mt-16 max-w-xl text-center font-serif text-2xl italic leading-snug text-ivory text-soft-shadow sm:text-3xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ duration: 1.8 }}
        >
          {castle.closing}
        </motion.p>
        <Poem lines={castle.poem} className="mt-16" />
      </StoryScene>

      {/* 11. A DUA FOR US */}
      <DuaSection />

      {/* 12. THE WORDS I HAVE NOT SAID YET */}
      <FinalConfession />

      {/* 13. OUR STORY IS JUST BEGINNING */}
      <ClosingScreen onRestart={onRestart} />
    </>
  );
}
