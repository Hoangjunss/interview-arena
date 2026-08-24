---
id: quiz-cpp-loi-o-buoc-lien-ket-khac-loi-bien-dich-o-diem-nao
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lỗi ở bước liên kết khác lỗi biên dịch ở điểm nào?

## Đáp án trắc nghiệm
- [ ] Lỗi liên kết luôn kèm số dòng chính xác trong tệp
- [x] Liên kết báo thiếu định nghĩa cho thứ đã khai báo
- [ ] Lỗi liên kết chỉ xảy ra ở bản build tối ưu
- [ ] Lỗi liên kết luôn do sai cú pháp trong mã nguồn

## Giải thích (VI)
Trình biên dịch chỉ cần khai báo để xử lý một tệp; bước liên kết mới cần định nghĩa thật . Vì thế lỗi thiếu ký hiệu xuất hiện ở bước liên kết và thường không kèm vị trí trong mã nguồn, nên khó lần hơn.

### Giải thích các phương án:
- **Lỗi liên kết luôn kèm số dòng chính xác trong tệp** (Sai): Thông điệp thường chỉ nêu tên ký hiệu chứ không có vị trí trong mã nguồn.
- **Liên kết báo thiếu định nghĩa cho thứ đã khai báo** (Đúng): Trình biên dịch chỉ cần khai báo, còn bước liên kết mới cần định nghĩa thật của hàm.
- **Lỗi liên kết chỉ xảy ra ở bản build tối ưu** (Sai): Nó xảy ra ở mọi chế độ build.
- **Lỗi liên kết luôn do sai cú pháp trong mã nguồn** (Sai): Sai cú pháp bị bắt ở bước biên dịch, không tới được bước liên kết.
