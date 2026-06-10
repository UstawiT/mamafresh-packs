// ============================================================
// BUSINESS CONFIGURATION - edit this file to update the site.
// WhatsApp number comes from NEXT_PUBLIC_WHATSAPP_NUMBER env var.
// ============================================================

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254700000000";

export const DEFAULT_WA_MESSAGE =
  "Hi MamaFresh, I would like to order. Please send me today's available packs and prices.";

// ---- PRODUCT PACKS (UPDATE PRICES HERE) ----
export const PACKS = [
  {
    id: "baby_weaning",
    name: "Baby Weaning Starter Pack",
    emoji: "🍼",
    description: "Soft traditional foods portioned for babies starting solid foods.",
    bestFor: "6 months+ babies",
    price: "KSh 850", // UPDATE PRICE
    cta: "Order Baby Pack",
    tag: "Most loved by new mums",
  },
  {
    id: "mama_nutrition",
    name: "Mama Nutrition Pack",
    emoji: "🤰",
    description: "Nutritious traditional foods for pregnant and breastfeeding mothers.",
    bestFor: "Pregnancy and postpartum meals",
    price: "KSh 1,200", // UPDATE PRICE
    cta: "Order Mama Pack",
  },
  {
    id: "toddler_meal",
    name: "Toddler Meal Prep Pack",
    emoji: "🧒",
    description: "Soft, clean, ready-to-cook traditional foods for growing children.",
    bestFor: "Toddlers and young children",
    price: "KSh 950", // UPDATE PRICE
    cta: "Order Toddler Pack",
  },
  {
    id: "family_dinner",
    name: "Family Dinner Prep Pack",
    emoji: "🍲",
    description: "Ready-to-cook portions for quick family meals.",
    bestFor: "Busy households and weekly meal planning",
    price: "KSh 1,500", // UPDATE PRICE
    cta: "Order Family Pack",
  },
  {
    id: "weekly_subscription",
    name: "MamaFresh Weekly Subscription",
    emoji: "📦",
    description: "Scheduled weekly delivery of ready-to-cook traditional food packs.",
    bestFor: "Families that want predictable weekly meal prep support",
    price: "From KSh 4,500/week", // UPDATE PRICE
    cta: "Start Weekly Order",
    tag: "Best value",
  },
];

// ---- DELIVERY AREAS (UPDATE AS YOU EXPAND) ----
export const DELIVERY_AREAS = [
  "Kilimani", "Kileleshwa", "Lavington", "South B", "South C",
  "Lang'ata", "Ruaka", "Thindigua", "Selected Eastlands areas",
];

export const CUSTOMER_TYPES = [
  { id: "pregnant", label: "Pregnant mother" },
  { id: "new_mother", label: "New mother (breastfeeding)" },
  { id: "baby_weaning", label: "Weaning a baby (6 months+)" },
  { id: "toddler", label: "Feeding a toddler" },
  { id: "family", label: "Buying for family meals" },
];

export const ORDER_FREQUENCIES = [
  { id: "today_only", label: "Today only" },
  { id: "weekly", label: "Weekly" },
  { id: "twice_weekly", label: "Twice per week" },
  { id: "monthly", label: "Monthly meal prep" },
];

export const FOOD_INTERESTS = [
  "Matoke", "Nduma", "Pumpkin", "Sweet potatoes", "Greens",
  "Baby weaning pack", "Family dinner pack", "Weekly subscription",
];

export const LEAD_SOURCES = [
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "google", label: "Google" },
  { id: "whatsapp_referral", label: "WhatsApp referral" },
  { id: "direct", label: "Just found you" },
];

// ---- FAQ / SUPPORT KNOWLEDGE BASE ----
export const KNOWLEDGE_BASE = [
  {
    keywords: ["order", "how do i", "buy", "purchase"],
    question: "How do I order?",
    answer: "Click the WhatsApp button, choose your pack, send your location, and confirm your order. It takes less than a minute.",
  },
  {
    keywords: ["deliver", "delivery", "estate", "area", "where", "office"],
    question: "Do you deliver to my area?",
    answer: "Yes, we deliver to selected Nairobi estates including Kilimani, Kileleshwa, Lavington, South B, South C, Lang'ata, Ruaka and Thindigua - and we are expanding. Click the WhatsApp button and send your location so our team can confirm availability and delivery time.",
  },
  {
    keywords: ["cooked", "raw", "fresh", "ready"],
    question: "Is the food cooked?",
    answer: "No. The food is fresh and raw - cleaned, peeled, cut, portioned, and ready to cook. You cook it your way, in minutes.",
  },
  {
    keywords: ["baby", "weaning", "wean", "6 months", "solid"],
    question: "Can I order for baby weaning?",
    answer: "Yes. Our Baby Weaning Starter Pack has simple traditional foods suitable for babies from 6 months. Always follow your doctor or nutritionist's advice where needed. Message us on WhatsApp to order.",
  },
  {
    keywords: ["pay", "mpesa", "m-pesa", "payment", "price", "cost", "much"],
    question: "How do I pay?",
    answer: "You pay through M-Pesa after confirming your order on WhatsApp. Message us and we'll send today's prices.",
  },
  {
    keywords: ["weekly", "subscription", "every week", "repeat"],
    question: "Can I order every week?",
    answer: "Yes! The MamaFresh Weekly Subscription delivers ready-to-cook packs on a schedule that suits you. Click the WhatsApp button and ask about weekly delivery.",
  },
  {
    keywords: ["store", "storage", "fridge", "fresh", "keep", "long", "last"],
    question: "How do I store the packs?",
    answer: "Keep your packs refrigerated and cook within the recommended time on the label. Ask us on WhatsApp for storage tips for your specific pack.",
  },
  {
    keywords: ["custom", "customize", "customise", "change", "swap", "mix"],
    question: "Can I customize my pack?",
    answer: "Yes, you can request custom packs through WhatsApp depending on available stock. Message us with what you need.",
  },
  {
    keywords: ["today", "available", "stock", "packs"],
    question: "What packs are available today?",
    answer: "Availability changes daily based on the freshest produce. Click the WhatsApp button and we'll send you today's available packs and prices right away.",
  },
];

export const FALLBACK_ANSWER =
  "Great question! Our team can answer that right away on WhatsApp. Click the Order on WhatsApp button and send us your question - we usually reply within minutes.";
