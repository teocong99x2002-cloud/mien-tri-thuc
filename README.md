# Miền Tri Thức — GitHub Pages + Supabase

Bộ mã độc lập cho tài khoản GitHub **teocong99x2002-cloud**, repository **mien-tri-thuc**.
Giữ giao diện thư viện xanh trầm, chuyển dữ liệu sang Supabase do bạn quản lý.
Không cần máy chủ Node/Cloudflare hay đăng nhập ChatGPT. Không có khóa cá nhân trong gói.

## 1. Chuẩn bị Supabase

1. Mở project Supabase của bạn → SQL Editor → New query.
2. Mở file `supabase/setup.sql` trong bộ mã này, sao chép toàn bộ và chạy.
   Nếu đã chạy SQL hướng dẫn trước đó với đúng cấu trúc, vẫn chạy được file này.
   Nếu bảng notes có cấu trúc khác, cần kiểm tra trước; file không tự đổi cấu trúc bảng cũ.
3. File SQL tạo bảng notes, chính sách RLS và bucket documents Private (10 MB/tệp).
4. Authentication → Users → Add user/Create user: tạo email và mật khẩu đăng nhập.
   Dùng chức năng xác nhận email của tài khoản tạo từ quản trị nếu cần.
5. Tắt Allow new users to sign up; không bật anonymous sign-ins.
6. Lấy Project URL và Publishable key trong Connect/Settings/API Keys.
   Chỉ dùng publishable key (hoặc legacy anon key); KHÔNG dùng secret/service_role.

Bạn quản trị dashboard bằng tài khoản Supabase; đăng nhập website bằng user tạo ở bước 4.
Đây là hai tài khoản/luồng đăng nhập khác nhau.

## 2. Tải mã lên GitHub bằng trình duyệt

1. Mở https://github.com/new, owner teocong99x2002-cloud.
2. Repository name: mien-tri-thuc. Chọn Public nếu dùng GitHub Pages trên GitHub Free.
3. Tạo repository; có thể bật README.
4. Giải nén ZIP trên máy tính. Mở thư mục vừa giải nén.
5. Repository → Add file → Upload files.
6. Kéo các FILE và THƯ MỤC BÊN TRONG thư mục dự án vào trang upload.
   Không kéo nguyên thư mục cha. Không tải nguyên ZIP lên rồi mong GitHub tự giải nén.
7. Sau khi upload, package.json, package-lock.json, index.html, vite.config.ts phải
   nằm ngay trang gốc repository; src và public cũng ở cấp gốc.
8. Commit changes lên main. Nếu GitHub báo trùng README, dùng nội dung mới của gói.

**Quan trọng về thư mục .github:** File triển khai nằm trong `.github/workflows/deploy.yml`.
Một số máy/trình duyệt bỏ qua thư mục bắt đầu bằng dấu chấm khi kéo thả.
Hãy kiểm tra GitHub có thư mục `.github/workflows` sau khi upload.
Nếu chưa có:
- Add file → Create new file.
- Nhập tên chính xác `.github/workflows/deploy.yml`.
- Mở file cùng tên trong ZIP bằng Notepad/TextEdit, sao chép toàn bộ nội dung vào.
- Commit changes. Không cần tải .gitignore để website chạy nhưng nên có để quản lý mã.

## 3. Thêm cấu hình Supabase trên GitHub

Repository → Settings → Secrets and variables → Actions → tab Variables.
Chọn New repository variable, tạo hai biến:

| Name | Value |
|---|---|
| VITE_SUPABASE_URL | Project URL, ví dụ https://xxxxxxxx.supabase.co |
| VITE_SUPABASE_PUBLISHABLE_KEY | Publishable key từ Supabase |

Workflow dùng `vars`, vì vậy nhập ở **Variables**, không phải Secrets.
Hai giá trị này xuất hiện trong mã trình duyệt; RLS và đăng nhập mới bảo vệ dữ liệu.
Không đưa mật khẩu database, mật khẩu tài khoản hay secret/service_role key lên GitHub.

## 4. Bật website

1. Repository → Settings → Pages → Source: GitHub Actions.
2. Actions → Deploy Miền Tri Thức → Run workflow → chọn main → Run workflow.
3. Chờ job deploy màu xanh. Nếu đang có job chạy, chờ kết quả trước khi tạo job khác.
4. Settings → Pages: mở URL đã triển khai.
5. URL dự kiến khi dùng đúng tên repository:
   https://teocong99x2002-cloud.github.io/mien-tri-thuc/

Nếu chưa có biến Supabase, build vẫn chạy nhưng trang sẽ hiển thị hướng dẫn cấu hình.
Sau khi thêm/sửa Variables phải chạy lại workflow: website chỉ nhận giá trị lúc build.

## 5. Cấu hình URL đăng nhập và đặt lại mật khẩu

