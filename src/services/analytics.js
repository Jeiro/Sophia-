// Google Analytics Service
export const analyticsService = {
  // Initialize Google Analytics
  init: () => {
    const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
    
    if (!gaId) {
      console.warn('Google Analytics ID not configured');
      return;
    }

    // Add Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaId);
  },

  // Track page view
  pageView: (path, title) => {
    if (window.gtag) {
      window.gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID, {
        page_path: path,
        page_title: title
      });
    }
  },

  // Track event
  trackEvent: (eventName, eventData = {}) => {
    if (window.gtag) {
      window.gtag('event', eventName, eventData);
    }
  },

  // Track conversion
  trackConversion: (conversionId, value = 1) => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        conversion_id: conversionId,
        value: value
      });
    }
  }
};
