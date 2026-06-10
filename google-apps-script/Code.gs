/**
 * ============================================================
 * MamaFresh Packs - Google Sheets Lead Sync (Apps Script Web App)
 * ============================================================
 * SETUP (one time, ~5 minutes):
 * 1. Create a new Google Sheet named "MamaFresh Leads".
 * 2. Extensions > Apps Script. Delete any code and paste this file.
 * 3. Click Deploy > New deployment > type: Web app.
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL (ends in /exec).
 * 5. In Vercel > Project > Settings > Environment Variables, set:
 *    GOOGLE_SHEETS_WEBHOOK_URL = <that URL>
 *    Then redeploy the site.
 *
 * Tabs are created automatically on first write.
 * The "Daily Summary" tab is refreshed by the daily trigger below -
 * in Apps Script, run setupDailyTrigger() once to enable it.
 */

var TABS = {
  leads: {
    name: "Leads",
    headers: ["Date Captured","Name","Phone","WhatsApp Number","Delivery Estate","Customer Type","Product Interest","Order Frequency","Preferred Delivery Day","Lead Source","Lead Score","WhatsApp Message","Consent","Last Action","Follow-up Status","Supabase Lead ID"],
    fields: ["date_captured","name","phone","whatsapp_number","delivery_estate","customer_type","product_interest","order_frequency","preferred_delivery_day","lead_source","lead_score","whatsapp_message","consent","last_action","follow_up_status","supabase_lead_id"],
  },
  whatsapp_clicks: {
    name: "WhatsApp Clicks",
    headers: ["Date","Supabase Lead ID","Product Interest","Customer Type","Delivery Estate","Click Source Section","WhatsApp Message"],
    fields: ["date","supabase_lead_id","product_interest","customer_type","delivery_estate","click_source_section","whatsapp_message"],
  },
  abandoned_leads: {
    name: "Abandoned Leads",
    headers: ["Date Captured","Supabase Lead ID","Phone","WhatsApp Number","Product Interest","Customer Type","Delivery Estate","Last Action","Follow-up Status","Next Follow-up Date"],
    fields: ["date_captured","supabase_lead_id","phone","whatsapp_number","product_interest","customer_type","delivery_estate","last_action","follow_up_status","next_follow_up_date"],
  },
  support_questions: {
    name: "Support Questions",
    headers: ["Date","Supabase Lead ID","Question","Suggested Answer","Customer Type","Product Interest","Follow-up Needed"],
    fields: ["date","supabase_lead_id","question","suggested_answer","customer_type","product_interest","follow_up_needed"],
  },
};

function getSheet(tabKey) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var cfg = TABS[tabKey];
  var sheet = ss.getSheetByName(cfg.name);
  if (!sheet) {
    sheet = ss.insertSheet(cfg.name);
    sheet.appendRow(cfg.headers);
    sheet.getRange(1, 1, 1, cfg.headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Receives POST { tab: "leads", record: {...} } from the landing page.
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var tabKey = body.tab;
    var record = body.record || {};
    if (!TABS[tabKey]) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "unknown tab" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    var cfg = TABS[tabKey];
    var row = cfg.fields.map(function (f) { return record[f] != null ? record[f] : ""; });
    getSheet(tabKey).appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ---------- Daily Summary ----------
function updateDailySummary() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var summary = ss.getSheetByName("Daily Summary");
  if (!summary) {
    summary = ss.insertSheet("Daily Summary");
    summary.appendRow(["Date","Total Leads","High-Intent Leads","Medium-Intent Leads","Low-Intent Leads","WhatsApp Clicks","Abandoned Leads","Top Product Interest","Top Delivery Estate"]);
    summary.getRange(1, 1, 1, 9).setFontWeight("bold");
    summary.setFrozenRows(1);
  }
  var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  var leads = readRows("Leads");
  var todayLeads = leads.filter(function (r) { return String(r[0]).indexOf(today) === 0; });
  var high = 0, med = 0, low = 0;
  var products = {}, estates = {};
  todayLeads.forEach(function (r) {
    var score = Number(r[10]) || 0;
    if (score >= 60) high++; else if (score >= 25) med++; else low++;
    if (r[6]) products[r[6]] = (products[r[6]] || 0) + 1;
    if (r[4]) estates[r[4]] = (estates[r[4]] || 0) + 1;
  });
  var clicks = readRows("WhatsApp Clicks").filter(function (r) { return String(r[0]).indexOf(today) === 0; }).length;
  var abandoned = readRows("Abandoned Leads").filter(function (r) { return String(r[0]).indexOf(today) === 0; }).length;
  summary.appendRow([today, todayLeads.length, high, med, low, clicks, abandoned, topKey(products), topKey(estates)]);
}

function readRows(name) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sheet || sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
}

function topKey(obj) {
  var best = "", n = 0;
  for (var k in obj) if (obj[k] > n) { n = obj[k]; best = k; }
  return best;
}

// Run this ONCE manually to create the daily 11:55pm summary trigger.
function setupDailyTrigger() {
  ScriptApp.newTrigger("updateDailySummary").timeBased().everyDays(1).atHour(23).create();
}
