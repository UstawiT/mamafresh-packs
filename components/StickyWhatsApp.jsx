"use client";

import WhatsAppButton from "./WhatsAppButton";

export default function StickyWhatsApp() {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <WhatsAppButton
        section="sticky_floating_button"
        className="btn-wa !rounded-full !px-5 !py-4 shadow-2xl"
      >
        <span className="hidden sm:inline">Order on WhatsApp</span>
        <span className="sm:hidden">Order</span>
      </WhatsAppButton>
    </div>
  );
}
