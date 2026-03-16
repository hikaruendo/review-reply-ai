-- Remove old restrictive industry check constraint
alter table public.generations drop constraint if exists generations_industry_check;

-- Remove old restrictive tone check constraint
alter table public.generations drop constraint if exists generations_tone_check;

-- Industry and tone are now free-text fields validated by the application layer
