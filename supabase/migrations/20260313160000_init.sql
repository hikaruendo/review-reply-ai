create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  plan text not null default 'free' check (plan in ('free', 'pro')),
  stripe_customer_id text unique,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  review_text text not null,
  star_rating integer not null check (star_rating between 1 and 5),
  industry text not null check (
    industry in ('Dental', 'Restaurant', 'Salon', 'Auto Repair', 'Other')
  ),
  tone text not null check (
    tone in ('Professional', 'Friendly', 'Empathetic')
  ),
  generated_replies jsonb not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists generations_user_id_created_at_idx
  on public.generations (user_id, created_at desc);

create index if not exists generations_created_at_idx
  on public.generations (created_at desc);

create or replace function public.handle_auth_user_sync()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, plan)
  values (new.id, new.email, 'free')
  on conflict (id) do update
  set email = excluded.email;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_auth_user_sync();

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
after update of email on auth.users
for each row execute function public.handle_auth_user_sync();

alter table public.users enable row level security;
alter table public.generations enable row level security;

drop policy if exists "Users can view own profile" on public.users;
create policy "Users can view own profile"
on public.users
for select
using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.users;
create policy "Users can insert own profile"
on public.users
for insert
with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.users;
create policy "Users can update own profile"
on public.users
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users can view own generations" on public.generations;
create policy "Users can view own generations"
on public.generations
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert own generations" on public.generations;
create policy "Users can insert own generations"
on public.generations
for insert
with check (auth.uid() = user_id);

create or replace view public.monthly_generation_usage as
select
  user_id,
  date_trunc('month', created_at) as usage_month,
  count(*) as generation_count
from public.generations
group by user_id, date_trunc('month', created_at);

comment on view public.monthly_generation_usage is
'Use this view to enforce monthly signed-in quotas without reset jobs. Evaluate the current month window from created_at instead of mutating counters.';

comment on table public.generations is
'For signed-in monthly limits, query rows where created_at is inside the current month. Guest limits are handled in browser localStorage and reset when the YYYY-MM key changes.';
