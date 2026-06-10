import { WHATSAPP_NUMBER, DEFAULT_WA_MESSAGE, PACKS, CUSTOMER_TYPES } from "./config";

// ---- WhatsApp link builder ----
export function waLink(message) {
  const text = encodeURIComponent(message || DEFAULT_WA_MESSAGE);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

// ---- AI Product Recommendation ----
export function recommendPack(customerType, orderFrequency) {
  if (orderFrequency === "weekly" || orderFrequency === "twice_weekly") {
    return {
      pack: PACKS.find((p) => p.id === "weekly_subscription"),
      copy: "Save time every week with scheduled delivery of ready-to-cook food packs.",
    };
  }
  switch (customerType) {
    case "pregnant":
    case "new_mother":
      return {
        pack: PACKS.find((p) => p.id === "mama_nutrition"),
        copy: "Best for pregnancy meals, postpartum nutrition, and healthy traditional home cooking.",
      };
    case "baby_weaning":
      return {
        pack: PACKS.find((p) => p.id === "baby_weaning"),
        copy: "Best for babies starting solid foods from 6 months+.",
      };
    case "toddler":
      return {
        pack: PACKS.find((p) => p.id === "toddler_meal"),
        copy: "Soft, clean, ready-to-cook traditional foods for growing children.",
      };
    case "family":
    default:
      return {
        pack: PACKS.find((p) => p.id === "family_dinner"),
        copy: "Best for busy households that want traditional meals without long preparation time.",
      };
  }
}

// ---- Personalized hero headline ----
export function personalizedHeadline(customerType) {
  switch (customerType) {
    case "baby_weaning":
      return "Make Baby Weaning Easier with Clean, Ready-to-Cook Traditional Foods.";
    case "pregnant":
    case "new_mother":
      return "Nutritious Traditional Meal Prep for Pregnancy and Postpartum.";
    case "family":
      return "Spend Less Time Prepping and More Time with Your Family.";
    case "weekly":
      return "Plan Your Weekly Family Meals Without Market Stress.";
    default:
      return null;
  }
}

// ---- Lead Scoring ----
// High intent >= 60, medium 25-59, low < 25
export function scoreLead(lead) {
  let score = 0;
  if (lead.clicked_whatsapp) score += 30;
  if (lead.order_frequency === "weekly" || lead.order_frequency === "twice_weekly") score += 20;
  if (lead.delivery_estate) score += 15;
  if (lead.customer_type === "baby_weaning" || lead.customer_type === "family") score += 10;
  if (lead.asked_about_price_or_delivery) score += 10;
  if (lead.phone || lead.whatsapp_number) score += 25;
  if (lead.product_interest) score += 10;
  if (lead.viewed_packs) score += 5;
  if (lead.opened_faq) score += 5;
  return Math.min(score, 100);
}

export function leadTier(score) {
  if (score >= 60) return "high";
  if (score >= 25) return "medium";
  return "low";
}

// ---- Personalized WhatsApp message generation ----
export function buildWhatsAppMessage(form) {
  const { pack } = recommendPack(form.customer_type, form.order_frequency);
  const typeLabel =
    CUSTOMER_TYPES.find((t) => t.id === form.customer_type)?.label || "";
  const parts = ["Hi MamaFresh, I would like to order."];
  if (pack) parts.push(`I am interested in the ${pack.name}.`);
  if (form.customer_type === "baby_weaning") parts.push("My baby is 6 months+.");
  else if (typeLabel) parts.push(`I am a ${typeLabel.toLowerCase()}.`);
  if (form.product_interest && form.product_interest.length)
    parts.push(`Foods I want: ${[].concat(form.product_interest).join(", ")}.`);
  if (form.delivery_estate) parts.push(`I am in ${form.delivery_estate}.`);
  if (form.order_frequency === "weekly") parts.push("I would like weekly delivery.");
  else if (form.order_frequency === "twice_weekly") parts.push("I would like delivery twice per week.");
  else if (form.order_frequency === "monthly") parts.push("I am planning monthly meal prep.");
  if (form.name) parts.push(`My name is ${form.name}.`);
  parts.push("Please send today's available packs and prices.");
  return parts.join(" ");
}
