---
id: quiz-mongodb-collection-5-trieu-document-truy-van-dbusersfind-email-abc-rat-cham-nguyen-nhan
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Collection 5 triệu document, truy vấn db.users.find({ email: "a@b.c" }) rất chậm. Nguyên nhân thường gặp nhất là gì?

## Đáp án trắc nghiệm
- [x] Trường email chưa có index nên MongoDB phải quét toàn bộ collection
- [ ] Truy vấn theo chuỗi luôn chậm hơn theo số, phải đổi email sang kiểu số
- [ ] Collection quá lớn nên bắt buộc phải shard, không có cách nào khác
- [ ] Phải dùng findOne thay vì find, find luôn đọc hết collection

## Giải thích (VI)
Thiếu index trên email. Không có index, MongoDB đọc lần lượt cả 5 triệu document. Tạo db.users.createIndex({ email: 1 }, { unique: true }) đưa việc tìm về tra cứu B-tree. Xác nhận bằng .explain() — thấy COLLSCAN là chưa có index dùng được.

### Giải thích các phương án:
- **Trường email chưa có index nên MongoDB phải quét toàn bộ collection** (Đúng): Không có index thì mọi truy vấn theo trường đó đều phải đọc hết collection (collection scan); tạo index trên email là xử lý được.
- **Truy vấn theo chuỗi luôn chậm hơn theo số, phải đổi email sang kiểu số** (Sai): Index hoạt động tốt với chuỗi; kiểu dữ liệu không phải vấn đề ở đây.
- **Collection quá lớn nên bắt buộc phải shard, không có cách nào khác** (Sai): 5 triệu document là quy mô nhỏ với MongoDB nếu đã đánh index đúng.
- **Phải dùng findOne thay vì find, find luôn đọc hết collection** (Sai): findOne chỉ giới hạn kết quả về 1; không có index thì nó vẫn phải quét.
