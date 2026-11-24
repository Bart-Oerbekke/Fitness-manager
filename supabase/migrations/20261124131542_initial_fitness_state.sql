-- Initial account-scoped state schema for the approved test project.
-- One versioned document per account for the first single-user sync adapter.
-- Do not run in production without approval, RLS tests and backup.
begin;
create table public.fitness_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  revision bigint not null default 0 check (revision >= 0),
  mutation_id uuid not null,
  payload jsonb not null check (jsonb_typeof(payload) = 'object' and payload->>'version' = '1'
    and payload ?& array['version','custom','workouts','programs','events','history','active']
    and jsonb_typeof(payload->'custom') = 'array'
    and jsonb_typeof(payload->'workouts') = 'array'
    and jsonb_typeof(payload->'programs') = 'array'
    and jsonb_typeof(payload->'events') = 'array'
    and jsonb_typeof(payload->'history') = 'array'
    and jsonb_typeof(payload->'active') in ('object','null')
    and (not payload ? 'favorites' or jsonb_typeof(payload->'favorites') = 'array')
    and (not payload ? 'recent' or jsonb_typeof(payload->'recent') = 'array')
    and octet_length(payload::text) <= 5242880),
  updated_at timestamptz not null default now()
);
alter table public.fitness_state enable row level security;
alter table public.fitness_state force row level security;
revoke all on public.fitness_state from public, anon, authenticated;
grant select, insert on public.fitness_state to authenticated;
grant update (payload, revision, mutation_id) on public.fitness_state to authenticated;
create policy state_read on public.fitness_state for select to authenticated
using ((select auth.uid()) = user_id);
create policy state_create on public.fitness_state for insert to authenticated
with check ((select auth.uid()) = user_id and revision = 0);
create policy state_update on public.fitness_state for update to authenticated
using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
-- Atomic compare-and-swap: client UPDATE WHERE user_id = uid AND revision = expected_revision.
-- Enforce monotonic revision at the DB boundary; retries with same mutation_id must read/compare first.
create function public.fitness_state_revision_guard() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin
  if new.revision <> old.revision + 1 or new.mutation_id = old.mutation_id then
    raise exception 'Invalid revision or repeated mutation';
  end if;
  new.updated_at := now();
  return new;
end;
$$;
revoke all on function public.fitness_state_revision_guard() from public, anon, authenticated;
create trigger fitness_state_revision before update on public.fitness_state
for each row execute function public.fitness_state_revision_guard();
commit;
