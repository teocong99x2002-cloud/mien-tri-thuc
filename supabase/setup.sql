-- Chạy trong SQL Editor của project Supabase do bạn quản lý.
-- Tương thích với bảng notes đã tạo theo hướng dẫn trong cuộc trò chuyện.
-- Không chuyển dữ liệu từ bản website trước đó.
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  content text not null default '',
  subject text not null default 'Chưa phân loại',
  tags text[] not null default '{}',
  status text not null default 'Đang học'
    check (status in ('Đang học','Cần ôn tập','Đã nắm vững')),
  favorite boolean not null default false,
  source_url text,
  attachment_path text,
  attachment_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists notes_user_id_idx on public.notes(user_id);
alter table public.notes enable row level security;
revoke all on table public.notes from anon;
grant select,insert,update,delete on table public.notes to authenticated;
drop policy if exists "Users manage their own notes" on public.notes;
create policy "Users manage their own notes" on public.notes
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

-- Giữ updated_at chính xác ngay cả khi sửa trực tiếp trong Table Editor.
create or replace function public.touch_note_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
drop trigger if exists notes_touch_updated on public.notes;
create trigger notes_touch_updated before update on public.notes
  for each row execute function public.touch_note_updated_at();

-- Tạo bucket Private 10 MB; buộc bucket đã tồn tại về Private.
insert into storage.buckets (id,name,public,file_size_limit)
values ('documents','documents',false,10485760)
on conflict (id) do update set public=false,file_size_limit=10485760;

drop policy if exists "Users manage their own documents" on storage.objects;
create policy "Users manage their own documents" on storage.objects
  for all to authenticated
  using (
    bucket_id='documents'
    and (storage.foldername(name))[1]=(select auth.uid()::text)
  )
  with check (
    bucket_id='documents'
    and (storage.foldername(name))[1]=(select auth.uid()::text)
  );
-- Với project đã dùng trước đây, kiểm tra các policy khác: policy cho phép rộng
-- có thể cấp thêm quyền ngoài hai policy ở trên. Không tắt RLS để sửa lỗi.
