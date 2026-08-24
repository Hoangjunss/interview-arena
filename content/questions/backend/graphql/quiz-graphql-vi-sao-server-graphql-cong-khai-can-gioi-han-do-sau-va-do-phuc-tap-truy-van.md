---
id: quiz-graphql-vi-sao-server-graphql-cong-khai-can-gioi-han-do-sau-va-do-phuc-tap-truy-van
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao server GraphQL công khai cần giới hạn độ sâu và độ phức tạp truy vấn?

## Đáp án trắc nghiệm
- [ ] Giới hạn giúp truy vấn được cache hiệu quả hơn
- [ ] Đặc tả GraphQL bắt buộc phải có giới hạn này
- [ ] Trình phân tích không xử lý được truy vấn quá dài
- [x] Một truy vấn lồng sâu có thể làm quá tải server

## Giải thích (VI)
Vì client tự quyết định hình dạng truy vấn, một truy vấn lồng sâu qua các quan hệ hai chiều có thể tăng khối lượng theo cấp số nhân và làm quá tải server chỉ với một yêu cầu duy nhất.

### Giải thích các phương án:
- **Giới hạn giúp truy vấn được cache hiệu quả hơn** (Sai): Bộ nhớ đệm không phụ thuộc vào giới hạn độ sâu.
- **Đặc tả GraphQL bắt buộc phải có giới hạn này** (Sai): Đặc tả không quy định, đây là biện pháp vận hành.
- **Trình phân tích không xử lý được truy vấn quá dài** (Sai): Phân tích cú pháp không phải điểm nghẽn.
- **Một truy vấn lồng sâu có thể làm quá tải server** (Đúng): Quan hệ hai chiều cho phép lồng vòng lặp và tạo ra khối lượng dữ liệu tăng theo cấp số nhân.
