"use client";

import WhatsAppButton from "./WhatsAppButton";
import { PACKS, DELIVERY_AREAS } from "@/lib/config";
import { personalizedHeadline } from "@/lib/funnel";
import { trackEvent } from "@/lib/track";

export function Header({ onOpenForm }) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" className="font-display text-xl font-bold tracking-tight">
          <span className="text-fresh-700">Mama</span>
          <span className="text-warm-500">Fresh</span>{" "}
          <span className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-ink/50">Packs</span>
        </a>
        <nav className="hidden gap-7 text-sm font-medium text-ink/70 sm:flex" aria-label="Main">
          <a href="#packs" className="transition hover:text-warm-500">Packs</a>
          <a href="#how" className="transition hover:text-warm-500">How it works</a>
          <a href="#areas" className="transition hover:text-warm-500">Delivery</a>
          <a href="#faq" className="transition hover:text-warm-500">FAQ</a>
        </nav>
        <button onClick={onOpenForm} className="btn-clay !px-4 !py-2 !text-sm">
          Get my pack
        </button>
      </div>
    </header>
  );
}

const TICKER = ["Matoke", "Nduma", "Pumpkin", "Sweet Potatoes", "Indigenous Greens", "Baby Weaning Packs", "Mama Nutrition", "Family Dinners"];

