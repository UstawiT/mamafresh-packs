"use client";

import { useEffect, useState } from "react";
import {
  Header, Hero, Problem, Solution, Packs, HowItWorks,
  Benefits, DeliveryAreas, Testimonials, FinalCTA, Footer,
} from "@/components/Sections";
import LeadForm from "@/components/LeadForm";
import FaqAssistant from "@/components/FaqAssistant";
import StickyWhatsApp from "@/components/StickyWhatsApp";
import { trackEvent } from "@/lib/track";

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);
  const [customerType, setCustomerType] = useState(null);

  useEffect(() => {
    trackEvent("page_view", { section: "landing" });
  }, []);

  function openForm(pack) {
    if (pack) trackEvent("pack_selected", { product_interest: pack.name, section: "pack_card" });
    setFormOpen(true);
  }

  return (
    <main>
      <Header onOpenForm={() => openForm()} />
      <Hero customerType={customerType} onOpenForm={() => openForm()} />
      <Problem />
      <Solution />
      <Packs onSelectPack={openForm} />
      <HowItWorks />
      <Benefits />
      <DeliveryAreas />
      <Testimonials />
      <FaqAssistant />
      <FinalCTA onOpenForm={() => openForm()} />
      <Footer />
      <StickyWhatsApp />
      <LeadForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onCustomerType={setCustomerType}
      />
    </main>
  );
}
