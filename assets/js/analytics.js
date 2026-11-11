/* GA4 is sent only by GTM. This file never calls gtag() or changes navigation. */
(function (w, d) {
  "use strict";
  if (w.__areumAnalyticsInstalled) return;
  w.__areumAnalyticsInstalled = true;

  var config = w.AREUM_ANALYTICS_CONFIG || {};
  if (!config.storeId || !config.storeName || !config.lpId) return;
  w.dataLayer = w.dataLayer || [];
  // Must be available before GTM initializes and sends the automatic page_view.
  w.dataLayer.push({
    store_id: config.storeId,
    store_name: config.storeName,
    lp_id: config.lpId
  });

  var seenEvents = new WeakSet();
  var lastActivation = new WeakMap();
  function trackBooking(e) {
    // Left click (including keyboard/touch activation) or middle-button auxclick.
    if (e.type === "click" && e.button !== 0) return;
    if (e.type === "auxclick" && e.button !== 1) return;
    if (e.defaultPrevented || seenEvents.has(e)) return;
    var target = e.target;
    if (!target || typeof target.closest !== "function") return;
    var link = target.closest("a[data-booking-location]");
    if (!link) return;
    var location = link.getAttribute("data-booking-location");
    if (!location) return;
    var url;
    try { url = new URL(link.href, w.location.href); } catch (_) { return; }
    if (url.protocol !== "https:" && url.protocol !== "http:") return;

    seenEvents.add(e);
    // Treat a double click on the same button within 750ms as one activation.
    // A later deliberate click or another button is counted normally.
    var now = w.performance.now();
    var last = lastActivation.get(link);
    if (last !== undefined && now - last < 750) return;
    lastActivation.set(link, now);
    w.dataLayer.push({
      event: "booking_site_click",
      store_id: config.storeId,
      store_name: config.storeName,
      lp_id: config.lpId,
      booking_url: url.href,
      button_location: location
    });
  }
  d.addEventListener("click", trackBooking, true);
  d.addEventListener("auxclick", trackBooking, true);

  var id = (config.gtmContainerId || "").trim();
  if (!/^GTM-[A-Z0-9]+$/.test(id)) return;
  // Reuse an already installed container; never load a second one automatically.
  // Direct GA4 must be migrated to GTM before enabling this loader.
  var existing = Array.prototype.some.call(d.scripts, function (script) {
    return /(?:googletagmanager\.com|google-analytics\.com)\/(?:gtm\.js|gtag\/js|analytics\.js)(?:[?#]|$)/.test(script.src || "");
  });
  var containers = w.google_tag_manager;
  if (existing || (containers && Object.keys(containers).some(function (key) {
    return /^GTM-/.test(key);
  })) || typeof w.gtag === "function") return;

  w.dataLayer.push({"gtm.start": Date.now(), event: "gtm.js"});
  var script = d.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtm.js?id=" + id;
  d.head.appendChild(script);
})(window, document);
