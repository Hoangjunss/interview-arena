---
id: quiz-nextjs-ham-duoi-day-co-use-server-dieu-gi-thuc-su-xay-ra-khi-form-duoc-submit
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hàm dưới đây có 'use server'. Điều gì thực sự xảy ra khi form được submit?

## Đáp án trắc nghiệm
- [ ] Hàm được bundle xuống client và chạy trong trình duyệt như một handler thường
- [ ] Cần tạo thêm một Route Handler thì form mới gửi được dữ liệu đi
- [ ] Hàm chỉ chạy lúc build, không xử lý được submit lúc chạy
- [x] Next.js tạo sẵn endpoint nội bộ; client gọi tới đó và hàm chạy trên server

## Giải thích (VI)
Next.js sinh một endpoint riêng cho hàm đó. Client gửi request tới endpoint, hàm chạy trên server với đầy đủ quyền truy cập database, rồi revalidatePath xóa cache để trang hiển thị dữ liệu mới. Code hàm không đi xuống trình duyệt.

### Giải thích các phương án:
- **Hàm được bundle xuống client và chạy trong trình duyệt như một handler thường** (Sai): Nếu vậy thì db và thông tin kết nối sẽ lộ ra client — đây chính là điều 'use server' ngăn chặn.
- **Cần tạo thêm một Route Handler thì form mới gửi được dữ liệu đi** (Sai): Không cần — Server Action tự có endpoint do Next.js sinh ra.
- **Hàm chỉ chạy lúc build, không xử lý được submit lúc chạy** (Sai): Server Action chạy theo từng lần gọi tại runtime.
- **Next.js tạo sẵn endpoint nội bộ; client gọi tới đó và hàm chạy trên server** (Đúng): Code của hàm không hề đi xuống trình duyệt. Server Action là lời gọi qua mạng được đóng gói sẵn, không phải hàm chạy ở client. Sau khi hàm chạy, revalidatePath làm mới cache của /posts.
