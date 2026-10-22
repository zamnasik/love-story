import { AmbientSynth } from './ambientSynth';
import { MUSIC_FILE, assetUrl } from '../content/assets';

type ACtor = typeof AudioContext;

function getAudioContextCtor(): ACtor | undefined {
  if (typeof window === 'undefined') return undefined;
  const w = window as unknown as { AudioContext?: ACtor; webkitAudioContext?: ACtor };
  return w.AudioContext ?? w.webkitAudioContext;
}

/**
 * Plays public/audio/romantic-piano.mp3 when it exists, otherwise a built-in ambient synth.
 * Everything goes through one master gain node so volume and fades work on every device
 * (including iPhone, which ignores HTMLAudioElement.volume).
 */
export class MusicEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private el: HTMLAudioElement | null = null;
  private synth: AmbientSynth | null = null;
  private fileOk: boolean | null = null;
  private wantPlaying = false;
  private volume = 0.6;
  private soft = 1;
  private stopTimer: number | undefined;

  /** Check once, early, whether the mp3 exists so that starting later happens inside the tap. */
  async preload(): Promise<void> {
    await this.checkFile();
  }

  private async checkFile(): Promise<boolean> {
    if (this.fileOk !== null) return this.fileOk;
    try {
      const res = await fetch(assetUrl(MUSIC_FILE), { method: 'HEAD', cache: 'no-cache' });
      const type = res.headers.get('content-type') ?? '';
      this.fileOk = res.ok && !type.includes('text/html');
    } catch {
      this.fileOk = false;
    }
    return this.fileOk;
  }

  private ensureContext(): AudioContext | null {
    if (this.ctx) return this.ctx;
    const Ctor = getAudioContextCtor();
    if (!Ctor) return null;
    this.ctx = new Ctor();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);
    return this.ctx;
  }

  private target(): number {
    return this.wantPlaying ? Math.pow(this.volume, 2) * this.soft : 0;
  }

  private ramp(seconds: number): void {
    if (!this.ctx || !this.master) return;
    const g = this.master.gain;
    const t = this.ctx.currentTime;
    g.cancelScheduledValues(t);
    g.setValueAtTime(g.value, t);
    g.linearRampToValueAtTime(this.target(), t + seconds);
  }

  async start(): Promise<void> {
    window.clearTimeout(this.stopTimer);
    this.wantPlaying = true;
    const ctx = this.ensureContext();
    if (!ctx || !this.master) {
      this.wantPlaying = false;
      return;
    }
    // Must be called inside the tap handler for iOS / Safari.
    const resumed = ctx.state === 'suspended' ? ctx.resume() : Promise.resolve();

    const useFile = this.fileOk === null ? await this.checkFile() : this.fileOk;
    await resumed.catch(() => undefined);
    if (!this.wantPlaying) return;

    if (useFile) {
      try {
        await this.startFile(ctx);
      } catch {
        this.fileOk = false;
        this.startSynth(ctx);
      }
    } else {
      this.startSynth(ctx);
    }
    this.ramp(2.4);
  }

  private async startFile(ctx: AudioContext): Promise<void> {
    if (!this.el) {
      const el = new Audio(assetUrl(MUSIC_FILE));
      el.loop = true;
      el.preload = 'auto';
      this.el = el;
      if (this.master) ctx.createMediaElementSource(el).connect(this.master);
    }
    await this.el.play();
  }

  private startSynth(ctx: AudioContext): void {
    if (this.synth || !this.master) return;
    this.synth = new AmbientSynth(ctx, this.master);
    this.synth.start();
  }

  stop(): void {
    this.wantPlaying = false;
    this.ramp(1.6);
    window.clearTimeout(this.stopTimer);
    this.stopTimer = window.setTimeout(() => {
      this.el?.pause();
      this.synth?.stop();
      this.synth = null;
    }, 1800);
  }

  setVolume(v: number): void {
    this.volume = Math.min(1, Math.max(0, v));
    if (this.wantPlaying) this.ramp(0.5);
  }

  /** 1 = normal, lower = softer (used during the final confession). */
  setSoftness(factor: number): void {
    this.soft = factor;
    if (this.wantPlaying) this.ramp(2.5);
  }

  /** Pause audio processing while the tab is hidden (saves battery, avoids background sound). */
  setHidden(hidden: boolean): void {
    if (!this.ctx) return;
    if (hidden && this.ctx.state === 'running') void this.ctx.suspend();
    if (!hidden && this.wantPlaying && this.ctx.state === 'suspended') void this.ctx.resume();
  }
}
