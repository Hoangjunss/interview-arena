---
id: quiz-mongodb-mongodb-luu-d-lieu-theo-mo-hinh-nao
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
MongoDB lưu dữ liệu theo mô hình nào?

## Đáp án trắc nghiệm
- [ ] Đồ thị gồm node và cạnh, tối ưu cho truy vấn quan hệ nhiều tầng
- [x] Document dạng BSON trong collection, không cần schema trước
- [ ] Bảng gồm hàng và cột với schema cố định, giống hệt PostgreSQL
- [ ] Cặp khóa–giá trị phẳng, mỗi giá trị chỉ là chuỗi

## Giải thích (VI)
MongoDB lưu document BSON trong collection. BSON là dạng nhị phân của JSON, hỗ trợ thêm kiểu như Date, ObjectId, Decimal128. Document lồng được object và mảng, và hai document trong cùng collection không bắt buộc có cùng tập trường.

### Giải thích các phương án:
- **Đồ thị gồm node và cạnh, tối ưu cho truy vấn quan hệ nhiều tầng** (Sai): Đó là graph database như Neo4j.
- **Document dạng BSON trong collection, không cần schema trước** (Đúng): Đây đúng mô hình document-oriented của MongoDB: BSON là JSON nhị phân, và mỗi document trong cùng collection có thể có tập trường khác nhau.
- **Bảng gồm hàng và cột với schema cố định, giống hệt PostgreSQL** (Sai): Đó là mô hình quan hệ; MongoDB không dùng bảng cứng.
- **Cặp khóa–giá trị phẳng, mỗi giá trị chỉ là chuỗi** (Sai): Đó là mô hình key-value như Redis; document của MongoDB lồng nhau được.