export function Hero({ customerType, onOpenForm }) {
  const dynamic = personalizedHeadline(customerType);
  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft clay glow upper-right, green wash lower-left */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-warm-100 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-fresh-100 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-12 sm:pt-16 md:grid-cols-[1.15fr_0.85fr] md:items-center">
        <div>
          <p className="eyebrow rise rise-1">Fresh in Nairobi · Order on WhatsApp · Pay with M-Pesa</p>
          <h1 className="rise rise-2 mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-fresh-900 sm:text-5xl md:text-6xl">
            {dynamic || (
              <>
                Fresh traditional food,{" "}
                <em className="font-display italic text-warm-500">prepped</em>{" "}
                for busy mothers
              </>
            )}
          </h1>
          <p className="rise rise-3 mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
            Clean, peeled, portioned, ready-to-cook matoke, nduma, pumpkin, sweet
            potatoes, and greens — delivered to your door in Nairobi.
          </p>
          <p className="rise rise-3 mt-3 max-w-xl text-sm font-medium text-fresh-600">
            MamaFresh is your AI-assisted meal prep partner for pregnancy, baby
            weaning, toddler meals, and family dinners — order on WhatsApp in
            under one minute.
          </p>
          <div className="rise rise-4 mt-7 flex flex-wrap gap-3">
            <WhatsAppButton section="hero" />
            <a
              href="#packs"
              onClick={() => trackEvent("product_view", { section: "hero_view_packs" })}
              className="btn-secondary"
            >
              View Today's Packs
            </a>
          </div>
          <p className="rise rise-5 mt-5 text-sm text-ink/55">
            Perfect for pregnancy meals, baby weaning, toddler food, and family dinners.
          </p>
        </div>

        <div className="rise rise-4 relative">
          {/* Replace with a real photo: put hero.jpg in /public and swap this block for next/image */}
          <div className="relative mx-auto aspect-[4/5] max-w-xs rotate-2 rounded-[2.5rem] border border-ink/10 bg-gradient-to-br from-fresh-50 via-cream to-warm-100 p-8 shadow-2xl shadow-fresh-900/10 md:max-w-sm">
            <div className="dots absolute inset-4 rounded-[2rem] opacity-60" aria-hidden="true" />
            <div className="relative flex h-full flex-col items-center justify-center text-center">
              <div className="floaty text-7xl" aria-hidden="true">🥬</div>
              <div className="mt-2 text-5xl" aria-hidden="true">🍠 🎃</div>
              <p className="mt-6 font-display text-lg font-medium italic text-fresh-700">
                washed · peeled · cut
              </p>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-warm-500">
                ready to cook
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* food ticker */}
      <div className="relative border-y border-fresh-700/20 bg-fresh-700 py-2.5" aria-hidden="true">
        <div className="ticker-track font-display text-sm font-medium italic text-cream/90">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="mx-5 inline-flex items-center gap-5">
              {item} <span className="text-sun">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Problem() {
  const pains = [
    "Going to the market takes time you don't have",
    "Peeling matoke and nduma is tiring after a long day",
    "Food preparation creates waste in your kitchen",
    "You want healthy meals but time is limited",
    "Baby food needs extra care and cleanliness",
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="eyebrow text-center">The daily struggle</p>
      <h2 className="section-title mt-3 text-center">
        Healthy meals should not take your whole afternoon
      </h2>
      <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
        {pains.map((p, i) => (
          <li key={p} className={`card flex items-start gap-3 !p-4 ${i === 4 ? "sm:col-span-2" : ""}`}>
            <span aria-hidden="true" className="mt-0.5 font-display text-lg italic text-warm-500">✦</span>
            <span className="text-sm leading-relaxed text-ink/80">{p}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Solution() {
  return (
    <section className="relative overflow-hidden bg-fresh-700 text-cream">
      <div className="dots absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="font-display text-3xl font-semibold italic leading-snug sm:text-5xl">
          “We prep. You cook.<br />Your family eats fresh.”
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-cream/85">
          MamaFresh does the washing, peeling, cutting, and portioning so you can
          cook faster and feed your family better — the traditional way.
        </p>
      </div>
    </section>
  );
}

export function Packs({ onSelectPack }) {
  return (
    <section id="packs" className="mx-auto max-w-6xl px-4 py-16">
      <p className="eyebrow text-center">Today's menu</p>
      <h2 className="section-title mt-3 text-center">The MamaFresh Packs</h2>
      <p className="mt-3 text-center text-sm text-ink/60">
        Tap a pack to order it directly on WhatsApp.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PACKS.map((pack, i) => (
          <article
            key={pack.id}
            className="card group flex flex-col hover:-translate-y-1.5 hover:shadow-xl hover:shadow-fresh-900/10"
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-sm italic text-ink/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              {pack.tag && (
                <span className="rounded-full bg-warm-100 px-2.5 py-0.5 text-xs font-semibold text-warm-600">
                  {pack.tag}
                </span>
              )}
            </div>
            <div className="mt-2 text-5xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
              {pack.emoji}
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-fresh-900">{pack.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{pack.description}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-ink/45">
              Best for: {pack.bestFor}
            </p>
            <p className="mt-3 font-display text-lg font-bold text-warm-500">{pack.price}</p>
            <div className="mt-4 flex-1" />
            <WhatsAppButton
              section={`pack_card_${pack.id}`}
              productInterest={pack.name}
              message={`Hi MamaFresh, I would like to order the ${pack.name}. Please send me today's availability and prices.`}
              className="btn-wa w-full !py-2.5 !text-sm"
            >
              {pack.cta}
            </WhatsAppButton>
            <button
              onClick={() => onSelectPack(pack)}
              className="mt-2.5 text-xs font-semibold text-fresh-600 underline-offset-4 hover:underline"
            >
              Not sure? Get a recommendation →
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    "Choose your pack",
    "Click Order on WhatsApp",
    "Send your location",
    "Confirm your order and pay via M-Pesa",
    "Receive your ready-to-cook food pack",
  ];
  return (
    <section id="how" className="border-y border-ink/10 bg-white/60">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <p className="eyebrow text-center">Simple by design</p>
        <h2 className="section-title mt-3 text-center">Ordering takes less than 1 minute</h2>
        <ol className="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-col items-center gap-3 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-fresh-600 font-display text-lg font-bold italic text-fresh-600">
                {i + 1}
              </span>
              <span className="text-sm leading-snug text-ink/75">{s}</span>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <WhatsAppButton section="how_it_works" />
        </div>
      </div>
    </section>
  );
}

export function Benefits() {
  const items = [
    ["⏱️", "Saves 45–75 minutes of prep time"],
    ["🗑️", "Reduces kitchen waste"],
    ["🧼", "Cleaned and portioned"],
    ["👶", "Baby- and family-friendly"],
    ["🛵", "Delivered in Nairobi"],
    ["📱", "Easy M-Pesa payment"],
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="eyebrow text-center">Why mothers choose us</p>
      <h2 className="section-title mt-3 text-center">Made for real Nairobi kitchens</h2>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map(([icon, text], i) => (
          <div
            key={text}
            className={`card flex flex-col items-center gap-2.5 !p-5 text-center hover:-translate-y-1 ${i % 2 === 1 ? "sm:translate-y-3" : ""}`}
          >
            <span className="text-3xl" aria-hidden="true">{icon}</span>
            <span className="text-sm font-medium leading-snug text-ink/80">{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DeliveryAreas() {
  return (
    <section id="areas" className="dots border-y border-ink/10 bg-warm-100/50">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        <p className="eyebrow">Where we deliver</p>
        <h2 className="section-title mt-3">Across Nairobi, growing weekly</h2>
        <div className="mx-auto mt-7 flex max-w-2xl flex-wrap justify-center gap-2.5">
          {DELIVERY_AREAS.map((area) => (
            <span
              key={area}
              className="rounded-full border border-fresh-600/25 bg-cream px-4 py-1.5 text-sm font-medium text-fresh-700"
            >
              {area}
            </span>
          ))}
        </div>
        <p className="mt-7 text-sm text-ink/65">
          Not sure if we deliver to your area? Message us on WhatsApp.
        </p>
        <div className="mt-4">
          <WhatsAppButton
            section="delivery_areas"
            message="Hi MamaFresh, do you deliver to my area? My estate is: "
            className="btn-secondary"
          >
            Check my estate on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const quotes = [
    ["MamaFresh saves me so much time after work. I just open the pack and cook.", "Mama Wanjiru, Kilimani"],
    ["It made weaning easier because the portions are simple and clean.", "Mama Amani, South C"],
    ["I no longer waste food because the packs are already portioned.", "Mama Njeri, Ruaka"],
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="eyebrow text-center">Word of mouth</p>
      <h2 className="section-title mt-3 text-center">Loved by Nairobi mothers</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {quotes.map(([q, who], i) => (
          <figure key={who} className={`card relative !pt-10 ${i === 1 ? "sm:-translate-y-3" : ""}`}>
            <span aria-hidden="true" className="absolute left-5 top-2 font-display text-5xl italic leading-none text-warm-500/70">
              “
            </span>
            <blockquote className="font-display text-base italic leading-relaxed text-ink/85">{q}</blockquote>
            <figcaption className="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-fresh-600">
              {who}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function FinalCTA({ onOpenForm }) {
  return (
    <section className="relative overflow-hidden bg-fresh-900 text-cream">
      <div className="dots absolute inset-0 opacity-15" aria-hidden="true" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-warm-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="font-display text-3xl font-semibold leading-tight sm:text-5xl">
          Ready to make healthy meals{" "}
          <em className="italic text-sun">easier?</em>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/80">
          Order your MamaFresh Pack today and spend less time prepping and more
          time with your family.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <WhatsAppButton section="final_cta" className="btn-clay">
            Order on WhatsApp Now
          </WhatsAppButton>
          <button onClick={onOpenForm} className="btn-secondary !border-cream/60 !text-cream hover:!bg-cream/10">
            Help me choose a pack
          </button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-10 text-center text-xs text-ink/50">
        <p className="font-display text-base font-semibold italic text-fresh-700">
          MamaFresh Packs · Nairobi, Kenya
        </p>
        <p className="mt-2">Healthy traditional food, prepped for busy mothers. Order on WhatsApp. Cook in minutes.</p>
        <p className="mt-2">© {new Date().getFullYear()} MamaFresh Packs. All rights reserved.</p>
      </div>
    </footer>
  );
}
