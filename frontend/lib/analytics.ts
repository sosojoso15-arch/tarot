'use client';

import { useEffect } from 'react';
import { ANALYTICS } from './constants';

export function useGoogleAnalytics() {
  useEffect(() => {
    if (!ANALYTICS.GA_ID) return;

    // Load Google Analytics
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', ANALYTICS.GA_ID);
  }, []);
}

export function useMetaPixel() {
  useEffect(() => {
    if (!ANALYTICS.META_PIXEL_ID) return;

    // Load Meta Pixel
    const script = document.createElement('script');
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${ANALYTICS.META_PIXEL_ID}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
  }, []);
}

export function trackEvent(eventName: string, eventData?: any) {
  if (typeof window !== 'undefined') {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, eventData);
    }

    // Meta Pixel
    if (window.fbq) {
      window.fbq('track', eventName, eventData);
    }
  }
}

export function trackPurchase(value: number, currency: string = 'USD') {
  trackEvent('purchase', {
    value,
    currency,
  });
}

export function trackInitiateCheckout(value: number, minutes: number) {
  trackEvent('begin_checkout', {
    value,
    currency: 'USD',
    content_name: `Tarot ${minutes} minutos`,
  });
}
