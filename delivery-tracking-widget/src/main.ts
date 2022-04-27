import "./style.css";

const form = document.getElementById("configurationForm");
const containerId = "widget";

function setupWidget() {
  const formData = new FormData(form as HTMLFormElement);
  const widgetMode = formData.get("widget-mode");
  const params = new URLSearchParams(window.location.search);

  const identifier = params.get("identifier");
  const contact = params.get("contact");

  if (widgetMode === "search") {
    window.IngridDeliveryTrackingWidgetApi.renderSearchMode({
      widgetMode: "search",
      containerId,
      locale: "en-US",
      siteId: import.meta.env.VITE_SITE_ID,
      identifier,
      contact,
    });
  }

  if (widgetMode === "private") {
    window.IngridDeliveryTrackingWidgetApi.renderPrivateMode({
      widgetMode: "private",
      containerId,
      locale: "en-US",
      siteId: import.meta.env.VITE_SITE_ID,
      identifier,
      contact,
    });
  }
}

const clearContainer = () => {
  const container = document.getElementById(containerId);
  if (!container) return;

  while (container.hasChildNodes()) {
    container.removeChild(container!.firstChild!);
  }
};

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  clearContainer();
  setupWidget();
});

window.addEventListener("load", () => {
  setupWidget();
});
