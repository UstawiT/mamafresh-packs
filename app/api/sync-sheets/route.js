// Server-side Google Sheets sync.
// Forwards lead records to a Google Apps Script Web App webhook.
// The webhook URL stays private (server-only env var).
export async function POST(request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    // Sheets sync not configured yet - succeed silently so the funnel never breaks.
    return Response.json({ ok: false, reason: "GOOGLE_SHEETS_WEBHOOK_URL not set" });
  }
  try {
    const body = await request.json();
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return Response.json({ ok: res.ok });
  } catch (err) {
    return Response.json({ ok: false, reason: String(err) }, { status: 200 });
  }
}