Supabase → Authentication → URL Configuration:
- Site URL: https://teocong99x2002-cloud.github.io/mien-tri-thuc/
- Thêm Redirect URL chính xác cùng địa chỉ trên → Save.

Đăng nhập thông thường dùng email/mật khẩu trực tiếp; không cần OAuth, Google hay ChatGPT.
Quên mật khẩu sử dụng email của Supabase: cần cấu hình gửi mail phù hợp. Dịch vụ email
mặc định có hạn chế về người nhận và tốc độ; nếu không nhận mail, xem log Auth/SMTP.
Bạn vẫn có thể quản lý/đặt lại tài khoản bằng công cụ quản trị Supabase phù hợp.

## 6. Kiểm tra sau triển khai

- Đăng nhập → thêm ghi chú → tải lại trang → vẫn thấy ghi chú.
- Table Editor → notes: thấy bản ghi có đúng user_id của bạn.
- Sửa, yêu thích, đánh dấu cần ôn tập, lọc theo chủ đề, tìm theo thẻ/nội dung.
- Đăng nhập trên thiết bị khác: thấy cùng ghi chú.
- Upload tệp nhỏ → lưu ghi chú → mở ghi chú → tải lại tệp.
- Đăng xuất/ẩn danh: chỉ thấy trang đăng nhập, không thấy dữ liệu riêng.
- Nếu kiểm tra nhiều user: user thứ hai không đọc/sửa được ghi chú hoặc tệp user đầu.
- Storage bucket documents phải là Private và bảng notes phải bật RLS.

## 7. Sao lưu, giới hạn và quản trị

- Nút Xuất dữ liệu ghi chú tải JSON gồm ghi chú và đường dẫn tệp, KHÔNG chứa bytes tệp.
- Sao lưu thêm tài liệu từ Storage. Gói này chưa có chức năng nhập JSON hàng loạt.
- Xóa ghi chú hoặc gỡ tệp khỏi ghi chú không xóa vật lý tài liệu trong Storage.
  Tệp tải lên nhưng chưa lưu ghi chú cũng còn trong Storage; bạn tự dọn sau khi kiểm tra.
- Không có AI trả phí hoặc API tính phí trong mã.
- Gói miễn phí vẫn có hạn mức và có thể tạm dừng project ít hoạt động.
- Dữ liệu cũ trên website trước không tự chuyển. Sao lưu JSON và tải lại tài liệu
  trước khi chuyển. Cấu trúc dữ liệu hệ thống trước cần chuyển đổi khi nhập.
- Mã frontend công khai; ghi chú không nằm trong repository. Cần giữ RLS đúng.
- Dùng project riêng hoặc kiểm tra policy cũ vì PostgreSQL có thể kết hợp nhiều policy.

## 8. Chạy trên máy tính (không bắt buộc)

Cài Node.js 22.13+ từ nguồn chính thức.

```sh
npm ci
```

Sao chép `.env.example` thành `.env.local`, điền hai giá trị public của Supabase.

```sh
npm run dev
```

Mở URL Vite in ra với đường dẫn /mien-tri-thuc/.

```sh
npm run build
npm run preview
```

Thư mục dist là bản giao diện đã build, không chứa backend.

## 9. Nếu đổi tên repository

Sửa `base` trong vite.config.ts thành `/<ten-repository>/`, đồng thời sửa Site URL và
Redirect URLs ở Supabase. Không đổi tên thì giữ nguyên /mien-tri-thuc/.

## 10. Lỗi thường gặp

| Hiện tượng | Cách xử lý |
|---|---|
| Không thấy workflow | Tạo đúng .github/workflows/deploy.yml; kiểm tra nhánh main |
| Actions báo Pages chưa bật | Settings → Pages → GitHub Actions, rồi chạy lại |
| Trang yêu cầu cấu hình Supabase | Kiểm tra Variables và chạy lại workflow |
| Email/mật khẩu chưa đúng | Dùng user trong Authentication → Users, không dùng mật khẩu dashboard/database |
| Failed to fetch | Kiểm tra Project URL, mạng và project Supabase có tạm dừng không |
| Lỗi RLS | Chạy setup.sql, kiểm tra user_id, không tắt RLS |
| Bucket not found | Kiểm tra bucket documents đã tạo trong đúng project |
| Giao diện trắng/404 tài nguyên | Kiểm tra repository mien-tri-thuc, base, file ở đúng cấp gốc |
| Tải tệp lỗi | Tệp <=10 MB, có Storage policies và đường dẫn bắt đầu bằng user ID |

## Trạng thái bàn giao

Đây là mã nguồn để bạn tải lên tài khoản riêng. Bản gói không chứa thông tin Supabase
của bạn và chưa được triển khai tới GitHub của bạn. Build/TypeScript được kiểm tra
khi đóng gói; kết nối database thực tế cần kiểm tra sau khi bạn cấu hình project.
