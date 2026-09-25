-- Points core: participants, the append-only points log and the public leaderboard.
--
-- Public (anon) access is limited on purpose: visitors can read participants'
-- netid and name, and point amounts, but never emails, reasons or who awarded
-- what. Leads add rows through the Supabase table editor, which bypasses RLS.

-- Participants ---------------------------------------------------------------

-- One row per account. Created automatically at sign-up from the name and
-- NetID the person enters (see private.create_participant_for_new_user).
create table public.participants (
  id uuid primary key references auth.users (id) on delete cascade,
  netid text not null unique check (netid ~ '^[a-z][a-z0-9]{1,11}$'),
  name text not null check (length(trim(name)) between 1 and 60),
  email text not null unique check (email ~* '^[^@\s]+@yale\.edu$'),
  role text not null default 'participant' check (role in ('participant', 'admin')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

comment on table public.participants is
  'One row per account. netid is self-reported at sign-up and matches members/<netid>.json in the repo.';

-- Runs as the table owner because new users have no rights on participants.
-- It lives in the unexposed private schema so it can't be called over the API.
-- If it raises (bad NetID, NetID taken, non-Yale email), the sign-up fails.
create schema if not exists private;

create function private.create_participant_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.participants (id, email, name, netid)
  values (
    new.id,
    lower(new.email),
    trim(new.raw_user_meta_data ->> 'name'),
    lower(trim(new.raw_user_meta_data ->> 'netid'))
  );
  return new;
end;
$$;

revoke execute on function private.create_participant_for_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.create_participant_for_new_user();

-- Points log ---------------------------------------------------------------

create table public.point_entries (
  id bigint generated always as identity primary key,
  participant_id uuid not null references public.participants (id) on delete restrict,
  amount integer not null check (amount <> 0),
  reason text not null check (length(trim(reason)) > 0),
  source_type text not null default 'manual'
    check (source_type in ('manual', 'attendance', 'group_bonus', 'submission', 'award')),
  source_id text,
  created_by text,
  created_at timestamptz not null default now()
);

comment on table public.point_entries is
  'Append-only. To correct a mistake, add a negative entry with a reason; rows cannot be edited or deleted.';

create index point_entries_participant_id_idx on public.point_entries (participant_id);

create function public.reject_point_entry_change()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception 'point_entries is append-only. Add a correcting entry with a negative amount instead.';
end;
$$;

create trigger point_entries_no_update_or_delete
  before update or delete on public.point_entries
  for each row execute function public.reject_point_entry_change();

create trigger point_entries_no_truncate
  before truncate on public.point_entries
  for each statement execute function public.reject_point_entry_change();

-- Leaderboard --------------------------------------------------------------

-- security_invoker makes the view respect the caller's RLS and column grants,
-- so it exposes nothing the caller couldn't already read.
create view public.leaderboard
with (security_invoker = true)
as
select
  p.netid,
  p.name,
  coalesce(sum(e.amount), 0)::integer as earned,
  rank() over (order by coalesce(sum(e.amount), 0) desc)::integer as rank
from public.participants p
left join public.point_entries e on e.participant_id = p.id
where p.active
group by p.id, p.netid, p.name;

-- Access -------------------------------------------------------------------

alter table public.participants enable row level security;
alter table public.point_entries enable row level security;

create policy "Anyone can read active participants"
  on public.participants for select
  to anon, authenticated
  using (active);

create policy "Anyone can read point amounts"
  on public.point_entries for select
  to anon, authenticated
  using (true);

-- Start from nothing, then grant only the columns the public site needs.
revoke all on public.participants, public.point_entries, public.leaderboard from anon, authenticated;
revoke execute on function public.reject_point_entry_change() from public, anon, authenticated;

grant select (id, netid, name, active) on public.participants to anon, authenticated;
grant select (participant_id, amount) on public.point_entries to anon, authenticated;
grant select on public.leaderboard to anon, authenticated;
