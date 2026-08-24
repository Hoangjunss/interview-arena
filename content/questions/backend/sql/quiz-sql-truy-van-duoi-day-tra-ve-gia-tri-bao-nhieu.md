---
id: quiz-sql-truy-van-duoi-day-tra-ve-gia-tri-bao-nhieu
position: backend
technology: sql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Truy vấn dưới đây trả về giá trị bao nhiêu?

## Đáp án trắc nghiệm
- [ ] 1 — dòng id=2 có status là NULL nên khớp điều kiện = NULL
- [x] 0 — phải dùng IS NULL thay cho = NULL
- [ ] 2 — NULL khớp với mọi giá trị nên cả hai dòng đều được đếm
- [ ] Lỗi cú pháp — không được phép viết = NULL trong SQL

## Giải thích (VI)
Kết quả là 0. NULL nghĩa là "không biết / chưa có", nên mọi so sánh bằng dấu = với NULL đều cho kết quả không xác định (unknown) — kể cả với chính dòng có status NULL. WHERE chỉ giữ dòng có điều kiện true, do đó không dòng nào được đếm. Muốn tìm dòng NULL, dùng status IS NULL; ngược lại dùng status IS NOT NULL.

### Giải thích các phương án:
- **1 — dòng id=2 có status là NULL nên khớp điều kiện = NULL** (Sai): Đây là hiểu nhầm phổ biến: NULL = NULL không cho true mà cho unknown — muốn tìm dòng NULL phải viết status IS NULL.
- **0 — phải dùng IS NULL thay cho = NULL** (Đúng): Đúng: NULL nghĩa là "không biết", nên bất kỳ so sánh = với NULL đều cho unknown, kể cả NULL = NULL; WHERE loại toàn bộ. So sánh bằng với NULL cho kết quả không xác định ở mọi dòng nên không dòng nào qua được mệnh đề lọc.
- **2 — NULL khớp với mọi giá trị nên cả hai dòng đều được đếm** (Sai): NULL không khớp với giá trị nào cả — mọi so sánh với NULL đều cho unknown, không phải "khớp tất cả".
- **Lỗi cú pháp — không được phép viết = NULL trong SQL** (Sai): Cú pháp = NULL hợp lệ và chạy bình thường — vấn đề là nó luôn cho unknown nên không bao giờ khớp dòng nào, một bug âm thầm chứ không phải lỗi.
