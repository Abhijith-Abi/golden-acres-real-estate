"use client";

/**
 * Google Analytics 4 (GA4) Event Dispatcher
 * Dispatches custom real estate conversion events safely without throwing errors
 * when GA4 is not initialized or ad blockers are present.
 */

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "set" | "js",
      targetIdOrAction: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    try {
      window.gtag("event", eventName, params);
    } catch {
      // Silently fail if gtag throws
    }
  }
}

export function trackWhatsAppClick(label?: string): void {
  trackEvent("whatsapp_click", {
    event_category: "Engagement",
    event_label: label ?? "general",
    destination: "WhatsApp",
  });
}

export function trackPhoneClick(phoneNumber?: string): void {
  trackEvent("phone_click", {
    event_category: "Engagement",
    event_label: phoneNumber ?? "primary",
    destination: "Phone",
  });
}

export function trackPropertyEnquiry(
  propertySlug: string,
  propertyTitle: string
): void {
  trackEvent("property_enquiry", {
    event_category: "Lead",
    property_slug: propertySlug,
    property_title: propertyTitle,
  });
}

export function trackContactFormSubmit(): void {
  trackEvent("contact_form_submit", {
    event_category: "Lead",
    event_label: "contact_page",
  });
}
