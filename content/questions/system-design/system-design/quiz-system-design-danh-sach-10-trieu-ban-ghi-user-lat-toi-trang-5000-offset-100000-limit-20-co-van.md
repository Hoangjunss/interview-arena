---
id: quiz-system-design-danh-sach-10-trieu-ban-ghi-user-lat-toi-trang-5000-offset-100000-limit-20-co-van
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Danh sách 10 triệu bản ghi, user lật tới trang 5000. OFFSET 100000 LIMIT 20 có vấn đề gì?

## Đáp án trắc nghiệm
- [x] DB phải quét rồi bỏ qua 100000 dòng nên càng sâu càng chậm
- [ ] OFFSET có giới hạn tối đa nên truy vấn sẽ báo lỗi
- [ ] Chỉ chậm khi bảng chưa có index trên cột dùng để sắp xếp
- [ ] Kết quả trả về sai thứ tự khi OFFSET lớn

## Giải thích (VI)
DB vẫn phải đi qua rồi loại bỏ 100000 dòng trước khi lấy 20 dòng cần — thời gian tăng theo độ sâu trang. Dùng cursor/keyset : WHERE (created_at, id) < (:lastCreatedAt, :lastId) ORDER BY created_at DESC, id DESC LIMIT 20.

### Giải thích các phương án:
- **DB phải quét rồi bỏ qua 100000 dòng nên càng sâu càng chậm** (Đúng): Cursor-based (keyset) phân trang dùng điều kiện trên cột đã sắp nên thời gian không đổi.
- **OFFSET có giới hạn tối đa nên truy vấn sẽ báo lỗi** (Sai): Không có giới hạn cứng cho OFFSET.
- **Chỉ chậm khi bảng chưa có index trên cột dùng để sắp xếp** (Sai): Có index vẫn phải đi qua 100000 entry trước khi trả kết quả.
- **Kết quả trả về sai thứ tự khi OFFSET lớn** (Sai): Thứ tự do ORDER BY quyết định, không phụ thuộc OFFSET.
