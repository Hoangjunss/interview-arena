---
id: quiz-mongodb-khi-nao-nen-nhung-embed-d-lieu-lien-quan-vao-document-thay-vi-tham-chieu-referen
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào nên nhúng (embed) dữ liệu liên quan vào document thay vì tham chiếu (reference) sang collection khác?

## Đáp án trắc nghiệm
- [x] Khi dữ liệu con luôn đọc cùng document cha và số lượng có giới hạn
- [ ] Luôn luôn nhúng — MongoDB không hỗ trợ join nên tham chiếu là vô nghĩa
- [ ] Khi số lượng phần tử con không giới hạn, ví dụ toàn bộ log của một thiết bị
- [ ] Khi dữ liệu con được nhiều document cha dùng chung, để tránh lặp

## Giải thích (VI)
Nhúng khi dữ liệu con luôn đọc kèm cha, số lượng có trần, và không cần truy vấn riêng. Tham chiếu khi dữ liệu dùng chung giữa nhiều nơi, khi mảng có thể tăng vô hạn, hoặc khi cần truy vấn độc lập. Giới hạn cứng: một document tối đa 16MB.

### Giải thích các phương án:
- **Khi dữ liệu con luôn đọc cùng document cha và số lượng có giới hạn** (Đúng): Nhúng tối ưu cho việc đọc cùng nhau; giới hạn số lượng là điều kiện quan trọng, và dữ liệu con cũng không được cần truy vấn độc lập — ví dụ danh sách địa chỉ của một người dùng.
- **Luôn luôn nhúng — MongoDB không hỗ trợ join nên tham chiếu là vô nghĩa** (Sai): MongoDB có $lookup, và tham chiếu là mẫu hợp lệ cho quan hệ lớn hoặc dùng chung.
- **Khi số lượng phần tử con không giới hạn, ví dụ toàn bộ log của một thiết bị** (Sai): Mảng tăng vô hạn sẽ đụng giới hạn 16MB của document — trường hợp này phải tham chiếu.
- **Khi dữ liệu con được nhiều document cha dùng chung, để tránh lặp** (Sai): Đó chính là trường hợp NÊN tham chiếu — nhúng sẽ nhân bản dữ liệu ở nhiều nơi.
