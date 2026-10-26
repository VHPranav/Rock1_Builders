// Pushes an event to window.dataLayer for Google Tag Manager. Never pass personal details or form values.

type DataLayerEvent = { event: string } & Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function pushDataLayer(event: string, params: Record<string, string | number | boolean> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params, page_location: window.location.href } satisfies DataLayerEvent);
}
