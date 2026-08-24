---
id: quiz-ci-cd-pull-request-tu-fork-chay-trong-ci-co-rui-ro-gi
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pull request từ fork chạy trong CI có rủi ro gì?

## Đáp án trắc nghiệm
- [ ] Pipeline sẽ chạy chậm hơn vì phải clone thêm repo
- [ ] Kết quả test từ fork không đáng tin nên phải chạy lại
- [x] Code người ngoài chạy trong runner có thể lấy secret
- [ ] Fork có thể ghi trực tiếp vào nhánh chính của repo gốc

## Giải thích (VI)
Code do người ngoài viết chạy trong runner của bạn : nếu có secret thì họ in ra được, và có thể lạm dụng tài nguyên CI. Vì thế nền tảng CI mặc định không cấp secret cho workflow từ fork.

### Giải thích các phương án:
- **Pipeline sẽ chạy chậm hơn vì phải clone thêm repo** (Sai): Là vấn đề hiệu năng nhỏ, không phải rủi ro bảo mật.
- **Kết quả test từ fork không đáng tin nên phải chạy lại** (Sai): Kết quả vẫn tính được nếu pipeline chạy ở repo gốc.
- **Code người ngoài chạy trong runner có thể lấy secret** (Đúng): Vì thế mặc định workflow từ fork không nhận được secret của repo.
- **Fork có thể ghi trực tiếp vào nhánh chính của repo gốc** (Sai): Fork không có quyền ghi vào repo gốc.
