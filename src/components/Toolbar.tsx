import { RotateCcw, Sparkles } from 'lucide-react';
import { useFx } from '../context/FxContext';
import { MusicPlayer } from './MusicPlayer';

const btn =
  'flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-midnight/80 text-ivory shadow-soft backdrop-blur-md transition hover:bg-white/10';

/** Top-right controls: music, pause visual effects, restart the story. */
export function Toolbar({ onRestart }: { onRestart: () => void }) {
  const { fx, toggleFx } = useFx();
  return (
    <div className="fixed right-3 top-3 z-50 flex items-center gap-2 sm:right-5 sm:top-5" role="toolbar" aria-label="Story controls">
      <MusicPlayer />
      <button
        type="button"
        onClick={toggleFx}
        aria-pressed={!fx}
        aria-label={fx ? 'Pause visual effects' : 'Resume visual effects'}
        title={fx ? 'Pause visual effects' : 'Resume visual effects'}
        className={`${btn} ${fx ? '' : 'text-gold'}`}
      >
        <Sparkles className="h-5 w-5" aria-hidden="true" />
      </button>
      <button type="button" onClick={onRestart} aria-label="Restart the story" title="Restart the story" className={btn}>
        <RotateCcw className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
