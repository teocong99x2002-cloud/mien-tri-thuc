import {createClient} from '@supabase/supabase-js';
const url=(import.meta.env.VITE_SUPABASE_URL||'').trim();
const key=(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY||'').trim();
export const configurationError=!url||!key?'Chưa cấu hình Supabase. Thêm VITE_SUPABASE_URL và VITE_SUPABASE_PUBLISHABLE_KEY trong GitHub Variables, sau đó chạy lại Actions.':key.startsWith('sb_secret_')?'Đã nhập nhầm khóa bí mật. Thu hồi khóa đó trong Supabase và thay bằng Publishable key.':!/^https:\/\/[a-zA-Z0-9.-]+(?::\d+)?\/?$/.test(url)?'Project URL chưa hợp lệ. Hãy sao chép lại URL từ Supabase.':'';
export const supabase=configurationError?null:createClient(url,key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
