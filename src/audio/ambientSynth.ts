/**
 * A tiny original ambient "soft piano + warm pad" generator built on the Web Audio API.
 * It is the automatic fallback when public/audio/romantic-piano.mp3 is not present.
 * Everything is synthesised in the browser, so there is nothing to license and nothing to download.
 * Slow, quiet, no sudden sounds: every note fades in and out.
 */

const midi = (n: number): number => 440 * Math.pow(2, (n - 69) / 12);

interface Chord {
  bass: number;
  pad: number[];
  arp: number[];
}

// Cmaj7 -> Am7 -> Fmaj7 -> G6 (a gentle, hopeful loop)
const PROGRESSION: Chord[] = [
  { bass: 36, pad: [55, 59, 64, 67], arp: [64, 67, 71, 72, 76] },
  { bass: 45, pad: [52, 55, 60, 64], arp: [60, 64, 67, 69, 72] },
  { bass: 41, pad: [53, 57, 60, 64], arp: [57, 60, 64, 65, 69] },
  { bass: 43, pad: [50, 55, 59, 64], arp: [59, 62, 64, 67, 71] },
];

const CHORD_SECONDS = 8;
const STEP_SECONDS = 1;
const PATTERN = [0, 2, 3, 2, 1, 3, 4, 2];

export class AmbientSynth {
  private ctx: AudioContext;
  private bus: GainNode;
  private reverb: ConvolverNode;
  private timer: number | undefined;
  private nextChordAt = 0;
  private chordIndex = 0;

  constructor(ctx: AudioContext, destination: AudioNode) {
    this.ctx = ctx;

    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -24;
    compressor.ratio.value = 3;
    compressor.connect(destination);

    this.bus = ctx.createGain();
    this.bus.gain.value = 0.9;

    const dry = ctx.createGain();
    dry.gain.value = 0.75;
    this.bus.connect(dry).connect(compressor);

    this.reverb = ctx.createConvolver();
    this.reverb.buffer = this.makeImpulse(3.4);
    const wet = ctx.createGain();
    wet.gain.value = 0.55;
    this.bus.connect(this.reverb).connect(wet).connect(compressor);
  }

  start(): void {
    this.nextChordAt = this.ctx.currentTime + 0.15;
    this.chordIndex = 0;
    this.tick();
    this.timer = window.setInterval(() => this.tick(), 700);
  }

  stop(): void {
    if (this.timer !== undefined) window.clearInterval(this.timer);
    this.timer = undefined;
    const t = this.ctx.currentTime;
    this.bus.gain.cancelScheduledValues(t);
    this.bus.gain.setValueAtTime(this.bus.gain.value, t);
    this.bus.gain.linearRampToValueAtTime(0, t + 0.6);
    window.setTimeout(() => {
      try {
        this.bus.disconnect();
      } catch {
        /* already disconnected */
      }
    }, 900);
  }

  private tick(): void {
    while (this.nextChordAt < this.ctx.currentTime + 3) {
      this.scheduleChord(this.nextChordAt, this.chordIndex % PROGRESSION.length);
      this.nextChordAt += CHORD_SECONDS;
      this.chordIndex += 1;
    }
  }

  private scheduleChord(t: number, index: number): void {
    const chord = PROGRESSION[index];
    chord.pad.forEach((n) => this.pad(n, t, CHORD_SECONDS));
    this.bass(chord.bass, t, CHORD_SECONDS);
    PATTERN.forEach((p, i) => {
      const humanize = Math.random() * 0.05;
      const velocity = 0.05 + Math.random() * 0.025;
      this.piano(chord.arp[p], t + i * STEP_SECONDS + humanize, velocity);
    });
  }

  private pad(note: number, t: number, dur: number): void {
    const ctx = this.ctx;
    const env = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1100;
    env.gain.setValueAtTime(0.0001, t);
    env.gain.linearRampToValueAtTime(0.03, t + 2.6);
    env.gain.setValueAtTime(0.03, t + dur - 0.2);
    env.gain.linearRampToValueAtTime(0.0001, t + dur + 2.8);
    env.connect(filter).connect(this.bus);

    ([
      ['sine', -4],
      ['triangle', 5],
    ] as const).forEach(([type, detune]) => {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = midi(note);
      osc.detune.value = detune;
      osc.connect(env);
      osc.start(t);
      osc.stop(t + dur + 3);
    });
  }

  private bass(note: number, t: number, dur: number): void {
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = midi(note);
    env.gain.setValueAtTime(0.0001, t);
    env.gain.linearRampToValueAtTime(0.08, t + 1.2);
    env.gain.linearRampToValueAtTime(0.0001, t + dur + 1.5);
    osc.connect(env).connect(this.bus);
    osc.start(t);
    osc.stop(t + dur + 1.8);
  }

  private piano(note: number, t: number, velocity: number): void {
    const ctx = this.ctx;
    const env = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3200, t);
    filter.frequency.exponentialRampToValueAtTime(900, t + 2.4);
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(velocity, t + 0.015);
    env.gain.exponentialRampToValueAtTime(0.0001, t + 2.8);
    env.connect(filter).connect(this.bus);

    ([
      ['triangle', 1, 1],
      ['sine', 2, 0.28],
      ['sine', 3, 0.08],
    ] as const).forEach(([type, mult, level]) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.value = midi(note) * mult;
      g.gain.value = level;
      osc.connect(g).connect(env);
      osc.start(t);
      osc.stop(t + 3);
    });
  }

  private makeImpulse(seconds: number): AudioBuffer {
    const rate = this.ctx.sampleRate;
    const length = Math.floor(rate * seconds);
    const buffer = this.ctx.createBuffer(2, length, rate);
    for (let c = 0; c < 2; c++) {
      const data = buffer.getChannelData(c);
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.6);
      }
    }
    return buffer;
  }
}
