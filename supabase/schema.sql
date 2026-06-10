-- ============================================================
-- MamaFresh Packs - Supabase schema
-- This schema is ALREADY APPLIED to project rmfsfysekgteubxvjswf.
-- Keep this file as the source of truth / for re-creating the DB.
-- Run in Supabase SQL Editor if setting up a fresh project.
-- ============================================================

create extension if not exists "pgcrypto";

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  whatsapp_number text,
  delivery_estate text,
  customer_type text,
  product_interest text,
  order_frequency text,
  preferred_delivery_day text,
  lead_source text default 'direct_website_visit',
  consent_to_whatsapp_updates boolean default false,
  lead_score integer default 0,
  lead_tier text default 'low',
  whatsapp_message text,
  last_action text,
  follow_up_status text default 'new',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.whatsapp_clicks (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  product_interest text,
  customer_type text,
  delivery_estate text,
  whatsapp_message text,
  click_source_section text,
  created_at timestamptz default now()
);

create table public.support_questions (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  question text not null,
  suggested_answer text,
  customer_type text,
  product_interest text,
  created_at timestamptz default now()
);

create table public.abandoned_leads (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  phone text,
  whatsapp_number text,
  product_interest text,
  customer_type text,
  delivery_estate text,
  last_action text,
  follow_up_status text default 'pending_30min',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  event_name text not null,
  event_source text,
  page_section text,
  product_interest text,
  customer_type text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Row Level Security: anonymous visitors can only INSERT.
alter table public.leads enable row level security;
alter table public.whatsapp_clicks enable row level security;
alter table public.support_questions enable row level security;
alter table public.abandoned_leads enable row level security;
alter table public.analytics_events enable row level security;

create policy "anon_insert_leads" on public.leads for insert to anon with check (true);
create policy "anon_insert_clicks" on public.whatsapp_clicks for insert to anon with check (true);
create policy "anon_insert_support" on public.support_questions for insert to anon with check (true);
create policy "anon_insert_abandoned" on public.abandoned_leads for insert to anon with check (true);
create policy "anon_insert_events" on public.analytics_events for insert to anon with check (true);

create index idx_leads_created on public.leads (created_at desc);
create index idx_clicks_created on public.whatsapp_clicks (created_at desc);
create index idx_abandoned_status on public.abandoned_leads (follow_up_status, created_at desc);
