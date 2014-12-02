class Clock {
  constructor(callback, context) {
    this.timer    = 0;
    this.callback = callback;
    this.context  = context;
  }

  get isStarted() {
    return !!this.requestId;
  }

  tick() {
    this.timer++;
    this.requestId = window.requestAnimationFrame(this.tick.bind(this));
    this.callback.apply(this.context, [this.timer]);
  }

  start() {
    if (!this.isStarted) {
      this.tick();
    }
  }

  stop() {
    window.cancelAnimationFrame(this.requestId);
  }

  reset() {
    this.stop();
    this.timer = 0;
  }
}

export default Clock;
