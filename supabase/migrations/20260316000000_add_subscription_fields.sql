-- Add subscription tracking columns
alter table public.users
  add column if not exists stripe_subscription_id text,
  add column if not exists stripe_current_period_end timestamptz;

-- Note: The webhook uses Supabase service role key which bypasses RLS.
-- No additional RLS policy is needed for service role access.
