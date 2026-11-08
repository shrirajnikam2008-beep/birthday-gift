/**
 * Central controller for the full-screen water transition.
 * One <WaterTransition/> registers a runner; deliberate chapter transitions call `waterController.play`.
 * - Only one splash runs at a time.
 * - A request made before the peak replaces the pending peak action (latest wins).
 * - A request made after the peak executes its peak action immediately if interrupted within the drain window,
 *   or queues cleanly so the user never waits on stacked 3-second animations.
 */
export interface PlayOptions {
  /** Runs once while the viewport is covered (swap chapter / jump scroll here). */
  onPeak?: () => void;
}

type Runner = (opts: { onPeak: () => void; signal: { aborted: boolean } }) => Promise<void>;

class WaterController {
  private runner: Runner | null = null;
  private busy = false;
  private peaked = false;
  private pendingPeak: (() => void) | null = null;
  private activeSignal: { aborted: boolean } | null = null;
  private listeners = new Set<(busy: boolean) => void>();

  register(runner: Runner) {
    this.runner = runner;
    return () => {
      if (this.runner === runner) this.runner = null;
    };
  }

  subscribe(fn: (busy: boolean) => void) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  isBusy() {
    return this.busy;
  }

  cancel() {
    if (this.activeSignal) {
      this.activeSignal.aborted = true;
    }
  }

  private emit() {
    this.listeners.forEach((l) => l(this.busy));
  }

  async play(opts: PlayOptions = {}): Promise<void> {
    if (this.busy) {
      if (!this.peaked) {
        // Replace pending peak callback so the latest destination wins at the crest
        this.pendingPeak = opts.onPeak ?? null;
        return;
      }
      // Already past peak (draining): abort current tail and run a fresh, responsive transition
      this.cancel();
      opts.onPeak?.();
      return;
    }
    if (!this.runner) {
      opts.onPeak?.();
      return;
    }
    const signal = { aborted: false };
    this.activeSignal = signal;
    this.busy = true;
    this.peaked = false;
    this.pendingPeak = opts.onPeak ?? null;
    this.emit();
    try {
      await this.runner({
        signal,
        onPeak: () => {
          this.peaked = true;
          const fn = this.pendingPeak;
          this.pendingPeak = null;
          fn?.();
        },
      });
    } finally {
      if (!this.peaked) {
        const fn = this.pendingPeak;
        this.pendingPeak = null;
        fn?.();
      }
      this.pendingPeak = null;
      this.activeSignal = null;
      this.busy = false;
      this.peaked = false;
      this.emit();
    }
  }
}

export const waterController = new WaterController();
