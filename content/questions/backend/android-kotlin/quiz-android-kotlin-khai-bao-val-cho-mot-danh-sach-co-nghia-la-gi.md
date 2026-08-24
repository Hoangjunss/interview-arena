---
id: quiz-android-kotlin-khai-bao-val-cho-mot-danh-sach-co-nghia-la-gi
position: backend
technology: android-kotlin
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khai báo val cho một danh sách có nghĩa là gì?

## Đáp án trắc nghiệm
- [ ] Cả biến và nội dung đều không đổi được
- [ ] Danh sách được sao chép mỗi lần truyền đi
- [ ] Danh sách được lưu ở vùng nhớ đặc biệt
- [x] Không gán lại biến được, nội dung vẫn đổi được

## Giải thích (VI)
val chỉ cấm gán lại biến , không khoá nội dung. val list = mutableListOf(1) vẫn cho list.add(2). Muốn nội dung bất biến thì phải chọn kiểu danh sách chỉ đọc, và đó là hai khái niệm khác nhau.

### Giải thích các phương án:
- **Cả biến và nội dung đều không đổi được** (Sai): Nội dung vẫn đổi được nếu danh sách thuộc kiểu có thể thay đổi.
- **Danh sách được sao chép mỗi lần truyền đi** (Sai): Không có bản sao nào được tạo.
- **Danh sách được lưu ở vùng nhớ đặc biệt** (Sai): Không có vùng nhớ riêng nào cho val.
- **Không gán lại biến được, nội dung vẫn đổi được** (Đúng): val khoá tham chiếu chứ không khoá nội dung, tính bất biến phụ thuộc kiểu của danh sách.
