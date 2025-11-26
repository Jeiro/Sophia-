// Google AdSense Service
export const adSenseService = {
  // Initialize Google AdSense
  init: () => {
    const adsenseId = import.meta.env.VITE_GOOGLE_ADSENSE_ID;
    
    if (!adsenseId) {
      console.warn('Google AdSense ID not configured');
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + adsenseId;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  },

  // Push ads (call after inserting ad slots in HTML)
  pushAds: () => {
    if (window.adsbygoogle) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.error('AdSense push failed:', e);
      }
    }
  }
};
