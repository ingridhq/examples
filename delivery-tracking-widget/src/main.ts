import "./style.css";

const containerId = "widget";

function setupWidget() {
  const params = new URLSearchParams(window.location.search);

  const identifier = params.get("identifier");
  const contact = params.get("contact");

  if (identifier && contact) {
    window.IngridDeliveryTrackingWidgetApi.renderPrivateMode({
      containerId,
      siteId: import.meta.env.VITE_SITE_ID,
      identifier,
      contact,
    });
    return;
  }

  window.IngridDeliveryTrackingWidgetApi.renderSearchMode({
    containerId,
    siteId: import.meta.env.VITE_SITE_ID,
  });
  return;
}

window.addEventListener("load", () => {
  setupWidget();
});
