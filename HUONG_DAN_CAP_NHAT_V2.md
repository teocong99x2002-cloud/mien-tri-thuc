# Cập nhật v2 — Soạn thảo và thẻ con như Google Docs

Dành cho website hiện có của teocong99x2002-cloud, repository mien-tri-thuc.
Đây là GÓI CẬP NHẬT, không phải bộ cài cho repository rỗng.
Không phải nhập lại URL/key Supabase hoặc thay cấu hình GitHub Pages.

## Bước 1 — Sao lưu

Trên website hiện tại, chọn Xuất dữ liệu ghi chú để tải JSON về máy.
Tệp đính kèm cần sao lưu riêng từ Supabase Storage nếu cần.
Không xóa repository, project Supabase, bảng notes hay bucket documents.

## Bước 2 — Bổ sung database (làm trước khi upload code)

1. Giải nén ZIP.
2. Mở file supabase/upgrade_v2.sql bằng Notepad hoặc trình soạn thảo văn bản.
3. Sao chép toàn bộ nội dung.
4. Supabase → đúng project website đang dùng → SQL Editor → New query.
5. Dán nội dung rồi nhấn Run.

File SQL chỉ thêm cột JSONB document_tabs vào bảng notes. Không xóa hoặc ghi đè
content, user_id, tài liệu, chính sách RLS hay dữ liệu đang có. Có thể chạy lại.
Không chạy lại setup.sql và không tạo bảng notes mới để nâng cấp.
Ghi chú cũ được đưa vào thẻ Nội dung chính khi mở, chỉ ghi định dạng mới khi bấm Lưu.

## Bước 3 — Upload đè đúng các file

Mở repository mien-tri-thuc → Add file → Upload files.
Kéo các FILE và THƯ MỤC BÊN TRONG thư mục đã giải nén, không kéo thư mục cha hoặc ZIP.
Giữ nguyên đường dẫn bên dưới; file trùng tên là file được cập nhật.

| Đường dẫn | Thao tác |
|---|---|
| package.json | Đè file cũ ở cấp gốc |
| package-lock.json | Đè file cũ ở cấp gốc; cần thay cùng package.json |
| src/App.tsx | Đè file cũ |
| src/data.ts | Đè file cũ |
| src/styles.css | Đè file cũ |
| src/DocumentWorkspace.tsx | Thêm mới |
| src/RichEditor.tsx | Thêm mới |
| src/documentModel.ts | Thêm mới |
| supabase/upgrade_v2.sql | Thêm mới để lưu lịch sử; vẫn phải tự chạy trong SQL Editor |
| HUONG_DAN_CAP_NHAT_V2.md | Thêm mới; tài liệu hướng dẫn |

Đường dẫn đúng có package.json và package-lock.json ngay trang gốc repository,
không nằm trong một thư mục Mien_Tri_Thuc_V2/... khác.
Nhập mô tả commit: "Cập nhật soạn thảo tài liệu và thẻ con v2" → Commit changes.
Không cần thay src/main.tsx, src/supabase.ts, vite.config.ts hoặc .github/workflows/deploy.yml.
Không xóa các file cũ không xuất hiện trong ZIP.

## Bước 4 — Chờ website cập nhật

1. Mở Actions → Deploy Miền Tri Thức.
2. Commit mới tự kích hoạt workflow trên nhánh main.
3. Chờ job thành công. Nếu chưa chạy: Run workflow → main.
4. Mở website → Ctrl+Shift+R (hoặc Cmd+Shift+R) để tải lại mã mới.
5. Địa chỉ vẫn là https://teocong99x2002-cloud.github.io/mien-tri-thuc/

## Bước 5 — Sử dụng

- Đăng nhập bằng tài khoản cũ.
- Mở một ghi chú từ thư viện: màn hình soạn thảo tài liệu sẽ xuất hiện.
- Ghi chú cũ nằm trong thẻ Nội dung chính; không phải nhập lại nội dung.
- Bấm + ở tiêu đề Thẻ tài liệu để thêm thẻ cùng cấp cao nhất.
- Chọn thẻ cha → Thêm thẻ con để tạo cấu trúc nhiều cấp.
- Tên thẻ: sửa trong ô Tên thẻ ở bên trái.
- Nằm trong: chuyển thẻ sang thẻ cha khác hoặc cấp cao nhất.
- Mũi tên lên/xuống: đổi thứ tự các thẻ cùng cha.
- Bấm tên thẻ để đổi nội dung đang soạn; nội dung chưa lưu vẫn được giữ trong
  phiên đang mở khi đổi thẻ.
