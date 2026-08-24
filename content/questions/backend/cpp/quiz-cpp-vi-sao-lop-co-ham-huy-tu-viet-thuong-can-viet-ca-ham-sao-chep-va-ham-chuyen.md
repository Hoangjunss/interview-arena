---
id: quiz-cpp-vi-sao-lop-co-ham-huy-tu-viet-thuong-can-viet-ca-ham-sao-chep-va-ham-chuyen
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao lớp có hàm huỷ tự viết thường cần viết cả hàm sao chép và hàm chuyển?

## Đáp án trắc nghiệm
- [ ] Thiếu chúng thì lớp không dùng được trong container
- [ ] Các hàm này bắt buộc theo chuẩn ngôn ngữ
- [ ] Trình biên dịch từ chối biên dịch lớp thiếu các hàm này
- [x] Bản sao mặc định gây giải phóng hai lần

## Giải thích (VI)
Hàm huỷ tự viết thường có nghĩa lớp đang quản lý tài nguyên thô . Bản sao mặc định chỉ sao chép con trỏ, nên hai đối tượng cùng trỏ vào một tài nguyên và cả hai đều giải phóng nó khi bị huỷ.

### Giải thích các phương án:
- **Thiếu chúng thì lớp không dùng được trong container** (Sai): Vẫn dùng được, chỉ là hành vi sai.
- **Các hàm này bắt buộc theo chuẩn ngôn ngữ** (Sai): Chuẩn không bắt buộc, đây là hướng dẫn thiết kế.
- **Trình biên dịch từ chối biên dịch lớp thiếu các hàm này** (Sai): Trình biên dịch vẫn sinh bản mặc định.
- **Bản sao mặc định gây giải phóng hai lần** (Đúng): Hàm huỷ tự viết thường có nghĩa lớp đang quản lý tài nguyên thô, và sao chép nông là hỏng.
