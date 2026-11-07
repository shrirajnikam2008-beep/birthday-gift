/**
 * Central controller for the full-screen water transition.
 * One <WaterTransition/> registers a runner; everything else calls `waterController.play`.
 * - Only one splash runs at a time.
 * - A request made before the peak replaces the pending peak action (latest wins).
 * - A request made after the peak is queued once and played when the splash ends.
 */
export interface PlayOptions {
  /** Runs once while the viewport is fully covered (swap chapter / jump scroll here). */
  onPeak?: () => void;
}

type Runner = (opts: { onPeak: () => void }) => Promise<void>;

class WaterController {
  private runner: Runner | null = null;
  private busy = false;
  private peaked = false;
  private pendingPeak: (() => void) | null = null;
  private queued: PlayOptions | null = null;
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

  private emit() {
    this.listeners.forEach((l) => l(this.busy));
  }

  async play(opts: PlayOptions = {}): Promise<void> {
    if (this.busy) {
      if (!this.peaked) this.pendingPeak = opts.onPeak ?? null;
      else this.queued = opts;
      return;
    }
    if (!this.runner) {
      opts.onPeak?.();
      return;
    }
    this.busy = true;
    this.peaked = false;
    this.pendingPeak = opts.onPeak ?? null;
    this.emit();
    try {
      await this.runner({
        onPeak: () => {
          this.peaked = true;
          const fn = this.pendingPeak;
          this.pendingPeak = null;
          fn?.();
        },
      });
    } finally {
      if (!this.peaked) this.pendingPeak?.();
      this.pendingPeak = null;
      this.busy = false;
      this.peaked = false;
      this.emit();
      const next = this.queued;
      this.queued = null;
      if (next) void this.play(next);
    }
  }
}

export const waterController = new WaterController();
