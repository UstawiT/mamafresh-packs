"use client";

import { useEffect, useRef, useState } from "react";
import {
  CUSTOMER_TYPES, ORDER_FREQUENCIES, FOOD_INTERESTS,
  DELIVERY_AREAS, LEAD_SOURCES,
} from "@/lib/config";
import {
  recommendPack, buildWhatsAppMessage, scoreLead, leadTier, waLink,
} from "@/lib/funnel";
import {
  saveLead, saveAbandonedLead, trackEvent, syncToSheets,
} from "@/lib/track";
import { WaIcon } from "./WhatsAppButton";

const EMPTY = {
  ordering_for: "", customer_type: "", delivery_estate: "",
  order_frequency: "", product_interest: [], name: "",
  whatsapp_number: "", lead_source: "direct", consent: true,
};

export default function LeadForm({ open, onClose, onCustomerType, presetPack }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const touched = useRef(false);
  const submitted = useRef(false);

  // ---- Abandoned lead tracking ----
  // If the visitor starts the form but leaves without finishing,
  // store a partial record marked as abandoned.
  useEffect(() => {
    function flushAbandoned() {
      if (!touched.current || submitted.current) return;
      submitted.current = true; // prevent double-fire
      const record = {
        whatsapp_number: form.whatsapp_number || null,
        phone: form.whatsapp_number || null,
        product_interest: form.product_interest.join(", ") || null,
        customer_type: form.customer_type || null,
        delivery_estate: form.delivery_estate || null,
        last_action: `form_step_${step}`,
        follow_up_status: "pending_30min",
      };
      saveAbandonedLead(record);
      trackEvent("abandoned_lead_created", { section: "lead_form", customer_type: form.customer_type });
      syncToSheets("abandoned_leads", {
        date_captured: new Date().toISOString(),
        supabase_lead_id: "",
        phone: record.phone || "",
        whatsapp_number: record.whatsapp_number || "",
        product_interest: record.product_interest || "",
        customer_type: record.customer_type || "",
        delivery_estate: record.delivery_estate || "",
        last_action: record.last_action,
        follow_up_status: "pending_30min",
        next_follow_up_date: new Date(Date.now() + 30 * 60000).toISOString(),
      });
    }
    function onHide() {
      if (document.visibilityState === "hidden") flushAbandoned();
    }
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, [form, step]);

  if (!open) return null;

  function set(key, value) {
    touched.current = true;
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleFood(food) {
    touched.current = true;
    setForm((f) => ({
      ...f,
      product_interest: f.product_interest.includes(food)
        ? f.product_interest.filter((x) => x !== food)
        : [...f.product_interest, food],
    }));
  }

  async function handleSubmit() {
    setSubmitting(true);
    submitted.current = true;
    const message = buildWhatsAppMessage(form);
    const rec = recommendPack(form.customer_type, form.order_frequency);
    const score = scoreLead({
      ...form,
      product_interest: form.product_interest.join(", "),
      clicked_whatsapp: false,
    });
    const tier = leadTier(score);

    trackEvent("ai_recommendation_generated", {
      customer_type: form.customer_type,
      product_interest: rec.pack?.name,
    });

    const leadRow = {
      name: form.name || null,
      phone: form.whatsapp_number || null,
      whatsapp_number: form.whatsapp_number || null,
      delivery_estate: form.delivery_estate || null,
      customer_type: form.customer_type || null,
      product_interest: form.product_interest.join(", ") || rec.pack?.name || null,
      order_frequency: form.order_frequency || null,
      preferred_delivery_day: null,
      lead_source: form.lead_source,
      consent_to_whatsapp_updates: !!form.consent,
      lead_score: score,
      lead_tier: tier,
      whatsapp_message: message,
      last_action: "lead_form_submitted",
      follow_up_status: "new",
    };

    const { data } = await saveLead(leadRow);
    const leadId = data?.id || null;

    trackEvent("lead_form_submitted", {
      lead_id: leadId,
      customer_type: form.customer_type,
      product_interest: leadRow.product_interest,
      metadata: { lead_score: score, lead_tier: tier },
    });
    syncToSheets("leads", {
      date_captured: new Date().toISOString(),
      name: form.name || "",
      phone: form.whatsapp_number || "",
      whatsapp_number: form.whatsapp_number || "",
      delivery_estate: form.delivery_estate || "",
      customer_type: form.customer_type || "",
      product_interest: leadRow.product_interest || "",
      order_frequency: form.order_frequency || "",
      preferred_delivery_day: "",
      lead_source: form.lead_source,
      lead_score: score,
      whatsapp_message: message,
      consent: form.consent ? "yes" : "no",
      last_action: "lead_form_submitted",
      follow_up_status: "new",
      supabase_lead_id: leadId || "",
    });

    if (form.customer_type) onCustomerType(form.customer_type);
    setResult({ message, rec, score, tier, leadId });
    setSubmitting(false);
  }

  const steps = [
    // Step 0: who is it for
    <div key="s0">
      <h3 className="text-lg font-bold">Who are you ordering for?</h3>
      <div className="mt-4 grid gap-2">
        {["Myself", "My baby", "My family"].map((o) => (
          <button key={o}
            onClick={() => { set("ordering_for", o); setStep(1); }}
            className={`rounded-xl border-2 p-3 text-left text-sm font-medium transition ${form.ordering_for === o ? "border-fresh-500 bg-fresh-50" : "border-black/10 hover:border-fresh-500"}`}>
            {o}
          </button>
        ))}
      </div>
    </div>,
    // Step 1: customer type
    <div key="s1">
      <h3 className="text-lg font-bold">Which best describes you?</h3>
      <div className="mt-4 grid gap-2">
        {CUSTOMER_TYPES.map((t) => (
          <button key={t.id}
            onClick={() => { set("customer_type", t.id); onCustomerType(t.id); setStep(2); }}
            className={`rounded-xl border-2 p-3 text-left text-sm font-medium transition ${form.customer_type === t.id ? "border-fresh-500 bg-fresh-50" : "border-black/10 hover:border-fresh-500"}`}>
            {t.label}
          </button>
        ))}
      </div>
    </div>,
    // Step 2: delivery area
    <div key="s2">
      <h3 className="text-lg font-bold">Where should we deliver?</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {DELIVERY_AREAS.map((a) => (
          <button key={a}
            onClick={() => { set("delivery_estate", a); setStep(3); }}
            className={`rounded-full border-2 px-3 py-1.5 text-sm font-medium transition ${form.delivery_estate === a ? "border-fresh-500 bg-fresh-50" : "border-black/10 hover:border-fresh-500"}`}>
            {a}
          </button>
        ))}
      </div>
      <input
        type="text" placeholder="Or type your estate…" value={form.delivery_estate}
        onChange={(e) => set("delivery_estate", e.target.value)}
        className="mt-3 w-full rounded-xl border-2 border-black/10 p-3 text-sm focus:border-fresh-500 focus:outline-none"
        aria-label="Delivery estate"
      />
      <button onClick={() => setStep(3)} className="btn-wa mt-4 w-full !py-2.5 !text-sm">Continue</button>
    </div>,
    // Step 3: frequency
    <div key="s3">
      <h3 className="text-lg font-bold">How often would you like to order?</h3>
      <div className="mt-4 grid gap-2">
        {ORDER_FREQUENCIES.map((f) => (
          <button key={f.id}
            onClick={() => {
              set("order_frequency", f.id);
              if (f.id === "weekly" || f.id === "twice_weekly")
                trackEvent("subscription_interest_clicked", { section: "lead_form" });
              setStep(4);
            }}
            className={`rounded-xl border-2 p-3 text-left text-sm font-medium transition ${form.order_frequency === f.id ? "border-fresh-500 bg-fresh-50" : "border-black/10 hover:border-fresh-500"}`}>
            {f.label}
          </button>
        ))}
      </div>
    </div>,
    // Step 4: food interests + contact
    <div key="s4">
      <h3 className="text-lg font-bold">What foods are you interested in?</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {FOOD_INTERESTS.map((food) => (
          <button key={food} onClick={() => toggleFood(food)}
            className={`rounded-full border-2 px-3 py-1.5 text-sm font-medium transition ${form.product_interest.includes(food) ? "border-fresh-500 bg-fresh-50" : "border-black/10 hover:border-fresh-500"}`}>
            {food}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-2">
        <input type="text" placeholder="Your name (optional)" value={form.name}
          onChange={(e) => set("name", e.target.value)}
          className="w-full rounded-xl border-2 border-black/10 p-3 text-sm focus:border-fresh-500 focus:outline-none"
          aria-label="Your name" />
        <input type="tel" placeholder="WhatsApp number e.g. 07XX XXX XXX (optional)" value={form.whatsapp_number}
          onChange={(e) => set("whatsapp_number", e.target.value)}
          className="w-full rounded-xl border-2 border-black/10 p-3 text-sm focus:border-fresh-500 focus:outline-none"
          aria-label="WhatsApp number" />
        <select value={form.lead_source} onChange={(e) => set("lead_source", e.target.value)}
          className="w-full rounded-xl border-2 border-black/10 bg-white p-3 text-sm focus:border-fresh-500 focus:outline-none"
          aria-label="How did you hear about us">
          <option value="" disabled>How did you hear about us?</option>
          {LEAD_SOURCES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        <label className="flex items-center gap-2 text-xs text-ink/70">
          <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)}
            className="h-4 w-4 accent-fresh-500" />
          Send me MamaFresh updates and offers on WhatsApp
        </label>
      </div>
      <button onClick={handleSubmit} disabled={submitting} className="btn-wa mt-4 w-full disabled:opacity-60">
        {submitting ? "Preparing your pack…" : "Get my recommendation"}
      </button>
    </div>,
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      role="dialog" aria-modal="true" aria-label="Get a pack recommendation">
      <div className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-6 sm:rounded-3xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-fresh-600">
            {result ? "Your perfect pack" : `Step ${step + 1} of ${steps.length}`}
          </span>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-ink/50 hover:bg-black/5">✕</button>
        </div>

        {!result ? (
          <>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
              <div className="h-full rounded-full bg-fresh-500 transition-all"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
            </div>
            <div className="mt-4">{steps[step]}</div>
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="mt-3 text-xs font-medium text-ink/50 hover:text-ink">
                ← Back
              </button>
            )}
          </>
        ) : (
          <div className="mt-4 text-center">
            <div className="text-5xl" aria-hidden="true">{result.rec.pack?.emoji}</div>
            <h3 className="mt-3 text-xl font-bold">{result.rec.pack?.name}</h3>
            <p className="mt-2 text-sm text-ink/70">{result.rec.copy}</p>
            <p className="mt-2 text-base font-bold text-fresh-700">{result.rec.pack?.price}</p>
            <div className="mt-4 rounded-xl bg-fresh-50 p-3 text-left text-xs text-ink/70">
              <p className="font-semibold text-fresh-700">Your WhatsApp message is ready:</p>
              <p className="mt-1 italic">"{result.message}"</p>
            </div>
            <a href={waLink(result.message)} target="_blank" rel="noopener noreferrer"
              onClick={() => {
                trackEvent("whatsapp_order_click", {
                  lead_id: result.leadId, section: "lead_form_result",
                  customer_type: form.customer_type, product_interest: result.rec.pack?.name,
                });
              }}
              className="btn-wa mt-4 w-full">
              <WaIcon /> Send order on WhatsApp
            </a>
            <button onClick={onClose} className="mt-3 text-xs font-medium text-ink/50 hover:text-ink">
              Maybe later
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
