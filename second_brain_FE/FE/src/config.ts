export const BACKEND_URL = "http://localhost:3000";

declare global {
    interface Window {
      twttr: {
        widgets: {
          load: (element?: HTMLElement) => void;
        };
      };
    }
  }