import { getCLS, getFID, getLCP } from 'web-vitals';
import { ga } from 'react-ga';

const trackingId = 'G-L1NT7M0VMH';
ga('create', trackingId, 'auto');
ga('set', 'sendHitTask', null);

const sendToAnalytics = (metric) => {
  ga('send', 'event', 'Performance Metrics', metric);
};

const measureWebVitals = () => {
  try {
    getCLS((cls) => sendToAnalytics(`CLS Score: ${cls}`));
    getFID((fid) => sendToAnalytics(`FID Score: ${fid}`));
    getLCP((lcp) => sendToAnalytics(`LCP Score: ${lcp}`));
  } catch (error) {
    console.error('Error measuring web vitals:', error);
  }
};

const reportWebVitals = (onPerfEntry) => {
  if (typeof onPerfEntry === 'function') {
    import('web-vitals').then(({ getCLS, getFID, getLCP }) => {
      try {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getLCP(onPerfEntry);
      } catch (error) {
        console.error('Error reporting web vitals:', error);
      }
    }).catch((error) => {
      console.error('Error importing web-vitals:', error);
    });
  }
};

measureWebVitals();
export default reportWebVitals;