- Thanh công cụ có tiêu đề, cỡ chữ, đậm/nghiêng/gạch chân, màu chữ, căn lề,
  danh sách, trích dẫn, liên kết, bảng và ảnh.
- Bấm vào bảng để thấy chức năng thêm/xóa hàng/cột hoặc xóa bảng.
- Chèn ảnh PNG/JPG/WEBP/GIF tối đa 5 MB. Ảnh lưu trong bucket documents riêng tư;
  tài liệu lưu đường dẫn, không lưu URL tạm hết hạn. Chờ tải ảnh xong rồi lưu.
- Nút bánh răng ở đầu trang mở chủ đề, thẻ từ khóa, trạng thái, yêu thích, xóa tài liệu.
- Nhấn Lưu tài liệu hoặc Ctrl+S / Cmd+S để lưu tất cả thẻ lên Supabase.
- Không tự lưu định kỳ. Quan sát trạng thái "Chưa lưu thay đổi" và "Đã lưu".
- Nhấn Thư viện để quay lại. Có xác nhận khi đang có thay đổi chưa lưu.
- Trên điện thoại, dùng nút Hiện/Ẩn danh sách thẻ để mở hoặc đóng thanh bên.
- Tạo tài liệu mới: Thêm tri thức → nhập tên/chủ đề → Lưu tri thức → vùng soạn thảo mở.

## Dữ liệu và giới hạn

Mỗi tài liệu tối đa 100 thẻ. Nội dung định dạng lưu trong document_tabs, còn content
lưu văn bản tổng hợp để tìm kiếm và giữ khả năng đọc dữ liệu cũ. Mỗi lần lưu là lưu
cả tài liệu, vì vậy tránh chỉnh cùng tài liệu ở nhiều thiết bị cùng lúc.
Ảnh dùng cùng hạn mức Supabase Storage với tệp đính kèm.
Xóa thẻ chỉ xóa nội dung thẻ; các thẻ con được đưa lên một cấp và giữ nội dung.
Xóa ảnh khỏi nội dung hoặc xóa ghi chú không xóa vật lý tệp trong Storage; bạn tự
quản lý/dọn tệp trên dashboard sau khi kiểm tra để tránh xóa tài liệu còn dùng.
Không nhập/xuất trực tiếp file .docx; đây là vùng soạn thảo có định dạng trong web.
Bản sao JSON xuất từ website có documentTabs; ảnh/tệp vẫn phải sao lưu riêng.

## Nếu gặp lỗi

| Hiện tượng | Cách xử lý |
|---|---|
| Cần chạy upgrade_v2.sql / không tìm thấy document_tabs | Chạy SQL trong đúng project Supabase, rồi tải lại website |
| npm ci báo lock không khớp | Upload đè CẢ package.json và package-lock.json cùng gói này |
| Module RichEditor/DocumentWorkspace/documentModel not found | Kiểm tra 3 file mới nằm trong src, đúng tên chữ hoa/thường |
| Vẫn thấy giao diện cũ | Actions phải thành công; tải lại Ctrl+Shift+R |
| Không thấy nội dung vừa gõ sau khi đóng | Kiểm tra đã nhấn Lưu tài liệu trước khi đóng chưa |
| Ảnh không tải | Kiểm tra mạng, phiên đăng nhập, bucket documents, RLS Storage và hạn mức |
| Lỗi Pages Not Found trong Actions | Settings → Pages → Source chọn GitHub Actions; chạy lại workflow |

## Kiểm tra bản gói

- TypeScript và production build đã qua kiểm tra.
- Đã kiểm thử bảo toàn văn bản cũ, thứ tự thẻ, ngăn chu trình thẻ cha, chuyển cấp,
  sao chép dữ liệu và JSON.
- Đã kiểm thử giao diện với dữ liệu giả lập: thẻ nhiều cấp, in đậm, chuyển thẻ,
  chèn bảng và mở lại nội dung đã lưu vào bộ nhớ kiểm thử.
- Chưa kết nối project Supabase của bạn; cần kiểm tra lưu/tải dữ liệu và ảnh thực tế
  sau khi nâng cấp. Bộ gói không chứa khóa/mật khẩu của bạn.
