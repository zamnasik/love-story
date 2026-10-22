import { useState, type CSSProperties } from 'react';
import { Music, Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

/** Music toggle with play / pause and a volume slider. Music is always off until the visitor taps. */
export function MusicPlayer() {
  const { playing, volume, toggle, setVolume } = useMusic();
  const [showVolume, setShowVolume] = useState(false);
  const pct = Math.round(volume * 100);
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="relative flex items-center gap-0.5 rounded-full border border-white/15 bg-midnight/80 p-1 shadow-soft backdrop-blur-md">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause the music' : 'Play the music'}
        className="flex h-10 items-center gap-2 rounded-full px-3 text-ivory transition hover:bg-white/10"
      >
        <Music className="h-5 w-5 text-gold" aria-hidden="true" />
        {playing && (
          <span className="flex h-4 items-end gap-[2px] text-gold" aria-hidden="true">
            <span className="eq-bar" />
            <span className="eq-bar" />
            <span className="eq-bar" />
          </span>
        )}
        <span className="hidden text-sm sm:inline">{playing ? 'Pause' : 'Music'}</span>
        {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
      </button>

      <button
        type="button"
        onClick={() => setShowVolume((v) => !v)}
        aria-expanded={showVolume}
        aria-controls="music-volume"
        aria-label="Show volume control"
        className="flex h-10 w-10 items-center justify-center rounded-full text-ivory transition hover:bg-white/10"
      >
        <VolumeIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      {showVolume && (
        <div
          id="music-volume"
          className="absolute right-0 top-[3.1rem] flex items-center gap-3 rounded-2xl border border-white/15 bg-midnight/90 px-4 py-3 shadow-soft backdrop-blur-md"
        >
          <label htmlFor="music-volume-slider" className="sr-only">
            Music volume
          </label>
          <input
            id="music-volume-slider"
            type="range"
            min={0}
            max={100}
            step={1}
            value={pct}
            onChange={(e) => setVolume(Number(e.target.value) / 100)}
            className="vol"
            style={{ '--fill': `${pct}%` } as CSSProperties}
          />
          <span className="w-9 text-right text-xs tabular-nums text-ivory/80" aria-hidden="true">
            {pct}%
          </span>
        </div>
      )}
    </div>
  );
}
