---
id: quiz-mongodb-chi-3-document-co-truong-deletedat-muon-danh-index-cho-truong-do-ma-tiet-kiem-du
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chỉ 3% document có trường deletedAt. Muốn đánh index cho trường đó mà tiết kiệm dung lượng thì dùng loại nào?

## Đáp án trắc nghiệm
- [ ] Text index — tối ưu cho trường xuất hiện thưa thớt
- [ ] Hashed index
- [x] Partial index — chỉ index document thoả điều kiện
- [ ] Compound index gồm deletedAt và _id

## Giải thích (VI)
Partial index: createIndex({ deletedAt: 1 }, { partialFilterExpression: { deletedAt: { $exists: true } } }). Nó chỉ chứa 3% document đó nên nhỏ và ghi nhanh. Đổi lại truy vấn chỉ dùng được index này khi điều kiện lọc bao hàm điều kiện của index.

### Giải thích các phương án:
- **Text index — tối ưu cho trường xuất hiện thưa thớt** (Sai): Text index dành cho tìm kiếm toàn văn, không liên quan tới độ thưa.
- **Hashed index** (Sai): Hashed index dùng cho phân tán shard key, không cho việc này.
- **Partial index — chỉ index document thoả điều kiện** (Đúng): Partial index sinh ra đúng cho trường hợp chỉ một phần nhỏ dữ liệu cần tra: index nhỏ hơn nhiều và ghi cũng nhanh hơn.
- **Compound index gồm deletedAt và _id** (Sai): Vẫn lập chỉ mục toàn bộ document, không tiết kiệm gì.
