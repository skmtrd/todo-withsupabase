-- Create todos table
create table if not exists public.todos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  title text not null,
  is_complete boolean default false not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  image_url text
);

-- Enable Row Level Security
alter table public.todos enable row level security;

-- Create policies
create policy "Users can view their own todos"
  on public.todos
  for select
  using (auth.uid() = user_id);

create policy "Users can create their own todos"
  on public.todos
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own todos"
  on public.todos
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own todos"
  on public.todos
  for delete
  using (auth.uid() = user_id);

-- Enable Storage
insert into storage.buckets (id, name, public)
values ('todo-images', 'todo-images', true);

-- Storage policies
create policy "Anyone can view todo images"
  on storage.objects
  for select
  using (bucket_id = 'todo-images');

create policy "Authenticated users can upload todo images"
  on storage.objects
  for insert
  with check (
    bucket_id = 'todo-images'
    and auth.role() = 'authenticated'
  );

create policy "Users can update their own todo images"
  on storage.objects
  for update
  using (
    bucket_id = 'todo-images'
    and auth.uid() = owner
  );

create policy "Users can delete their own todo images"
  on storage.objects
  for delete
  using (
    bucket_id = 'todo-images'
    and auth.uid() = owner
  ); 