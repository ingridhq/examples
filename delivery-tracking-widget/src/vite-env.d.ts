/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_ID: string;
  readonly VITE_IDENTIFIER: string;
  readonly VITE_CONTACT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  IngridDeliveryTrackingWidgetApi: {
    renderSearchMode: (config: {
      containerId: string;
      locale: string;
      siteId: string;
      identifier: string | null;
      contact: string | null;
    }) => void;
    renderPrivateMode: (config: any) => void;
  };
}
