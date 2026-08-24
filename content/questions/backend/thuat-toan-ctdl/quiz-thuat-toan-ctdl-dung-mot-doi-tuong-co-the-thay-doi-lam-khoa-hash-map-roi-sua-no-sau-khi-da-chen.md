---
id: quiz-thuat-toan-ctdl-dung-mot-doi-tuong-co-the-thay-doi-lam-khoa-hash-map-roi-sua-no-sau-khi-da-chen
position: backend
technology: thuat-toan-ctdl
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dùng một đối tượng có thể thay đổi làm khoá hash map, rồi sửa nó sau khi đã chèn. Chuyện gì xảy ra?

## Đáp án trắc nghiệm
- [ ] Mục bị xoá khỏi bảng để giữ tính nhất quán
- [ ] Chương trình báo lỗi ngay khi khoá bị sửa
- [ ] Bảng tự động dời mục sang ô đúng khi khoá thay đổi
- [x] Mục cũ gần như không tìm lại được vì băm đã đổi

## Giải thích (VI)
Mục trở thành rác không truy cập được. Bảng đã đặt mục vào ô tính theo giá trị băm cũ; sau khi khoá đổi, lần tra sau tính ra ô mới và không thấy gì ở đó, dù mục vẫn chiếm bộ nhớ. Vì vậy khoá phải bất biến trong suốt thời gian nằm trong bảng.

### Giải thích các phương án:
- **Mục bị xoá khỏi bảng để giữ tính nhất quán** (Sai): Không có cơ chế nào xoá tự động; mục vẫn tồn tại nhưng không tra tới được.
- **Chương trình báo lỗi ngay khi khoá bị sửa** (Sai): Phần lớn ngôn ngữ không phát hiện được, nên lỗi diễn ra âm thầm.
- **Bảng tự động dời mục sang ô đúng khi khoá thay đổi** (Sai): Bảng không theo dõi khoá; nó chỉ băm lại khi có thao tác chèn hoặc mở rộng.
- **Mục cũ gần như không tìm lại được vì băm đã đổi** (Đúng): Bảng tra ở ô mới trong khi mục vẫn nằm ở ô cũ.
