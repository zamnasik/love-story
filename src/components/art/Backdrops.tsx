import { useId, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
import { BlossomBranch, BlossomShape, House, LeafShape, Moon, PalmTree, RoundTree, StemFlower } from './shapes';
import { mulberry32 } from '../../lib/random';

export interface BackdropProps {
  /** 0 → 1 while the scene scrolls through the screen (drives the parallax). */
  progress: MotionValue<number>;
}

/* ------------------------------------------------------------------ helpers */

function useUid(): string {
  return useId().replace(/[^a-zA-Z0-9]/g, '');
}

/** A layer that drifts at its own speed while scrolling: this is the parallax. */
function Layer({
  progress,
  depth = 0.3,
  children,
  className = '',
  style,
}: {
  progress: MotionValue<number>;
  depth?: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  const y = useTransform(progress, [0, 1], reduce ? ['0%', '0%'] : [`${-depth * 7}%`, `${depth * 7}%`]);
  return (
    <motion.div style={{ ...style, y }} className={`absolute inset-x-0 -inset-y-[8%] ${className}`}>
      {children}
    </motion.div>
  );
}

function Sky({ gradient }: { gradient: string }) {
  return <div className="absolute inset-0" style={{ background: gradient }} />;
}

function Art({ children, align = 'xMidYMax' }: { children: ReactNode; align?: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio={`${align} slice`}
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const swayStyle: CSSProperties = { transformBox: 'fill-box', transformOrigin: '50% 100%' };

/* ------------------------------------------------------------------ INTRO: distant glowing landscape */

export function IntroLandscape({ progress }: BackdropProps) {
  const uid = useUid();
  const rand = mulberry32(11);
  const lights = Array.from({ length: 46 }, (_, i) => ({
    x: 120 + rand() * 1360,
    y: 668 + rand() * 62,
    r: 1.4 + rand() * 1.8,
    d: 2 + rand() * 4,
    k: i,
  }));
  return (
    <>
      <Sky gradient="linear-gradient(to bottom, #0a0e26 0%, #10152F 42%, #1a2250 78%, #2a3166 100%)" />
      <Layer progress={progress} depth={0.2}>
        <Art>
          <defs>
            <linearGradient id={`${uid}h`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#E9C77B" stopOpacity="0" />
              <stop offset="1" stopColor="#F4B9C8" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          <rect x="0" y="560" width="1600" height="340" fill={`url(#${uid}h)`} />
          <path d="M0 690 C 220 640, 420 660, 640 690 S 1020 720, 1240 670 S 1500 650, 1600 680 L1600 900 L0 900Z" fill="#1b2352" />
        </Art>
      </Layer>
      <Layer progress={progress} depth={0.45}>
        <Art>
          <path d="M0 740 C 260 700, 520 730, 800 750 S 1260 770, 1600 720 L1600 900 L0 900Z" fill="#131a42" />
          {lights.map((l) => (
            <circle
              key={l.k}
              cx={l.x}
              cy={l.y + 30}
              r={l.r}
              fill="#FFD98A"
              className="window-flicker"
              style={{ ['--delay' as string]: `${l.d}s`, filter: 'drop-shadow(0 0 4px rgba(255,217,138,.9))' }}
            />
          ))}
          <path d="M0 810 C 300 770, 560 800, 820 820 S 1300 830, 1600 790 L1600 900 L0 900Z" fill="#0d1236" />
        </Art>
      </Layer>
    </>
  );
}

/* ------------------------------------------------------------------ 2. VILLAGE AT SUNRISE */

export function VillageSunrise({ progress }: BackdropProps) {
  const uid = useUid();
  return (
    <>
      <Sky gradient="linear-gradient(to bottom, #1f2757 0%, #5b4f86 36%, #e59a7a 64%, #ffd49a 84%, #ffe9b8 100%)" />
      <Layer progress={progress} depth={0.1}>
        <Art>
          <defs>
            <radialGradient id={`${uid}s`} cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#FFF3C9" stopOpacity="0.95" />
              <stop offset="0.35" stopColor="#FFD98A" stopOpacity="0.55" />
              <stop offset="1" stopColor="#FFD98A" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="800" cy="560" r="420" fill={`url(#${uid}s)`} />
          <circle cx="800" cy="566" r="64" fill="#FFF1C2" />
        </Art>
      </Layer>
      <Layer progress={progress} depth={0.25}>
        <Art>
          <path d="M0 560 C 200 500, 360 520, 520 560 S 820 604, 1000 540 S 1380 500, 1600 560 L1600 900 L0 900Z" fill="#6c78a0" opacity="0.8" />
        </Art>
      </Layer>
      <Layer progress={progress} depth={0.45}>
        <Art>
          <path d="M0 650 C 180 596, 380 616, 560 656 S 900 696, 1120 636 S 1450 606, 1600 656 L1600 900 L0 900Z" fill="#41625a" />
          <House x={300} base={668} w={64} wall="#d9c2a0" roof="#8a4a3c" />
          <House x={470} base={682} w={52} wall="#cfb48f" roof="#7a4136" />
          <House x={1130} base={656} w={60} wall="#d8c0a0" roof="#8a4a3c" />
          <House x={1290} base={640} w={70} wall="#cdb28c" roof="#7a4136" lit={false} />
          <PalmTree x={240} base={676} h={170} color="#2f5445" />
          <PalmTree x={920} base={700} h={150} color="#2f5445" />
          <PalmTree x={1460} base={650} h={180} color="#2f5445" />
          <RoundTree x={640} base={700} h={90} canopy="#35584d" />
        </Art>
      </Layer>
      <Layer progress={progress} depth={0.75}>
        <Art>
          <path d="M0 770 C 220 718, 460 748, 700 778 S 1100 808, 1320 748 S 1520 728, 1600 756 L1600 900 L0 900Z" fill="#2a4540" />
          <path d="M800 900 C 770 850, 850 820, 810 790" stroke="#d9b87a" strokeWidth="18" fill="none" strokeLinecap="round" opacity="0.8" />
          <PalmTree x={110} base={790} h={290} color="#1d3830" />
          <PalmTree x={1520} base={780} h={270} color="#1d3830" />
          {Array.from({ length: 26 }, (_, i) => (
            <path key={i} d={`M${40 + i * 62} 900 q 4 -34 14 -46`} stroke="#1d3830" strokeWidth="5" fill="none" strokeLinecap="round" />
          ))}
        </Art>
      </Layer>
    </>
  );
}

/* ------------------------------------------------------------------ 3. CODING DESK */

export function DeskScene({ progress }: BackdropProps) {
  const uid = useUid();
  const code: Array<[number, number, string]> = [
    [0, 150, '#F4B9C8'],
    [24, 210, '#E9C77B'],
    [24, 120, '#A6B69B'],
    [48, 260, '#9fb4ff'],
    [48, 90, '#F4B9C8'],
    [72, 180, '#A6B69B'],
    [72, 130, '#E9C77B'],
    [96, 230, '#9fb4ff'],
    [120, 150, '#F4B9C8'],
    [120, 100, '#A6B69B'],
    [144, 200, '#E9C77B'],
    [168, 110, '#9fb4ff'],
    [168, 160, '#F4B9C8'],
    [192, 240, '#A6B69B'],
  ];
  return (
    <>
      <Sky gradient="linear-gradient(to bottom, #0b0e22 0%, #151a38 55%, #2a2038 100%)" />
      <Layer progress={progress} depth={0.15}>
        <Art>
          <defs>
            <linearGradient id={`${uid}w`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0f1740" />
              <stop offset="1" stopColor="#26336e" />
            </linearGradient>
            <radialGradient id={`${uid}m`} cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#6f8cff" stopOpacity="0.45" />
              <stop offset="1" stopColor="#6f8cff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="120" y="150" width="340" height="380" rx="8" fill={`url(#${uid}w)`} stroke="#3a3350" strokeWidth="10" />
          <line x1="290" y1="150" x2="290" y2="530" stroke="#3a3350" strokeWidth="6" />
          <line x1="120" y1="340" x2="460" y2="340" stroke="#3a3350" strokeWidth="6" />
          {[
            [180, 210],
            [380, 200],
            [250, 290],
            [410, 300],
            [170, 410],
            [350, 450],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" fill="#fff7eb" opacity="0.85" />
          ))}
          <path d="M1190 120 q 60 -30 120 0" stroke="#E9C77B" strokeWidth="2" fill="none" opacity="0.7" />
          {Array.from({ length: 9 }, (_, i) => (
            <circle key={i} cx={1190 + i * 15} cy={120 + Math.sin(i * 0.9) * -10 + 16} r="4" fill="#FFD98A" className="window-flicker" style={{ ['--delay' as string]: `${i * 0.4}s` }} />
          ))}
          <circle cx="800" cy="470" r="360" fill={`url(#${uid}m)`} />
        </Art>
      </Layer>
      <Layer progress={progress} depth={0.4}>
        <Art>
          {/* main monitor */}
          <rect x="560" y="310" width="480" height="300" rx="14" fill="#0d1230" stroke="#3b4272" strokeWidth="6" />
          <g transform="translate(596 346)">
            {code.map(([y, w, c], i) => (
              <rect key={i} x={i % 3 === 0 ? 0 : 26} y={y} width={w} height="9" rx="4.5" fill={c} opacity="0.85" />
            ))}
          </g>
          <rect x="560" y="310" width="480" height="300" rx="14" fill="#6f8cff" opacity="0.06" />
          <rect x="780" y="610" width="40" height="42" fill="#2a2f55" />
          <ellipse cx="800" cy="656" rx="90" ry="10" fill="#1f2447" />
          {/* second monitor */}
          <rect x="1090" y="380" width="250" height="180" rx="10" fill="#0d1230" stroke="#3b4272" strokeWidth="5" />
          <polyline points="1110,520 1150,480 1190,500 1230,440 1270,470 1315,420" stroke="#A6B69B" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="1200" y="560" width="30" height="40" fill="#2a2f55" />
          {/* desk */}
          <rect x="0" y="652" width="1600" height="48" fill="#4a3338" />
          <rect x="0" y="700" width="1600" height="200" fill="#2a1f27" />
          <rect x="0" y="652" width="1600" height="6" fill="#6b4a4a" opacity="0.8" />
        </Art>
      </Layer>
      <Layer progress={progress} depth={0.65}>
        <Art>
          {/* circuit board */}
          <polygon points="270,690 520,690 566,640 316,640" fill="#2d5b49" stroke="#A6B69B" strokeWidth="2" />
          <g stroke="#E9C77B" strokeWidth="2" fill="none" opacity="0.9">
            <path d="M310 664 H 420 L 440 650 H 520" />
            <path d="M330 680 H 400 L 420 668 H 500" />
            <path d="M350 650 V 666 H 380" />
          </g>
          <polygon points="400,676 440,676 452,662 412,662" fill="#1c1c2e" />
          <circle cx="480" cy="662" r="4" fill="#F4B9C8" className="window-flicker" />
          <circle cx="352" cy="672" r="3" fill="#A6B69B" className="window-flicker" style={{ ['--delay' as string]: '1.5s' }} />
          {/* small robot */}
          <g>
            <line x1="1180" y1="498" x2="1180" y2="470" stroke="#9aa3c4" strokeWidth="4" />
            <circle cx="1180" cy="466" r="7" fill="#E9C77B" className="window-flicker" />
            <rect x="1150" y="498" width="60" height="50" rx="14" fill="#dfe5f4" />
            <circle cx="1170" cy="522" r="6" fill="#202B54" />
            <circle cx="1190" cy="522" r="6" fill="#202B54" />
            <circle cx="1170" cy="522" r="2.5" fill="#A6B69B" />
            <circle cx="1190" cy="522" r="2.5" fill="#A6B69B" />
            <rect x="1140" y="552" width="80" height="84" rx="16" fill="#c9d1e8" />
            <rect x="1162" y="574" width="36" height="22" rx="6" fill="#202B54" />
            <circle cx="1172" cy="585" r="3" fill="#F4B9C8" />
            <circle cx="1188" cy="585" r="3" fill="#E9C77B" />
            <rect x="1118" y="566" width="20" height="46" rx="10" fill="#b4bdd9" />
            <rect x="1222" y="566" width="20" height="46" rx="10" fill="#b4bdd9" />
            <rect x="1150" y="634" width="22" height="18" rx="5" fill="#9aa3c4" />
            <rect x="1188" y="634" width="22" height="18" rx="5" fill="#9aa3c4" />
          </g>
          {/* lamp */}
          <ellipse cx="470" cy="652" rx="46" ry="8" fill="#241b26" />
          <path d="M470 650 L 452 560 L 540 480" stroke="#bfa66a" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="518,470 574,500 552,516 500,486" fill="#e0c37a" />
          <polygon points="548,508 700,652 380,652" fill="#FFD98A" opacity="0.14" />
          {/* tea cup + steam */}
          <path d="M930 640 h 60 v 6 a 30 26 0 0 1 -60 0 z" fill="#efe3d0" />
          <path d="M990 646 q 18 0 14 14 q -4 10 -18 8" stroke="#efe3d0" strokeWidth="5" fill="none" />
          <path d="M950 628 q 8 -14 0 -26 M968 630 q 8 -14 0 -26" stroke="#fff7eb" strokeOpacity="0.35" strokeWidth="3" fill="none" strokeLinecap="round" />
        </Art>
      </Layer>
    </>
  );
}

/* ------------------------------------------------------------------ plain night sky (scenes 4, 8, 9) */

export function NightSky({
  progress,
  hills = true,
  tone = 'deep',
}: BackdropProps & { hills?: boolean; tone?: 'deep' | 'blossom' }) {
  const gradient =
    tone === 'blossom'
      ? 'linear-gradient(to bottom, #090c24 0%, #10152F 40%, #1d2556 78%, #3a2f63 100%)'
      : 'linear-gradient(to bottom, #090c24 0%, #10152F 45%, #202B54 100%)';
  return (
    <>
      <Sky gradient={gradient} />
      {hills && (
        <Layer progress={progress} depth={0.4}>
          <Art>
            <path d="M0 760 C 280 710, 520 750, 820 770 S 1300 780, 1600 730 L1600 900 L0 900Z" fill="#0e1336" opacity="0.9" />
            <path d="M0 830 C 300 790, 600 820, 900 836 S 1400 840, 1600 806 L1600 900 L0 900Z" fill="#0a0e2a" />
          </Art>
        </Layer>
      )}
    </>
  );
}

/** Scene 4: the desk fades into a field of stars as you scroll. */
export function DeskToStars({ progress }: BackdropProps) {
  const opacity = useTransform(progress, [0.05, 0.4], [1, 0]);
  return (
    <>
      <NightSky progress={progress} hills={false} />
      <motion.div style={{ opacity }} className="absolute inset-0">
        <DeskScene progress={progress} />
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ 5. GARDEN AT SUNSET */

export function GardenSunset({ progress }: BackdropProps) {
  const uid = useUid();
  const rand = mulberry32(5);
  const blossoms = Array.from({ length: 36 }, (_, i) => ({
    x: 120 + rand() * 360,
    y: 330 + rand() * 170,
    s: 0.6 + rand() * 0.7,
    t: i % 3 === 0 ? '#FBE3E8' : '#F4B9C8',
  }));
  const blossomsR = Array.from({ length: 30 }, (_, i) => ({
    x: 1120 + rand() * 360,
    y: 350 + rand() * 160,
    s: 0.6 + rand() * 0.7,
    t: i % 3 === 0 ? '#FBE3E8' : '#F4B9C8',
  }));
  return (
    <>
      <Sky gradient="linear-gradient(to bottom, #2d2358 0%, #7b3f7a 28%, #d9657f 54%, #f5a86b 76%, #ffd9a0 100%)" />
      <Layer progress={progress} depth={0.1}>
        <Art>
          <defs>
            <radialGradient id={`${uid}g`} cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#FFE7B0" stopOpacity="0.9" />
              <stop offset="1" stopColor="#FFB27A" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="800" cy="610" r="360" fill={`url(#${uid}g)`} />
          <circle cx="800" cy="620" r="58" fill="#FFF0C0" />
        </Art>
      </Layer>
      <Layer progress={progress} depth={0.3}>
        <Art>
          <path d="M0 620 C 240 560, 460 590, 700 630 S 1120 660, 1340 600 S 1520 590, 1600 610 L1600 900 L0 900Z" fill="#7a4a86" opacity="0.85" />
          <path d="M0 700 C 240 650, 520 680, 800 710 S 1300 730, 1600 680 L1600 900 L0 900Z" fill="#5b3a6c" />
        </Art>
      </Layer>
      <Layer progress={progress} depth={0.5}>
        <Art>
          {/* left blossom tree */}
          <path d="M300 760 C 296 640, 310 560, 280 470" stroke="#3b2630" strokeWidth="18" fill="none" strokeLinecap="round" />
          <path d="M300 640 C 340 600, 380 570, 420 520" stroke="#3b2630" strokeWidth="10" fill="none" strokeLinecap="round" />
          <circle cx="300" cy="420" r="150" fill="#d97a98" opacity="0.9" />
          <circle cx="210" cy="470" r="100" fill="#e58fa8" opacity="0.9" />
          <circle cx="400" cy="480" r="110" fill="#e58fa8" opacity="0.9" />
          {blossoms.map((b, i) => (
            <BlossomShape key={i} x={b.x} y={b.y} s={b.s} tone={b.t} rot={i * 37} />
          ))}
          {/* right blossom tree */}
          <path d="M1300 780 C 1306 660, 1290 580, 1320 490" stroke="#3b2630" strokeWidth="18" fill="none" strokeLinecap="round" />
          <circle cx="1300" cy="440" r="150" fill="#d97a98" opacity="0.9" />
          <circle cx="1220" cy="490" r="95" fill="#e58fa8" opacity="0.9" />
          <circle cx="1400" cy="500" r="105" fill="#e58fa8" opacity="0.9" />
          {blossomsR.map((b, i) => (
            <BlossomShape key={i} x={b.x} y={b.y} s={b.s} tone={b.t} rot={i * 53} />
          ))}
        </Art>
      </Layer>
      <Layer progress={progress} depth={0.8}>
        <Art>
          <path d="M0 800 C 260 760, 560 790, 820 806 S 1300 812, 1600 770 L1600 900 L0 900Z" fill="#2d3f3c" />
          {[80, 170, 260, 520, 640, 980, 1090, 1260, 1400, 1500].map((x, i) => (
            <g key={x} className="sway" style={{ ...swayStyle, ['--d' as string]: `${5 + (i % 4)}s`, ['--delay' as string]: `${i * 0.3}s` }}>
              <StemFlower x={x} base={880} h={120 + (i % 3) * 40} s={1.05 + (i % 2) * 0.3} tone={i % 2 ? '#FBE3E8' : '#F4B9C8'} sway={i % 2 ? 14 : -14} />
            </g>
          ))}
        </Art>
      </Layer>
    </>
  );
}

/* ------------------------------------------------------------------ 6. WARM ROOM WITH WINDOW */

export function RoomWindow({ progress }: BackdropProps) {
  const uid = useUid();
  return (
    <>
      <Sky gradient="linear-gradient(to bottom, #2a1d25 0%, #4a3030 50%, #6b4638 100%)" />
      <Layer progress={progress} depth={0.15}>
        <Art>
          <defs>
            <linearGradient id={`${uid}v`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffe9b8" />
              <stop offset="1" stopColor="#f7a96b" />
            </linearGradient>
            <linearGradient id={`${uid}b`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFE7A8" stopOpacity="0.55" />
              <stop offset="1" stopColor="#FFD98A" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* window */}
          <rect x="560" y="110" width="480" height="520" rx="6" fill={`url(#${uid}v)`} stroke="#4a3226" strokeWidth="16" />
          <circle cx="800" cy="520" r="120" fill="#FFF0C0" opacity="0.6" />
          <path d="M560 560 C 650 510, 760 530, 840 560 S 980 570, 1040 540 L1040 630 L560 630Z" fill="#8aa06a" opacity="0.9" />
          <RoundTree x={700} base={570} h={120} canopy="#5f8a5a" />
          <line x1="800" y1="110" x2="800" y2="630" stroke="#4a3226" strokeWidth="10" />
          <line x1="560" y1="360" x2="1040" y2="360" stroke="#4a3226" strokeWidth="10" />
          {/* curtains */}
          <path d="M470 90 C 520 200, 500 400, 540 660 L 440 660 C 420 400, 440 200, 420 90Z" fill="#a6b69b" opacity="0.55" />
          <path d="M1130 90 C 1080 200, 1100 400, 1060 660 L 1160 660 C 1180 400, 1160 200, 1180 90Z" fill="#a6b69b" opacity="0.55" />
          {/* framed botanical: left */}
          <rect x="150" y="230" width="230" height="300" rx="6" fill="#fff0d8" stroke="#3a2a24" strokeWidth="12" />
          <path d="M265 500 C 260 440, 270 380, 262 300" stroke="#6f8f66" strokeWidth="4" fill="none" />
          {[320, 350, 380, 410, 440, 470].map((y, i) => (
            <LeafShape key={y} x={265} y={y} s={0.9} rot={i % 2 ? -150 : -30} fill="#7E9A76" />
          ))}
          {/* framed botanical: right */}
          <rect x="1220" y="260" width="210" height="270" rx="6" fill="#fff0d8" stroke="#3a2a24" strokeWidth="12" />
          <path d="M1325 500 C 1320 450, 1332 400, 1326 330" stroke="#6f8f66" strokeWidth="4" fill="none" />
          <BlossomShape x={1326} y={324} s={1.3} />
          <BlossomShape x={1290} y={386} s={0.9} tone="#FBE3E8" />
          <LeafShape x={1326} y={440} s={0.9} rot={-30} fill="#7E9A76" />
          <LeafShape x={1326} y={470} s={0.9} rot={-150} fill="#7E9A76" />
        </Art>
      </Layer>
      <Layer progress={progress} depth={0.35}>
        <Art>
          <polygon points="600,630 1000,630 1380,900 220,900" fill={`url(#${uid}b)`} />
        </Art>
      </Layer>
      <Layer progress={progress} depth={0.7}>
        <Art>
          <rect x="0" y="690" width="1600" height="210" fill="#5a3a2c" />
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1={i * 140} y1="690" x2={i * 140 - 120 + (i % 2) * 30} y2="900" stroke="#3a261f" strokeWidth="3" opacity="0.7" />
          ))}
          <rect x="0" y="686" width="1600" height="8" fill="#3a261f" />
          {/* small table with a vase */}
          <rect x="1180" y="740" width="200" height="14" rx="4" fill="#3a261f" />
          <rect x="1200" y="754" width="12" height="146" fill="#3a261f" />
          <rect x="1350" y="754" width="12" height="146" fill="#3a261f" />
          <path d="M1250 740 C 1236 700, 1250 680, 1262 660 L 1298 660 C 1310 680, 1324 700, 1310 740Z" fill="#e8d6bd" />
          <StemFlower x={1268} base={664} h={130} s={0.9} sway={-10} />
          <StemFlower x={1292} base={664} h={100} s={0.8} tone="#FBE3E8" sway={12} />
        </Art>
      </Layer>
    </>
  );
}

/* ------------------------------------------------------------------ MOONLIT GARDEN / LANDSCAPE (scenes 7, 12) */

export function MoonlitLandscape({ progress, bloom = false }: BackdropProps & { bloom?: boolean }) {
  const uid = useUid();
  const rand = mulberry32(bloom ? 91 : 41);
  const glow = Array.from({ length: bloom ? 34 : 18 }, (_, i) => ({
    x: 60 + rand() * 1480,
    y: 780 + rand() * 90,
    s: 0.6 + rand() * 0.8,
    i,
  }));
  return (
    <>
      <Sky gradient="linear-gradient(to bottom, #080b22 0%, #0f1640 40%, #1d2a62 75%, #2e3b78 100%)" />
      <Layer progress={progress} depth={0.2}>
        <Art>
          <defs>
            <radialGradient id={`${uid}r`} cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#E9C77B" stopOpacity="0.55" />
              <stop offset="1" stopColor="#E9C77B" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${uid}l`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2a3a78" />
              <stop offset="1" stopColor="#141c48" />
            </linearGradient>
          </defs>
          <path d="M0 640 C 220 590, 440 620, 660 650 S 1060 680, 1280 620 S 1500 610, 1600 630 L1600 900 L0 900Z" fill="#16204f" />
          <rect x="0" y="690" width="1600" height="120" fill={`url(#${uid}l)`} />
          <ellipse cx="800" cy="752" rx="54" ry="62" fill={`url(#${uid}r)`} />
          <path d="M600 720 H 1000 M650 744 H 950 M700 768 H 900" stroke="#E9C77B" strokeOpacity="0.25" strokeWidth="2" />
        </Art>
      </Layer>
      <Layer progress={progress} depth={0.55}>
        <Art>
          <path d="M0 760 C 260 716, 520 746, 800 770 S 1280 786, 1600 736 L1600 900 L0 900Z" fill="#0f1642" />
          <RoundTree x={180} base={780} h={130} canopy="#0c1238" trunk="#0a0f2e" />
          <RoundTree x={1440} base={776} h={150} canopy="#0c1238" trunk="#0a0f2e" />
        </Art>
      </Layer>
      <Layer progress={progress} depth={0.85}>
        <Art>
          <path d="M0 830 C 300 796, 600 824, 900 838 S 1400 842, 1600 810 L1600 900 L0 900Z" fill="#090d2a" />
          {glow.map((g) => (
            <g key={g.i} className="sway" style={{ ...swayStyle, ['--d' as string]: `${6 + (g.i % 4)}s`, ['--delay' as string]: `${(g.i % 7) * 0.4}s` }}>
              <path d={`M${g.x} 900 q 3 -28 ${g.i % 2 ? 8 : -8} -${40 * g.s}`} stroke="#27407a" strokeWidth="3" fill="none" strokeLinecap="round" />
              <BlossomShape x={g.x + (g.i % 2 ? 8 : -8)} y={880 - 40 * g.s} s={0.55 * g.s + 0.25} tone={g.i % 3 === 0 ? '#FBE3E8' : '#F4B9C8'} rot={g.i * 41} />
            </g>
          ))}
        </Art>
      </Layer>
    </>
  );
}

/** Scene 7: the warm room slowly becomes a moonlit garden while you read. */
export function RoomToMoonGarden({ progress }: BackdropProps) {
  const opacity = useTransform(progress, [0.3, 0.7], [1, 0]);
  return (
    <>
      <MoonlitLandscape progress={progress} />
      <motion.div style={{ opacity }} className="absolute inset-0">
        <RoomWindow progress={progress} />
      </motion.div>
    </>
  );
}

/* ------------------------------------------------------------------ 8. TWO STARS TOWARDS ONE MOON */

export function TwoStarsSky({ progress }: BackdropProps) {
  const reduce = useReducedMotion();
  const left = useTransform(progress, [0.2, 0.8], reduce ? ['30vw', '30vw'] : ['0vw', '38vw']);
  const right = useTransform(progress, [0.2, 0.8], reduce ? ['-30vw', '-30vw'] : ['0vw', '-38vw']);
  const halo = useTransform(progress, [0.6, 0.85], [0, 1]);
  return (
    <>
      <NightSky progress={progress} />
      <Moon className="absolute left-1/2 top-[5%] w-20 -translate-x-1/2 sm:w-28" />
      <motion.div
        style={{ opacity: halo }}
        className="absolute left-1/2 top-[11%] h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-3xl"
      />
      <motion.div style={{ x: left }} className="absolute left-[6%] top-[11%]">
        <GlowStar />
      </motion.div>
      <motion.div style={{ x: right }} className="absolute right-[6%] top-[11%]">
        <GlowStar />
      </motion.div>
    </>
  );
}

function GlowStar() {
  return (
    <div className="relative h-5 w-5">
      <div className="absolute inset-0 rounded-full bg-ivory shadow-[0_0_18px_6px_rgba(244,185,200,0.7)]" />
      <div className="absolute left-1/2 top-1/2 h-px w-12 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-rose to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-12 w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-rose to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ 9. BLOSSOM NIGHT */

export function BlossomNight({ progress }: BackdropProps) {
  return (
    <>
      <NightSky progress={progress} tone="blossom" />
      <Layer progress={progress} depth={0.5} className="pointer-events-none">
        <BlossomBranch className="absolute -left-6 top-[4%] w-[52%] max-w-[520px] opacity-70 sm:w-[62%] sm:opacity-90" />
        <BlossomBranch flip className="absolute -right-6 top-[12%] w-[46%] max-w-[480px] opacity-60 sm:w-[56%] sm:opacity-80" />
      </Layer>
    </>
  );
}

/* ------------------------------------------------------------------ 10 & 13. CASTLE ON A HILL AT SUNRISE */

function Castle({ top, k }: { top: number; k: number }) {
  const win = (x: number, y: number) => <rect key={`${x}-${y}`} x={x} y={y} width="6" height="12" rx="3" fill="#FFD98A" className="window-flicker" style={{ ['--delay' as string]: `${(x % 5) * 0.6}s` }} />;
  return (
    <g transform={`translate(800 ${top}) scale(${k}) translate(-800 -556)`}>
      {/* back towers */}
      <rect x="726" y="470" width="36" height="86" fill="#d9c9d8" />
      <polygon points="720,470 744,420 768,470" fill="#7e5a8c" />
      <rect x="838" y="470" width="36" height="86" fill="#d9c9d8" />
      <polygon points="832,470 856,420 880,470" fill="#7e5a8c" />
      {/* keep */}
      <rect x="766" y="440" width="68" height="116" fill="#eadcea" />
      {[766, 780, 794, 808, 822].map((x) => (
        <rect key={x} x={x} y="430" width="10" height="12" fill="#eadcea" />
      ))}
      <polygon points="780,440 800,372 820,440" fill="#c76f8c" />
      <line x1="800" y1="372" x2="800" y2="346" stroke="#fff7eb" strokeWidth="2" />
      <polygon points="800,346 822,354 800,362" fill="#E9C77B" />
      {/* outer wall */}
      <rect x="690" y="508" width="220" height="48" fill="#d5c4d5" />
      {[690, 704, 718, 884, 898].map((x) => (
        <rect key={x} x={x} y="500" width="12" height="10" fill="#d5c4d5" />
      ))}
      <path d="M780 556 v -26 a 20 20 0 0 1 40 0 v 26Z" fill="#6a4a5c" />
      {win(786, 462)}
      {win(808, 462)}
      {win(738, 488)}
      {win(850, 488)}
      {win(710, 524)}
      {win(884, 524)}
    </g>
  );
}

export function CastleSunrise({ progress, variant = 'near' }: BackdropProps & { variant?: 'near' | 'distant' }) {
  const uid = useUid();
  const near = variant === 'near';
  const top = near ? 556 : 640;
  const k = near ? 1 : 0.52;
  const rand = mulberry32(77);
  const dots = Array.from({ length: 34 }, (_, i) => ({
    x: 140 + rand() * 1320,
    y: 770 + rand() * 110,
    i,
  }));
  return (
    <>
      <Sky gradient="linear-gradient(to bottom, #27346a 0%, #6d6aa3 30%, #f0a98a 62%, #ffd6a0 82%, #ffeec7 100%)" />
      <Layer progress={progress} depth={0.1}>
        <Art>
          <defs>
            <radialGradient id={`${uid}s`} cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#FFF3C9" stopOpacity="0.95" />
              <stop offset="0.4" stopColor="#FFD98A" stopOpacity="0.5" />
              <stop offset="1" stopColor="#FFD98A" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${uid}h`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7fae6c" />
              <stop offset="1" stopColor="#365f45" />
            </linearGradient>
          </defs>
          <circle cx="800" cy="520" r="440" fill={`url(#${uid}s)`} />
          <circle cx="1120" cy="560" r="52" fill="#FFF1C2" opacity="0.9" />
        </Art>
      </Layer>
      <Layer progress={progress} depth={0.25}>
        <Art>
          <path d="M0 600 C 240 540, 460 580, 700 610 S 1160 640, 1360 590 S 1520 580, 1600 600 L1600 900 L0 900Z" fill="#8f94c0" opacity="0.8" />
          {!near && <Castle top={top} k={k} />}
        </Art>
      </Layer>
      <Layer progress={progress} depth={0.5}>
        <Art>
          {near ? (
            <>
              <path d="M200 900 C 420 640, 660 560, 800 556 C 940 560, 1180 640, 1400 900Z" fill={`url(#${uid}h)`} />
              <Castle top={top} k={k} />
              <path d="M760 900 C 650 850, 930 810, 790 760 C 700 726, 880 690, 800 640 C 770 612, 800 590, 800 580" stroke="#f3d9a4" strokeWidth="24" fill="none" strokeLinecap="round" opacity="0.9" />
              <RoundTree x={440} base={790} h={150} canopy="#3a7350" />
              <RoundTree x={1180} base={780} h={160} canopy="#3a7350" />
              <RoundTree x={560} base={730} h={90} canopy="#46845a" />
              <RoundTree x={1050} base={720} h={95} canopy="#46845a" />
            </>
          ) : (
            <>
              <path d="M0 700 C 260 650, 560 676, 800 690 S 1300 700, 1600 660 L1600 900 L0 900Z" fill={`url(#${uid}h)`} />
              <RoundTree x={300} base={730} h={120} canopy="#3a7350" />
              <RoundTree x={1320} base={724} h={130} canopy="#3a7350" />
            </>
          )}
        </Art>
      </Layer>
      <Layer progress={progress} depth={0.8}>
        <Art>
          <path d="M0 810 C 280 770, 580 800, 840 816 S 1320 824, 1600 780 L1600 900 L0 900Z" fill="#2d5640" />
          {dots.map((d) => (
            <circle key={d.i} cx={d.x} cy={d.y} r="4" fill={d.i % 3 ? '#F4B9C8' : '#FFF7EB'} opacity="0.9" />
          ))}
          {[110, 240, 520, 1020, 1210, 1360, 1500].map((x, i) => (
            <g key={x} className="sway" style={{ ...swayStyle, ['--d' as string]: `${5 + (i % 3)}s`, ['--delay' as string]: `${i * 0.35}s` }}>
              <StemFlower x={x} base={890} h={110 + (i % 3) * 36} s={1.1} tone={i % 2 ? '#FBE3E8' : '#F4B9C8'} sway={i % 2 ? 12 : -12} />
            </g>
          ))}
        </Art>
      </Layer>
    </>
  );
}

/* ------------------------------------------------------------------ 11. MOSQUE AT SUNSET */

export function MosqueSunset({ progress }: BackdropProps) {
  const uid = useUid();
  const minaret = (x: number) => (
    <g>
      <rect x={x - 11} y="430" width="22" height="300" fill="#1a1433" />
      <rect x={x - 17} y="470" width="34" height="9" fill="#1a1433" />
      <rect x={x - 15} y="440" width="30" height="7" fill="#1a1433" />
      <polygon points={`${x - 14},430 ${x},384 ${x + 14},430`} fill="#1a1433" />
      <line x1={x} y1="384" x2={x} y2="364" stroke="#1a1433" strokeWidth="3" />
      <circle cx={x} cy="360" r="6" fill="#E9C77B" />
      <rect x={x - 3} y="530" width="6" height="14" rx="3" fill="#FFD98A" opacity="0.85" />
    </g>
  );
  return (
    <>
      <Sky gradient="linear-gradient(to bottom, #231a48 0%, #6b3a73 30%, #c2607a 56%, #f2a463 78%, #ffd596 100%)" />
      <Layer progress={progress} depth={0.1}>
        <Art>
          <defs>
            <radialGradient id={`${uid}s`} cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#FFE7B0" stopOpacity="0.85" />
              <stop offset="1" stopColor="#FFB27A" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="800" cy="700" r="420" fill={`url(#${uid}s)`} />
        </Art>
      </Layer>
      <Moon className="absolute right-[14%] top-[10%] w-20 sm:w-28" />
      <Layer progress={progress} depth={0.4}>
        <Art>
          <path d="M0 740 C 300 710, 600 730, 800 740 S 1300 730, 1600 710 L1600 900 L0 900Z" fill="#2a1d4a" opacity="0.9" />
          {minaret(560)}
          {minaret(1040)}
          {/* main dome and hall */}
          <rect x="640" y="640" width="320" height="100" fill="#1a1433" />
          <path d="M660 640 C 660 520, 940 520, 940 640 Z" fill="#1a1433" />
          <line x1="800" y1="540" x2="800" y2="510" stroke="#1a1433" strokeWidth="4" />
          <circle cx="800" cy="504" r="7" fill="#E9C77B" />
          <path d="M600 700 C 600 660, 660 660, 660 700 Z" fill="#1a1433" />
          <path d="M940 700 C 940 660, 1000 660, 1000 700 Z" fill="#1a1433" />
          {[690, 740, 800, 860, 910].map((x) => (
            <path key={x} d={`M${x - 12} 730 v -34 a 12 12 0 0 1 24 0 v 34Z`} fill="#FFD98A" opacity="0.75" className="window-flicker" style={{ ['--delay' as string]: `${x % 4}s` }} />
          ))}
        </Art>
      </Layer>
      <Layer progress={progress} depth={0.75}>
        <Art>
          <path d="M0 800 C 300 772, 600 796, 860 808 S 1320 812, 1600 782 L1600 900 L0 900Z" fill="#150f2c" />
          <PalmTree x={150} base={820} h={250} color="#150f2c" />
          <PalmTree x={1470} base={816} h={230} color="#150f2c" />
        </Art>
      </Layer>
    </>
  );
}
