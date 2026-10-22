import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { MusicEngine } from '../audio/musicEngine';

interface MusicState {
  playing: boolean;
  volume: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setVolume: (v: number) => void;
  /** Lowers the music a little (used in the final confession). */
  setSoft: (soft: boolean) => void;
  /** If the visitor had music on earlier in this session, start it again (call from a tap). */
  resumeIfWanted: () => void;
}

const noop = () => undefined;
const MusicContext = createContext<MusicState>({
  playing: false,
  volume: 0.6,
  play: noop,
  pause: noop,
  toggle: noop,
  setVolume: noop,
  setSoft: noop,
  resumeIfWanted: noop,
});

const KEY = 'love-story:music';

interface Saved {
  on: boolean;
  volume: number;
}

function load(): Saved {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Saved>;
      return {
        on: parsed.on === true,
        volume: typeof parsed.volume === 'number' ? Math.min(1, Math.max(0, parsed.volume)) : 0.6,
      };
    }
  } catch {
    /* storage unavailable: fall back to defaults */
  }
  return { on: false, volume: 0.6 };
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const engineRef = useRef<MusicEngine | null>(null);
  if (!engineRef.current) engineRef.current = new MusicEngine();
  const engine = engineRef.current;

  const saved = useRef<Saved>(load());
  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(saved.current.volume);

  useEffect(() => {
    engine.setVolume(saved.current.volume);
    void engine.preload();
    const onVisibility = () => engine.setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [engine]);

  const persist = useCallback((patch: Partial<Saved>) => {
    saved.current = { ...saved.current, ...patch };
    try {
      sessionStorage.setItem(KEY, JSON.stringify(saved.current));
    } catch {
      /* ignore */
    }
  }, []);

  const play = useCallback(() => {
    setPlaying(true);
    persist({ on: true });
    void engine.start().catch(() => {
      setPlaying(false);
    });
  }, [engine, persist]);

  const pause = useCallback(() => {
    setPlaying(false);
    persist({ on: false });
    engine.stop();
  }, [engine, persist]);

  const toggle = useCallback(() => {
    if (playing) pause();
    else play();
  }, [playing, play, pause]);

  const setVolume = useCallback(
    (v: number) => {
      setVolumeState(v);
      engine.setVolume(v);
      persist({ volume: v });
    },
    [engine, persist],
  );

  const setSoft = useCallback((soft: boolean) => engine.setSoftness(soft ? 0.55 : 1), [engine]);

  const resumeIfWanted = useCallback(() => {
    if (saved.current.on && !playing) play();
  }, [playing, play]);

  const value = useMemo(
    () => ({ playing, volume, play, pause, toggle, setVolume, setSoft, resumeIfWanted }),
    [playing, volume, play, pause, toggle, setVolume, setSoft, resumeIfWanted],
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export const useMusic = (): MusicState => useContext(MusicContext);
