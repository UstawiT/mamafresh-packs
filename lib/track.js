import { supabase } from "./supabaseClient";

// Forward a record to the server-side Google Sheets sync route.
// Fire-and-forget: never blocks the user journey.
export function syncToSheets(tab, record) {
  try {
    fetch("/api/sync-sheets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tab, record }),
      keepalive: true,
    }).catch(() => {});
  } catch (_) {}
}

// ---- Analytics events ----
// Tracked events: page_view, product_view, pack_selected,
// ai_recommendation_generated, whatsapp_order_click, lead_form_submitted,
// faq_opened, subscription_interest_clicked, abandoned_lead_created,
// google_sheet_sync_success, google_sheet_sync_failed
export async function trackEvent(eventName, props = {}) {
  // Placeholder hooks for GA4 / Meta Pixel:
  if (typeof window !== "undefined") {
    if (window.gtag) window.gtag("event", eventName, props);
    if (window.fbq) window.fbq("trackCustom", eventName, props);
  }
  if (!supabase) return;
  try {
    await supabase.from("analytics_events").insert({
      lead_id: props.lead_id || null,
      event_name: eventName,
      event_source: props.source || "landing_page",
      page_section: props.section || null,
      product_interest: props.product_interest || null,
      customer_type: props.customer_type || null,
      metadata: props.metadata || {},
    });
  } catch (_) {}
}

// ---- Lead storage ----
export async function saveLead(lead) {
  if (!supabase) return { data: null, error: "no-supabase" };
  try {
    const { data, error } = await supabase
      .from("leads")
      .insert(lead)
      .select("id")
      .single();
    return { data, error };
  } catch (e) {
    return { data: null, error: e };
  }
}

export async function saveWhatsAppClick(click) {
  if (!supabase) return;
  try {
    await supabase.from("whatsapp_clicks").insert(click);
  } catch (_) {}
}

export async function saveSupportQuestion(q) {
  if (!supabase) return;
  try {
    await supabase.from("support_questions").insert(q);
  } catch (_) {}
}

export async function saveAbandonedLead(record) {
  if (!supabase) return;
  try {
    await supabase.from("abandoned_leads").insert(record);
  } catch (_) {}
}
