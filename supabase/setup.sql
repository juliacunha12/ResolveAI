-- ========================================================
-- RESOLVE AI - FULL DATABASE SETUP
-- ========================================================

-- 1. TABELAS PRINCIPAIS
-----------------------------------------------------------

-- Tabela de Perfis (Profiles)
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text,
  avatar_url text,
  phone text,
  role text check (role in ('client', 'provider')) default 'client',
  bio text,
  city text,
  constraint username_length check (char_length(full_name) >= 3)
);

-- Tabela de Serviços (Services)
create table if not exists public.services (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  provider_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  price decimal(10,2),
  category text,
  image_url text
);

-- Tabela de Avaliações (Reviews)
create table if not exists public.reviews (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  service_id uuid references public.services(id) on delete cascade not null,
  user_id uuid references auth.users not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text,
  reply text,
  replied_at timestamp with time zone,
  unique(service_id, user_id)
);

-- 2. SEGURANÇA (RLS)
-----------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.reviews enable row level security;

-- Policies: Profiles
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Policies: Services
create policy "Services are viewable by everyone." on public.services for select using (true);
create policy "Providers can insert their own services." on public.services for insert with check (auth.uid() = provider_id);
create policy "Providers can update own services." on public.services for update using (auth.uid() = provider_id);

-- Policies: Reviews
create policy "Reviews are public." on public.reviews for select using (true);
create policy "Authenticated users can create reviews." on public.reviews for insert with check (auth.role() = 'authenticated');
create policy "Users can delete own reviews." on public.reviews for delete using (auth.uid() = user_id);

-- 3. VIEWS E ESTATÍSTICAS
-----------------------------------------------------------

create or replace view public.service_ratings as
select 
    service_id,
    count(id) as review_count,
    avg(rating)::numeric(10,1) as average_rating
from public.reviews
group by service_id;

grant select on table public.service_ratings to anon, authenticated;

-- 4. FUNÇÕES E TRIGGERS (AUTOMAÇÃO)
-----------------------------------------------------------

-- Função para criar perfil automaticamente no cadastro
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    coalesce(new.raw_user_meta_data ->> 'role', 'client'),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. STORAGE (BUCKETS)
-----------------------------------------------------------
-- Buckets sugeridos: 'avatars', 'service-images' (Configurar como PÚBLICO via Dashboard)

-- Policies sugeridas para Storage (Storage.objects):
-- 1. Qualquer um pode ver imagens
-- 2. Logados podem fazer upload
