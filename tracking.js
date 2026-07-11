
<script src="https://unpkg.com/rrweb@2.0.0-alpha.4/dist/rrweb.min.js"></script>
<script>
(function() {
  const API_URL = 'https://api1-orpin.vercel.app/api/custom';
  const PROJECT_ID = '5d6a6287-8517-4838-bd68-67f5c8cab180';

  // ==========================================
  // CONFIGURATION
  // ==========================================
  const CONFIG = {
    // Idle timeout: 5 minutes of no activity stops recording
    IDLE_TIMEOUT_MS: 300000,
    // Network flush interval: send data every 25 seconds
    FLUSH_INTERVAL_MS: 25000,
    // Checkout every 5 minutes for fresh baseline
    CHECKOUT_INTERVAL_MS: 300000,
    // Max events before forced flush
    MAX_EVENTS_BEFORE_FLUSH: 50,
    // Activity events to monitor for idle detection
    ACTIVITY_EVENTS: ['mousemove', 'click', 'scroll', 'keydown'],
    // Block class for elements to ignore
    BLOCK_CLASS: 'rr-block'
  };

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  let eventBuffer = [];
  let stopFn = null;
  let isRecording = false;
  let isTabVisible = true;
  let idleTimer = null;
  let flushInterval = null;
  let lastActivityTime = Date.now();

  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================
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

  // ==========================================
  // NETWORK FUNCTIONS
  // ==========================================
  async function flushEvents() {
    if (eventBuffer.length === 0) return;

    const eventsToSend = eventBuffer.splice(0, eventBuffer.length);

    try {
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
          // Metadata for debugging
          meta: {
            flushedAt: new Date().toISOString(),
            eventCount: eventsToSend.length
          }
        })
      });
    } catch (error) {
      // Re-queue events on failure (with limit to prevent memory issues)
      if (eventBuffer.length < 500) {
        eventBuffer.unshift(...eventsToSend);
      }
      console.warn('Analytics flush failed, events will retry:', error);
    }
  }

  async function trackEvent(eventName, data) {
    try {
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
    } catch (error) {
      console.warn('Event tracking failed:', error);
    }
  }

  // ==========================================
  // RECORDING CONTROL
  // ==========================================
  function startRecording() {
    if (isRecording || typeof rrweb === 'undefined') return;

    try {
      stopFn = rrweb.record({
        emit(event) {
          // Only record if tab is visible
          if (!isTabVisible) return;

          eventBuffer.push(event);

          // Force flush if buffer gets too large
          if (eventBuffer.length >= CONFIG.MAX_EVENTS_BEFORE_FLUSH) {
            flushEvents();
          }
        },

        // ==========================================
        // AGGRESSIVE SAMPLING CONFIGURATION
        // ==========================================
        sampling: {
          // Disable high-frequency mouse path tracking (reduces data by ~90%)
          mouse: false,
          // Throttle mouse movement to 500ms intervals
          mousemove: 500,
          // Scroll tracking at 200ms intervals
          scroll: 200,
          // Only capture final input state, not every keystroke
          input: 'last',
          // Limit canvas sampling
          canvas: 0,
          // Media element sampling
          media: 800
        },

        // ==========================================
        // STATIC PERIODIC CHECKOUTS
        // ==========================================
        // Take fresh baseline snapshot every 5 minutes
        checkoutEveryNms: CONFIG.CHECKOUT_INTERVAL_MS,

        // ==========================================
        // ELEMENT BLOCKING
        // ==========================================
        // Elements with this class will be ignored
        blockClass: CONFIG.BLOCK_CLASS,
        // Also block elements with specific attributes
        blockSelector: '[data-rr-block], .rr-block, canvas, video, iframe',

        // ==========================================
        // ADDITIONAL OPTIMIZATIONS
        // ==========================================
        // Don't record stylesheets (reduces payload)
        inlineStylesheet: false,
        // Mask all inputs for privacy
        maskAllInputs: true,
        // Slim DOM - remove script comments, etc.
        slimDOMOptions: {
          script: true,
          comment: true,
          headFavicon: true,
          headWhitespace: true,
          headMetaSocial: true,
          headMetaRobots: true,
          headMetaHttpEquiv: true,
          headMetaAuthorship: true,
          headMetaVerification: true
        },

        // Don't record canvas (huge data savings)
        recordCanvas: false,

        // Log level
        log: false
      });

      isRecording = true;
      console.log('Analytics: Recording started');
    } catch (error) {
      console.error('Analytics: Failed to start recording:', error);
    }
  }

  function stopRecording(reason) {
    if (!isRecording) return;

    try {
      if (stopFn) {
        stopFn();
        stopFn = null;
      }
      isRecording = false;

      // Flush any remaining events
      flushEvents();

      console.log('Analytics: Recording stopped -', reason);
    } catch (error) {
      console.warn('Analytics: Error stopping recording:', error);
    }
  }

  // ==========================================
  // VISIBILITY CHANGE HANDLER
  // ==========================================
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

  // ==========================================
  // IDLE INACTIVITY HANDLER
  // ==========================================
  function resetIdleTimer() {
    if (idleTimer) {
      clearTimeout(idleTimer);
    }

    lastActivityTime = Date.now();

    idleTimer = setTimeout(() => {
      const timeSinceActivity = Date.now() - lastActivityTime;
      if (timeSinceActivity >= CONFIG.IDLE_TIMEOUT_MS) {
        stopRecording('idle timeout (5 min inactivity)');
      }
    }, CONFIG.IDLE_TIMEOUT_MS);
  }

  function handleActivity() {
    lastActivityTime = Date.now();

    // If recording was stopped due to idle, restart it
    if (!isRecording && isTabVisible) {
      startRecording();
    }

    resetIdleTimer();
  }

  // ==========================================
  // INITIALIZATION
  // ==========================================
  function initialize() {
    // Start recording when page loads
    if (document.readyState === 'complete') {
      startRecording();
    } else {
      window.addEventListener('load', startRecording);
    }

    // ==========================================
    // VISIBILITY CHANGE LISTENER
    // ==========================================
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // ==========================================
    // ACTIVITY LISTENERS (for idle detection)
    // ==========================================
    CONFIG.ACTIVITY_EVENTS.forEach(eventName => {
      document.addEventListener(eventName, handleActivity, { passive: true });
    });

    // ==========================================
    // PERIODIC FLUSH (25 seconds)
    // ==========================================
    flushInterval = setInterval(flushEvents, CONFIG.FLUSH_INTERVAL_MS);

    // Initial activity timer
    resetIdleTimer();

    // ==========================================
    // CLEANUP ON PAGE UNLOAD
    // ==========================================
    window.addEventListener('beforeunload', () => {
      if (idleTimer) clearTimeout(idleTimer);
      if (flushInterval) clearInterval(flushInterval);
      flushEvents();
    });

    // ==========================================
    // TRACK INITIAL PAGEVIEW
    // ==========================================
    trackEvent('pageview', {
      loadTime: performance.now ? performance.now() : 0
    });

    // ==========================================
    // CLICK TRACKING
    // ==========================================
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

    // Expose trackEvent globally
    window.trackEvent = trackEvent;
  }

  // Start the tracker
  initialize();
})();
</script>
