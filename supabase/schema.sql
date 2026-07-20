-- ============================================================
--  TOBA RIDES, DATABASE SETUP
--
--  Run this once in the Supabase SQL editor.
--  Dashboard, then SQL Editor, then New query, then paste and Run.
-- ============================================================


-- ------------------------------------------------------------
--  1. Vehicles
-- ------------------------------------------------------------
create table if not exists public.vehicles (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  class       text not null default 'Sedan',
  seats       text,
  luggage     text,
  best_for    text,
  description text,
  photo_url   text,
  photo_path  text,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists vehicles_sort_idx on public.vehicles (sort_order, created_at);


-- ------------------------------------------------------------
--  2. Site settings, one row per key. Used for the banner.
-- ------------------------------------------------------------
create table if not exists public.settings (
  key        text primary key,
  value      text,
  updated_at timestamptz not null default now()
);


-- ------------------------------------------------------------
--  3. Row level security
--
--  Anyone may read. Only a signed in user may write.
--  This is enforced by the database, not by the browser, so the
--  public site cannot be edited by anyone reading the source.
-- ------------------------------------------------------------
alter table public.vehicles enable row level security;
alter table public.settings enable row level security;

drop policy if exists "vehicles are public" on public.vehicles;
create policy "vehicles are public"
  on public.vehicles for select
  to anon, authenticated
  using (true);

drop policy if exists "vehicles are managed by admins" on public.vehicles;
create policy "vehicles are managed by admins"
  on public.vehicles for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "settings are public" on public.settings;
create policy "settings are public"
  on public.settings for select
  to anon, authenticated
  using (true);

drop policy if exists "settings are managed by admins" on public.settings;
create policy "settings are managed by admins"
  on public.settings for all
  to authenticated
  using (true)
  with check (true);


-- ------------------------------------------------------------
--  4. Storage bucket for photos
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('fleet', 'fleet', true)
on conflict (id) do update set public = true;

drop policy if exists "fleet photos are public" on storage.objects;
create policy "fleet photos are public"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'fleet');

drop policy if exists "fleet photos are uploaded by admins" on storage.objects;
create policy "fleet photos are uploaded by admins"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'fleet');

drop policy if exists "fleet photos are replaced by admins" on storage.objects;
create policy "fleet photos are replaced by admins"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'fleet');

drop policy if exists "fleet photos are removed by admins" on storage.objects;
create policy "fleet photos are removed by admins"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'fleet');


-- ============================================================
--  5. Create the admin account
--
--  Do this in the dashboard, not here:
--  Authentication, then Users, then Add user.
--  Use your own email and a strong password, and tick
--  "Auto confirm user" so no email verification is needed.
--
--  Then turn off public sign ups so nobody else can register:
--  Authentication, then Providers, then Email,
--  and disable "Enable sign ups".
-- ============================================================
