"use client";

import { useState } from "react";
import { KNOWLEDGE_BASE, FALLBACK_ANSWER } from "@/lib/config";
import { saveSupportQuestion, trackEvent, syncToSheets } from "@/lib/track";
import WhatsAppButton from "./WhatsAppButton";

// Lightweight on-page support assistant: matches the visitor's question
// against the knowledge base, logs every question to Supabase + Sheets,
// and always guides the visitor back to WhatsApp ordering.
function findAnswer(question) {
  const q = question.toLowerCase();
  let best = null;
  let bestHits = 0;
  for (const item of KNOWLEDGE_BASE) {
    const hits = item.keywords.filter((k) => q.includes(k)).length;
    if (hits > bestHits) { best = item; bestHits = hits; }
  }
  return best ? best.answer : FALLBACK_ANSWER;
}

export default function FaqAssistant() {
  const [input, setInput] = useState("");
  const [thread, setThread] = useState([]);

  function ask(question) {
    if (!question.trim()) return;
    const answer = findAnswer(question);
    setThread((t) => [...t, { q: question, a: answer }]);
    setInput("");
    trackEvent("faq_opened", { section: "faq_assistant", metadata: { question } });
    saveSupportQuestion({ question, suggested_answer: answer });
    syncToSheets("support_questions", {
      date: new Date().toISOString(),
      supabase_lead_id: "",
      question,
      suggested_answer: answer,
      customer_type: "",
      product_interest: "",
      follow_up_needed: answer === FALLBACK_ANSWER ? "yes" : "no",
    });
  }

  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="section-title text-center">Questions? Ask MamaFresh</h2>
        <p className="mt-2 text-center text-sm text-ink/60">
          Our assistant answers instantly — or chat with our team on WhatsApp.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {KNOWLEDGE_BASE.slice(0, 6).map((item) => (
            <button key={item.question} onClick={() => ask(item.question)}
              className="rounded-full border border-fresh-500/40 bg-fresh-50 px-3 py-1.5 text-xs font-medium text-fresh-700 hover:bg-fresh-100">
              {item.question}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {thread.map((m, i) => (
            <div key={i}>
              <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-fresh-500 px-4 py-2 text-sm text-white">{m.q}</p>
              <p className="mt-2 w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-black/5 px-4 py-2 text-sm text-ink/80">{m.a}</p>
            </div>
          ))}
        </div>

        <form className="mt-6 flex gap-2"
          onSubmit={(e) => { e.preventDefault(); ask(input); }}>
          <input
            type="text" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question… e.g. Do you deliver to Westlands?"
            className="w-full rounded-full border-2 border-black/10 px-4 py-2.5 text-sm focus:border-fresh-500 focus:outline-none"
            aria-label="Ask a question"
          />
          <button type="submit" className="btn-wa !px-5 !py-2.5 !text-sm">Ask</button>
        </form>

        {thread.length > 0 && (
          <div className="mt-6 text-center">
            <WhatsAppButton section="faq_assistant" className="btn-secondary">
              Chat with our team on WhatsApp
            </WhatsAppButton>
          </div>
        )}
      </div>
    </section>
  );
}
