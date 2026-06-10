# MamaFresh Packs — AI-Assisted Landing Page

Mobile-first landing page + WhatsApp sales funnel for MamaFresh Packs, a Nairobi
ready-to-cook traditional food brand. Built with Next.js, React, Tailwind CSS,
Supabase, Google Sheets sync, deployed on Vercel.

**Primary conversion goal: Click WhatsApp → Send order message → Confirm order.**

## What's included

- Full landing page (hero, problem/solution, 5 product packs, how-it-works,
  benefits, delivery areas, testimonials, FAQ assistant, final CTA)
- WhatsApp click-to-order buttons everywhere + sticky floating button
- AI lead capture form (5 steps) with product recommendation + personalized
  WhatsApp message generation
- Lead scoring (high ≥ 60 / medium 25–59 / low < 25)
- Abandoned lead tracking (form started but not finished)
- On-page FAQ support assistant (every question logged)
- Supabase storage: `leads`, `whatsapp_clicks`, `support_questions`,
  `abandoned_leads`, `analytics_events`
- Google Sheets sync via Apps Script webhook (Leads, WhatsApp Clicks,
  Abandoned Leads, Support Questions, Daily Summary tabs)
- SEO metadata + Open Graph tags
- WhatsApp ordering ALWAYS works even if the database is down (graceful fallback)

## Where to update things (cheat sheet)

| What | Where |
|---|---|
| **WhatsApp number** | `NEXT_PUBLIC_WHATSAPP_NUMBER` env var (Vercel → Settings → Environment Variables), no plus sign, e.g. `254712345678` |
| **Product prices** | `lib/config.js` → `PACKS` array (`price` field) |
| **Delivery areas** | `lib/config.js` → `DELIVERY_AREAS` array |
| **Pack names/descriptions** | `lib/config.js` → `PACKS` |
| **FAQ answers** | `lib/config.js` → `KNOWLEDGE_BASE` |
| **Images** | Put photos in `/public` and replace the placeholder block in `components/Sections.jsx` (Hero) with `<Image src="/hero.jpg" …/>` |
| **Supabase keys** | `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` env vars |
| **Google Sheets webhook** | `GOOGLE_SHEETS_WEBHOOK_URL` env var (server-side only) |

## Local development

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
```

Production build: `npm run build && npm start`

## 1. Supabase setup

Already provisioned for this deployment:
- Project: `mamafresh-packs` (ref `rmfsfysekgteubxvjswf`, https://rmfsfysekgteubxvjswf.supabase.co)
- All 5 tables created with Row Level Security (anonymous visitors can only INSERT)

To recreate from scratch: create a project at https://supabase.com, open the
SQL Editor, and run `supabase/schema.sql`. Then copy Project Settings → API →
URL and anon key into the env vars.

**Viewing your leads:** Supabase Dashboard → Table Editor → `leads`.
Export CSV anytime from the table editor (manual fallback if Sheets sync is off).

## 2. Google Sheets setup (~5 minutes)

1. Create a Google Sheet named **MamaFresh Leads**.
2. Extensions → Apps Script → paste the contents of `google-apps-script/Code.gs`.
3. Deploy → New deployment → **Web app** → Execute as **Me**, access **Anyone** → Deploy.
4. Copy the Web App URL (ends in `/exec`).
5. In Vercel → Settings → Environment Variables add
   `GOOGLE_SHEETS_WEBHOOK_URL=<that URL>` → Redeploy.
6. (Optional) In Apps Script, run `setupDailyTrigger()` once to enable the
   nightly **Daily Summary** tab refresh.

Tabs (Leads, WhatsApp Clicks, Abandoned Leads, Support Questions) are created
automatically on first write. Until the webhook is configured the site works
fine — records still land in Supabase.

## 3. Vercel deployment

```bash
npm i -g vercel
vercel        # link/create project
vercel --prod
```

Set these in Vercel → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://rmfsfysekgteubxvjswf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
NEXT_PUBLIC_WHATSAPP_NUMBER=2547XXXXXXXX
NEXT_PUBLIC_SITE_URL=https://<your-domain>
GOOGLE_SHEETS_WEBHOOK_URL=<apps script /exec url>
```

Changing a `NEXT_PUBLIC_*` var requires a redeploy (they are baked at build time).

## Abandoned lead follow-up (operations playbook)

Abandoned leads land in Supabase (`abandoned_leads`) and the **Abandoned Leads**
sheet tab with `follow_up_status = pending_30min`. Suggested WhatsApp follow-ups:

- **After 30 min:** "Hi Mama, would you like us to help you choose the best pack for today?"
- **After 24 h:** "Hi Mama, today's fresh packs are available. Would you like Baby Weaning, Mama Nutrition, or Family Dinner Pack?"
- **After 3 days:** "Planning meals for the week? MamaFresh can prepare your matoke, nduma, pumpkin, sweet potatoes, and greens for easy cooking."

Update the Follow-up Status column as you work the list
(`pending_30min → contacted → converted / closed`).

## Lead scoring reference

| Signal | Points |
|---|---|
| Clicked WhatsApp | +30 |
| Phone/WhatsApp number provided | +25 |
| Weekly / twice-weekly frequency | +20 |
| Delivery estate provided | +15 |
| Baby weaning or family pack | +10 |
| Asked about price/delivery | +10 |
| Product interest selected | +10 |
| Viewed packs / opened FAQ | +5 each |

Tier: **high ≥ 60**, **medium 25–59**, **low < 25** (capped at 100).

## Analytics events tracked

`page_view`, `product_view`, `pack_selected`, `ai_recommendation_generated`,
`whatsapp_order_click`, `lead_form_submitted`, `faq_opened`,
`subscription_interest_clicked`, `abandoned_lead_created` — all stored in
`analytics_events`. GA4 (`window.gtag`) and Meta Pixel (`window.fbq`) hooks are
already in `lib/track.js`; just paste your tags into `app/layout.js`.

## WhatsApp chatbot flow (for future WhatsApp Business API)

**New customer:** greet → ask who they're ordering for (pregnancy / weaning /
toddler / family) → recommend pack → ask location → confirm delivery window →
share price → request M-Pesa → confirm order.

**Returning customer:** recognize → show last order → offer repeat → suggest
weekly subscription → confirm location → payment → confirm delivery.
