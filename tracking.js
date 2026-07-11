// tracking.js
(function() {
  // HARDCODED CUSTOM API DESTINATION
  // Ensures data routes to Vercel even though script is loaded locally
  const API_URL = 'https://api1-orpin.vercel.app/api/custom';
  const PROJECT_ID = window.ANALYTICS_PROJECT_ID || '5d6a6287-8517-4838-bd68-67f5c8cab180';

  const CONFIG = {
    IDLE_TIMEOUT_MS: 300000,
    FLUSH_INTERVAL_MS: 25000,
    CHECKOUT_INTERVAL_MS: 300000,
    MAX_EVENTS_BEFORE_FLUSH: 50,
    ACTIVITY_EVENTS: ['mousemove', 'click', 'scroll', 'keydown'],
    BLOCK_CLASS: 'rr-block'
  };

  let eventBuffer = [];
  let stopFn = null;
  let isRecording = false;
  let isTabVisible = true;
  let idleTimer = null;
  let flushInterval = null;
  let lastActivityTime = Date.now();

  function generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function getVisitorId() {
    let visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
      visitorId = generateId();
      localStorage.setItem('visitorId', visitorId);
    }
    return visitorId;
  }

  function getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = generateId();
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  async function flushEvents() {
    if (eventBuffer.length === 0) return;
    const eventsToSend = eventBuffer.splice(0, eventBuffer.length);

    try {
      // Sends to https://api1-orpin.vercel.app/api/custom/:projectId/session
      await fetch(API_URL + '/' + PROJECT_ID + '/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: getSessionId(),
          visitorId: getVisitorId(),
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
          screenResolution: window.screen.width + 'x' + window.screen.height,
          viewportWidth: window.innerWidth,
          viewportHeight: window.innerHeight,
          events: eventsToSend,
          meta: { flushedAt: new Date().toISOString(), eventCount: eventsToSend.length }
        })
      });
    } catch (error) {
      if (eventBuffer.length < 500) {
        eventBuffer.unshift(...eventsToSend);
      }
    }
  }

  async function trackEvent(eventName, data) {
    try {
      // Sends to https://api1-orpin.vercel.app/api/custom/:projectId/events/track
      await fetch(API_URL + '/' + PROJECT_ID + '/events/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          visitorId: getVisitorId(),
          sessionId: getSessionId(),
          eventName,
          url: window.location.href,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          screenResolution: window.screen.width + 'x' + window.screen.height,
          ...data
        })
      });
    } catch (error) {}
  }

  function startRecording() {
    if (isRecording || typeof rrweb === 'undefined') return;
    try {
      stopFn = rrweb.record({
        emit(event) {
          if (!isTabVisible) return;
          eventBuffer.push(event);
          if (eventBuffer.length >= CONFIG.MAX_EVENTS_BEFORE_FLUSH) {
            flushEvents();
          }
        },
        sampling: { mouse: false, mousemove: 500, scroll: 200, input: 'last', canvas: 0, media: 800 },
        checkoutEveryNms: CONFIG.CHECKOUT_INTERVAL_MS,
        blockClass: CONFIG.BLOCK_CLASS,
        blockSelector: '[data-rr-block], .rr-block, canvas, video, iframe',
        inlineStylesheet: false,
        maskAllInputs: true,
        slimDOMOptions: {
          script: true, comment: true, headFavicon: true, headWhitespace: true,
          headMetaSocial: true, headMetaRobots: true, headMetaHttpEquiv: true,
          headMetaAuthorship: true, headMetaVerification: true
        },
        recordCanvas: false, log: false
      });
      isRecording = true;
    } catch (error) {}
  }

  function stopRecording(reason) {
    if (!isRecording) return;
    try {
      if (stopFn) { stopFn(); stopFn = null; }
      isRecording = false;
      flushEvents();
    } catch (error) {}
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      isTabVisible = false;
      stopRecording('tab hidden');
    } else {
      isTabVisible = true;
      lastActivityTime = Date.now();
      startRecording();
      resetIdleTimer();
    }
  }

  function resetIdleTimer() {
    if (idleTimer) clearTimeout(idleTimer);
    lastActivityTime = Date.now();
    idleTimer = setTimeout(() => {
      if ((Date.now() - lastActivityTime) >= CONFIG.IDLE_TIMEOUT_MS) {
        stopRecording('idle timeout');
      }
    }, CONFIG.IDLE_TIMEOUT_MS);
  }

  function handleActivity() {
    lastActivityTime = Date.now();
    if (!isRecording && isTabVisible) startRecording();
    resetIdleTimer();
  }

  function initialize() {
    if (document.readyState === 'complete') { startRecording(); } 
    else { window.addEventListener('load', startRecording); }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    CONFIG.ACTIVITY_EVENTS.forEach(ev => document.addEventListener(ev, handleActivity, { passive: true }));
    flushInterval = setInterval(flushEvents, CONFIG.FLUSH_INTERVAL_MS);
    resetIdleTimer();

    window.addEventListener('beforeunload', () => {
      if (idleTimer) clearTimeout(idleTimer);
      if (flushInterval) clearInterval(flushInterval);
      flushEvents();
    });

    trackEvent('pageview', { loadTime: performance.now ? performance.now() : 0 });

    document.addEventListener('click', function(e) {
      const target = e.target.closest('a, button');
      if (target) {
        trackEvent('click', {
          elementType: target.tagName.toLowerCase(),
          elementText: target.textContent?.trim().slice(0, 100),
          elementId: target.id,
          elementClass: target.className
        });
      }
    });
    window.trackEvent = trackEvent;
  }
  initialize();
})();
