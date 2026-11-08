import {supabase} from './supabase';
export type Note={id?:string,title:string,content:string,subject:string,tags:string,status:string,favorite:number,source:string,attachment:string,filename:string,updated:string};
type Row={id:string,title:string,content:string,subject:string,tags:string[],status:string,favorite:boolean,source_url:string|null,attachment_path:string|null,attachment_name:string|null,updated_at:string};
function client(){if(!supabase)throw new Error('Chưa cấu hình kết nối Supabase.');return supabase}
export function fromRow(r:Row):Note{return {id:r.id,title:r.title,content:r.content,subject:r.subject,tags:(r.tags||[]).join(', '),status:r.status,favorite:r.favorite?1:0,source:r.source_url||'',attachment:r.attachment_path||'',filename:r.attachment_name||'',updated:r.updated_at}}
export async function listNotes(){
 const db=client();const {data:{user},error:authError}=await db.auth.getUser();if(authError||!user)throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
 const all:Note[]=[];let start=0;
 for(;;){const {data,error}=await db.from('notes').select('*').eq('user_id',user.id).order('updated_at',{ascending:false}).order('id').range(start,start+499);if(error)throw error;all.push(...(data as Row[]).map(fromRow));if(data.length<500)break;start+=500}
 return all;
}
export async function saveNote(n:Note){
 if(!n.title.trim()||n.title.length>200)throw new Error('Vui lòng nhập tiêu đề tối đa 200 ký tự.');
 if(n.content.length>200000)throw new Error('Nội dung tối đa 200.000 ký tự.');
 if(n.source&&!/^https?:\/\//i.test(n.source))throw new Error('Nguồn tham khảo phải bắt đầu bằng https:// hoặc http://.');
 const db=client();const {data:{user},error:authError}=await db.auth.getUser();if(authError||!user)throw new Error('Vui lòng đăng nhập lại.');
 const row={user_id:user.id,title:n.title.trim(),content:n.content,subject:n.subject.trim()||'Chưa phân loại',tags:n.tags.split(',').map(t=>t.trim()).filter(Boolean),status:n.status,favorite:!!n.favorite,source_url:n.source||null,attachment_path:n.attachment||null,attachment_name:n.filename||null,updated_at:new Date().toISOString()};
 const query=n.id?db.from('notes').update(row).eq('id',n.id).eq('user_id',user.id):db.from('notes').insert(row);
 const {data,error}=await query.select().single();if(error)throw error;return fromRow(data as Row);
}
export async function deleteNote(id:string){const db=client();const {error}=await db.from('notes').delete().eq('id',id);if(error)throw error}
export async function uploadFile(file:File){
 if(file.size>10*1024*1024)throw new Error('Tệp đính kèm tối đa 10 MB.');
 const db=client();const {data:{user},error:authError}=await db.auth.getUser();if(authError||!user)throw new Error('Vui lòng đăng nhập lại.');
 const ext=file.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g,'').slice(0,12)||'bin';
 const key=`${user.id}/${crypto.randomUUID()}/document.${ext}`;
 const {error}=await db.storage.from('documents').upload(key,file,{upsert:false,contentType:file.type||'application/octet-stream'});if(error)throw error;return {key,name:file.name};
}
export async function downloadFile(path:string,filename:string){
 const {data,error}=await client().storage.from('documents').download(path);if(error)throw error;
 const url=URL.createObjectURL(data);const a=document.createElement('a');a.href=url;a.download=filename||'tai-lieu';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
}
export function readableError(e:unknown){const message=e instanceof Error?e.message:typeof e==='object'&&e&&'message'in e?String(e.message):'Có lỗi xảy ra. Vui lòng thử lại.';if(/failed to fetch|networkerror/i.test(message))return 'Không kết nối được Supabase. Kiểm tra mạng, Project URL và trạng thái project.';if(/row.level security|permission denied/i.test(message))return 'Chưa có quyền truy cập. Kiểm tra chính sách RLS trong Supabase.';if(/bucket not found/i.test(message))return 'Chưa có bucket documents. Tạo bucket Private theo hướng dẫn.';return message}
