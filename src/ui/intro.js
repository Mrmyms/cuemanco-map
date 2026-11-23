import { getMarketStatus } from '../utils/hours.js';

export class IntroController {
  constructor(options = {}) {
    this.mapController = options.mapController;
    this.initialTargetId = options.initialTargetId || null;
    this.onRevealComplete = options.onRevealComplete || (() => {});

    this.appEl = document.getElementById('app');
    this.splashEl = document.getElementById('intro-splash');
    this.liveStatusEl = document.getElementById('intro-live-status');
    this.skipBtnEl = document.getElementById('intro-skip-btn');

    this.prefersReducedMotion = typeof window !== 'undefined' &&
      Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

    this.isPlaying = false;
    this.autoTimer = null;
    this.cleanupTimer = null;
    this.eventsBound = false;

    this.updateLiveStatus();
    this.bindEvents();
  }

  updateLiveStatus() {
    if (!this.liveStatusEl) return;
    const status = getMarketStatus();
    const text = status.tone === 'closed' && status.detailText
      ? `${status.statusText} · ${status.detailText}`
      : status.statusText;
    this.liveStatusEl.textContent = text;
    this.liveStatusEl.className = `intro-live-status tone-${status.tone}`;
  }

  bindEvents() {
    if (this.eventsBound || !this.splashEl) return;
    this.eventsBound = true;

    this.splashEl.addEventListener('click', () => {
      if (this.isPlaying) {
        this.dismiss();
      }
    });

    if (this.skipBtnEl) {
      this.skipBtnEl.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.isPlaying) {
          this.dismiss();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!this.isPlaying) return;
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.dismiss();
      }
    });
  }

  start() {
    clearTimeout(this.autoTimer);
    clearTimeout(this.cleanupTimer);

    if (!this.splashEl) {
      if (this.appEl) {
        this.appEl.classList.remove('app-intro-pending');
        this.appEl.classList.add('app-revealed');
      }
      this.mapController.playIntroFlyIn(this.initialTargetId);
      this.initialTargetId = null;
      return;
    }

    this.updateLiveStatus();

    if (this.appEl) {
      this.appEl.classList.add('app-intro-pending');
      this.appEl.classList.remove('app-revealed');
    }

    this.mapController.prepareIntroOverview();

    this.splashEl.classList.remove('intro-done', 'is-exiting', 'is-playing');
    void this.splashEl.offsetWidth;
    this.splashEl.classList.add('is-playing');
    this.isPlaying = true;

    const delayMs = this.prefersReducedMotion
      ? 180
      : this.initialTargetId
        ? 1150
        : 2350;

    this.autoTimer = setTimeout(() => {
      this.dismiss();
    }, delayMs);
  }

  dismiss(targetId = this.initialTargetId) {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    clearTimeout(this.autoTimer);
    clearTimeout(this.cleanupTimer);

    const resolvedTarget = targetId || null;
    this.initialTargetId = null;

    if (this.splashEl) {
      this.splashEl.classList.add('is-exiting');
    }

    this.mapController.playIntroFlyIn(resolvedTarget);

    if (this.appEl) {
      this.appEl.classList.remove('app-intro-pending');
      this.appEl.classList.add('app-revealed');
    }

    const exitDuration = this.prefersReducedMotion ? 160 : 700;
    this.cleanupTimer = setTimeout(() => {
      if (this.splashEl) {
        this.splashEl.classList.add('intro-done');
        this.splashEl.classList.remove('is-playing', 'is-exiting');
      }
      this.onRevealComplete();
    }, exitDuration);
  }

  replay() {
    this.mapController.clearSelection();
    this.initialTargetId = null;
    this.start();
  }
}
