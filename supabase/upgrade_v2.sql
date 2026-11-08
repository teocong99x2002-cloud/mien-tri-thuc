-- CHỈ BỔ SUNG CỘT; giữ nguyên ghi chú và tài liệu đang có.
-- Chạy một lần trong Supabase → SQL Editor, trước khi upload bản v2.
-- Có thể chạy lại an toàn. Không chạy lại setup.sql để nâng cấp.
alter table public.notes
  add column if not exists document_tabs jsonb not null default '[]'::jsonb;
comment on column public.notes.document_tabs is
  'Document tabs: id, parentId, title, content (Tiptap JSON). Existing content remains intact.';
