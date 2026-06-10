"use client";

import { waLink } from "@/lib/funnel";
import { trackEvent, saveWhatsAppClick, syncToSheets } from "@/lib/track";

function WaIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.9 5 2.3 7L4 29l7.3-2.3c1.9 1 3.8 1.5 4.7 1.5 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm6 16.6c-.3.8-1.5 1.5-2.4 1.7-.6.1-1.4.2-4.2-.9-3.5-1.5-5.8-5-6-5.3-.2-.2-1.4-1.9-1.4-3.7s.9-2.6 1.3-3c.3-.3.7-.4 1-.4h.7c.2 0 .5-.1.8.6l1.1 2.7c.1.2.2.5 0 .7l-.4.7-.6.6c-.2.2-.4.4-.2.8.2.3 1 1.7 2.2 2.7 1.5 1.4 2.8 1.8 3.2 2 .4.2.6.1.8-.1l1.3-1.5c.3-.4.5-.3.9-.2l2.6 1.2c.4.2.7.3.8.5.1.2.1.9-.2 1.6z" />
    </svg>
  );
}

// Every WhatsApp button on the page goes through this component so each
// click is tracked in Supabase + Google Sheets before WhatsApp opens.
export default function WhatsAppButton({
  message,
  section = "unknown",
  productInterest = null,
  customerType = null,
  deliveryEstate = null,
  leadId = null,
  className = "btn-wa",
  children,
}) {
  const href = waLink(message);

  function handleClick() {
    // Fire-and-forget tracking; never blocks WhatsApp from opening.
    trackEvent("whatsapp_order_click", {
      lead_id: leadId,
      section,
      product_interest: productInterest,
      customer_type: customerType,
    });
    saveWhatsAppClick({
      lead_id: leadId,
      product_interest: productInterest,
      customer_type: customerType,
      delivery_estate: deliveryEstate,
      whatsapp_message: message || null,
      click_source_section: section,
    });
    syncToSheets("whatsapp_clicks", {
      date: new Date().toISOString(),
      supabase_lead_id: leadId || "",
      product_interest: productInterest || "",
      customer_type: customerType || "",
      delivery_estate: deliveryEstate || "",
      click_source_section: section,
      whatsapp_message: message || "",
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      aria-label="Order on WhatsApp"
    >
      <WaIcon />
      {children || "Order on WhatsApp"}
    </a>
  );
}

export { WaIcon };
