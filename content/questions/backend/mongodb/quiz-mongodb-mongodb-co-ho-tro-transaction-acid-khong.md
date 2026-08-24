---
id: quiz-mongodb-mongodb-co-ho-tro-transaction-acid-khong
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
MongoDB có hỗ trợ transaction ACID không?

## Đáp án trắc nghiệm
- [ ] Không — MongoDB là NoSQL nên về bản chất không thể có ACID
- [ ] Có, nhưng chỉ trong một collection duy nhất, không dùng được cho nhiều collection
- [x] Có — một document luôn atomic; từ 4.0 có transaction đa document
- [ ] Có, và nên dùng cho mọi thao tác ghi để đảm bảo an toàn dữ liệu

## Giải thích (VI)
Có. Ghi vào một document luôn atomic — kể cả khi cập nhật nhiều trường lồng nhau. Transaction đa document có từ 4.0 (replica set) và 4.2 (sharded cluster). Nhưng transaction tốn tài nguyên, nên mô hình hóa tốt để một thao tác nghiệp vụ gói trong một document vẫn là hướng ưu tiên.

### Giải thích các phương án:
- **Không — MongoDB là NoSQL nên về bản chất không thể có ACID** (Sai): NoSQL không đồng nghĩa với không có ACID; MongoDB đã hỗ trợ từ lâu.
- **Có, nhưng chỉ trong một collection duy nhất, không dùng được cho nhiều collection** (Sai): Transaction bao được nhiều collection và nhiều database.
- **Có — một document luôn atomic; từ 4.0 có transaction đa document** (Đúng): Đây đúng tiến trình hỗ trợ transaction của MongoDB: 4.0 cho replica set, 4.2 mở rộng sang cả cụm sharded.
- **Có, và nên dùng cho mọi thao tác ghi để đảm bảo an toàn dữ liệu** (Sai): Transaction có chi phí; ghi một document đã atomic sẵn nên không cần bọc thêm.
