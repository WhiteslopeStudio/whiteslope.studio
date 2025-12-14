// Google Analytics helper functions
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    (window as any).gtag?.('config', GA_MEASUREMENT_ID, {
      page_location: url,
    });
  }
};

// Track events
export const event = (
  action: string,
  {
    event_category,
    event_label,
    value,
    ...parameters
  }: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
  } = {}
) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    (window as any).gtag?.('event', action, {
      event_category,
      event_label,
      value,
      ...parameters,
    });
  }
};

// Specific tracking functions for common events
export const trackContactFormSubmit = (formType: 'contact' | 'brief' | 'pricing') => {
  event('form_submit', {
    event_category: 'contact',
    event_label: formType,
  });
};

export const trackServiceClick = (serviceName: string) => {
  event('service_click', {
    event_category: 'services',
    event_label: serviceName,
  });
};

export const trackChatbotMessage = (messageType: 'user' | 'bot') => {
  event('chatbot_interaction', {
    event_category: 'chatbot',
    event_label: messageType,
  });
};

export const trackPricingView = (serviceType: string) => {
  event('pricing_view', {
    event_category: 'pricing',
    event_label: serviceType,
  });
};

export const trackCityPageView = (cityName: string) => {
  event('city_page_view', {
    event_category: 'local_seo',
    event_label: cityName,
  });
};