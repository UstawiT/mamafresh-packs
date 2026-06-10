"use client";

import WhatsAppButton from "./WhatsAppButton";
import { PACKS, DELIVERY_AREAS } from "@/lib/config";
import { personalizedHeadline } from "@/lib/funnel";
import { trackEvent } from "@/lib/track";

export function Header({ onOpenForm }) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <a href="#top" className="text-lg font-extrabold tracking-tight">
          <span className="text-fresh-600">Mama</span>
          <span className="text-warm-500">Fresh</span>{" "}
          <span className="text-ink/70 font-semibold">Packs</span>
        </a>
        <nav className="hidden gap-6 text-sm font-medium text-ink/70 sm:flex" aria-label="Main">
          <a href="#packs" className="hover:text-fresh-600">Packs</a>
          <a href="#how" className="hover:text-fresh-600">How it works</a>
          <a href="#areas" className="hover:text-fresh-600">Delivery</a>
          <a href="#faq" className="hover:text-fresh-600">FAQ</a>
        </nav>
        <button onClick={onOpenForm} className="btn-wa !px-4 !py-2 !text-sm">
          Get my pack
        </button>
      </div>
    </header>
  );
}

export function Hero({ customerType, onOpenForm }) {
  const dynamic = personalizedHeadline(customerType);
  return (
    <section id="top" className="bg-gradient-to-b from-fresh-50 to-cream">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:py-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-3 inline-block rounded-full bg-warm-100 px-3 py-1 text-xs font-semibold text-warm-600">
            Fresh in Nairobi · Order on WhatsApp · Pay with M-Pesa
          </p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {dynamic || "Fresh Traditional Food, Prepped for Busy Mothers"}
          </h1>
          <p className="mt-4 text-lg text-ink/70">
            Clean, peeled, portioned, ready-to-cook matoke, nduma, pumpkin, sweet
            potatoes, and greens delivered to your door in Nairobi.
          </p>
          <p className="mt-3 text-sm font-medium text-fresh-700">
            MamaFresh is your AI-assisted meal prep partner for pregnancy, baby
            weaning, toddler meals, and family dinners — order on WhatsApp in
            under one minute.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppButton section="hero" />
            <a
              href="#packs"
              onClick={() => trackEvent("product_view", { section: "hero_view_packs" })}
              className="btn-secondary"
            >
              View Today's Packs
            </a>
          </div>
          <p className="mt-4 text-sm text-ink/60">
            Perfect for pregnancy meals, baby weaning, toddler food, and family dinners.
          </p>
        </div>
        <div className="relative">
          {/* Replace with a real photo: put hero.jpg in /public and use next/image */}
          <div className="flex aspect-[4/3] items-center justify-center rounded-card bg-gradient-to-br from-fresh-100 via-warm-100 to-cream text-center shadow-inner ring-1 ring-black/5">
            <div className="px-6">
              <div className="text-6xl">🥬🍠🎃</div>
              <p className="mt-4 text-sm font-medium text-ink/60">
                Washed · Peeled · Cut · Portioned · Ready to cook
              </p>
            </div>
          </div>
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
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="section-title text-center">
        Healthy Meals Should Not Take Your Whole Afternoon
      </h2>
      <ul className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
        {pains.map((p) => (
          <li key={p} className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-black/5">
            <span aria-hidden="true" className="mt-0.5 text-warm-500">●</span>
            <span className="text-sm text-ink/80">{p}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Solution() {
  return (
    <section className="bg-fresh-600 text-white">
      <div className="mx-auto max-w-5xl px-4 py-12 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          We Prep. You Cook. Your Family Eats Fresh.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-fresh-50/90">
          MamaFresh does the washing, peeling, cutting, and portioning so you can
          cook faster and feed your family better — the traditional way.
        </p>
      </div>
    </section>
  );
}

export function Packs({ onSelectPack }) {
  return (
    <section id="packs" className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="section-title text-center">Today's MamaFresh Packs</h2>
      <p className="mt-2 text-center text-sm text-ink/60">
        Tap a pack to order it directly on WhatsApp.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PACKS.map((pack) => (
          <article key={pack.id} className="card flex flex-col">
            {pack.tag && (
              <span className="mb-2 self-start rounded-full bg-warm-100 px-2.5 py-0.5 text-xs font-semibold text-warm-600">
                {pack.tag}
              </span>
            )}
            <div className="text-4xl" aria-hidden="true">{pack.emoji}</div>
            <h3 className="mt-3 text-lg font-bold">{pack.name}</h3>
            <p className="mt-1 text-sm text-ink/70">{pack.description}</p>
            <p className="mt-2 text-xs font-medium text-ink/50">Best for: {pack.bestFor}</p>
            <p className="mt-2 text-base font-bold text-fresh-700">{pack.price}</p>
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
              className="mt-2 text-xs font-medium text-fresh-600 underline-offset-2 hover:underline"
            >
              Not sure? Get a recommendation
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
    <section id="how" className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="section-title text-center">Ordering Takes Less Than 1 Minute</h2>
        <ol className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-fresh-500 font-bold text-white">
                {i + 1}
              </span>
              <span className="text-sm text-ink/80">{s}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
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
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="section-title text-center">Why Mothers Choose MamaFresh</h2>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map(([icon, text]) => (
          <div key={text} className="card flex flex-col items-center gap-2 !p-5 text-center">
            <span className="text-3xl" aria-hidden="true">{icon}</span>
            <span className="text-sm font-medium text-ink/80">{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function DeliveryAreas() {
  return (
    <section id="areas" className="bg-warm-100/60">
      <div className="mx-auto max-w-5xl px-4 py-12 text-center">
        <h2 className="section-title">We Deliver Across Nairobi</h2>
        <div className="mx-auto mt-6 flex max-w-2xl flex-wrap justify-center gap-2">
          {DELIVERY_AREAS.map((area) => (
            <span key={area} className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-ink/80 ring-1 ring-black/5">
              {area}
            </span>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink/70">
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
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="section-title text-center">Loved by Nairobi Mothers</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {quotes.map(([q, who]) => (
          <figure key={who} className="card">
            <blockquote className="text-sm italic text-ink/80">"{q}"</blockquote>
            <figcaption className="mt-3 text-xs font-semibold text-fresh-700">{who}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function FinalCTA({ onOpenForm }) {
  return (
    <section className="bg-fresh-700 text-white">
      <div className="mx-auto max-w-3xl px-4 py-14 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Ready to Make Healthy Meals Easier?</h2>
        <p className="mx-auto mt-3 max-w-xl text-fresh-50/90">
          Order your MamaFresh Pack today and spend less time prepping and more
          time with your family.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <WhatsAppButton section="final_cta" className="btn-wa !bg-warm-500 hover:!bg-warm-600">
            Order on WhatsApp Now
          </WhatsAppButton>
          <button onClick={onOpenForm} className="btn-secondary !border-white !text-white hover:!bg-white/10">
            Help me choose a pack
          </button>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-cream">
      <div className="mx-auto max-w-5xl px-4 py-8 text-center text-xs text-ink/50">
        <p className="font-semibold text-ink/70">MamaFresh Packs · Nairobi, Kenya</p>
        <p className="mt-1">Healthy traditional food, prepped for busy mothers. Order on WhatsApp. Cook in minutes.</p>
        <p className="mt-2">© {new Date().getFullYear()} MamaFresh Packs. All rights reserved.</p>
      </div>
    </footer>
  );
}
