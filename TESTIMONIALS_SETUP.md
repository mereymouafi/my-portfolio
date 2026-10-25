# Automatic testimonials with Supabase

Testimonials submitted through the portfolio are stored in Supabase and shown publicly without approval. Anyone with the form link can submit content that becomes public immediately.

## Create the database table

1. Create a project at [supabase.com](https://supabase.com/).
2. In the project dashboard, open **SQL Editor**, create a query, and run:

```sql
create table public.testimonials (
  id bigint generated always as identity primary key,
  first_name text not null check (char_length(trim(first_name)) between 1 and 80),
  last_name text not null check (char_length(trim(last_name)) between 1 and 80),
  position text not null check (char_length(trim(position)) between 1 and 120),
  testimonial text not null check (char_length(trim(testimonial)) between 1 and 1500),
  submitted_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

grant select, insert on public.testimonials to anon;

create policy "Anyone can read testimonials"
  on public.testimonials for select
  to anon
  using (true);

create policy "Anyone can submit testimonials"
  on public.testimonials for insert
  to anon
  with check (true);
```

The public `anon` role can only read and add testimonials; it cannot edit or delete entries.

## Connect the portfolio

1. In the Supabase dashboard, open **Project Settings > API** and copy the **Project URL** and the legacy **anon/public** API key. Never use or publish the `service_role` key.
2. In [`assets/js/testimonials.js`](./assets/js/testimonials.js), replace `PASTE_YOUR_SUPABASE_PROJECT_URL_HERE` and `PASTE_YOUR_SUPABASE_ANON_KEY_HERE` with those values.
3. Publish the portfolio and test the testimonial form. New testimonials are added to the page automatically and are visible to everyone.

If the Supabase project is paused, the keys are incorrect, or the SQL policies have not been set up, the page will show an error instead of silently pretending a testimonial was saved.
