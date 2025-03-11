async function setupWidget() {
  const response = await fetch("/api/token");
  const { token } = await response.json();

  // Configure the widget with the token
  window.IngridReceiptWidgetApi.config({
    containerId: "widget",
    token,
    siteId: import.meta.env.VITE_SITE_ID,
    sessionId: import.meta.env.VITE_SESSION_ID,
    locale: "en-GB",
  });
}

window.addEventListener("load", setupWidget);
