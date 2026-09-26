// Gentle Web Audio API synthesizer for festive holiday chimes
class ChristmasAudioService {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    // Sound enabled by default, can be toggled by user
    const saved = localStorage.getItem('christmas_sound_enabled');
    if (saved !== null) {
      this.soundEnabled = saved === 'true';
    }
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public toggle(): boolean {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem('christmas_sound_enabled', String(this.soundEnabled));
    return this.soundEnabled;
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft Christmas bell chime (e.g. C6 -> E6 or G5)
  public playChime(freqs: number[] = [1046.5, 1318.5]) {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.1);

        const startTime = this.ctx!.currentTime + idx * 0.1;
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.08, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.65);
      });
    } catch {
      // Audio autoplay policy or not supported
    }
  }

  public playSleighBells() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const bells = [2093, 2349, 2637, 3136];
      bells.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.05);

        const startTime = this.ctx!.currentTime + idx * 0.05;
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.04, startTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.4);
      });
    } catch {
      // Ignore
    }
  }
}

export const christmasAudio = new ChristmasAudioService();
