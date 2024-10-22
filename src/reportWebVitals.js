import { getCLS, getFID, getLCP } from 'web-vitals';
import ga from 'ga-react'; // Assuming you're using ga-react library

const sendToAnalytics = (metric) => {
  ga('send', 'event', 'Web Vitals', metric);
};

const measureWebVitals = () => {
  try {
    getCLS((cls) => sendToAnalytics(`CLS: ${cls}`));
    getFID((fid) => sendToAnalytics(`FID: ${fid}`));
    getLCP((lcp) => sendToAnalytics(`LCP: ${lcp}`));
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