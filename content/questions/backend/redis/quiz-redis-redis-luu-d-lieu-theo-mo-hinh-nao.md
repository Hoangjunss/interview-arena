---
id: quiz-redis-redis-luu-d-lieu-theo-mo-hinh-nao
position: backend
technology: redis
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redis lưu dữ liệu theo mô hình nào?

## Đáp án trắc nghiệm
- [x] Key-value, mỗi value thuộc một kiểu dữ liệu có sẵn
- [ ] Tài liệu JSON lồng nhau, truy vấn bằng đường dẫn
- [ ] Bảng và dòng có schema cố định như cơ sở dữ liệu quan hệ
- [ ] Cột rộng, mỗi dòng có tập cột khác nhau

## Giải thích (VI)
Key-value, nhưng value có kiểu : string, list, hash, set, sorted set, stream. Chính điều này khác biệt với một cache thuần chuỗi — bạn tăng một số, đẩy vào cuối danh sách hay lấy top N của sorted set mà không cần đọc cả value về ứng dụng.

### Giải thích các phương án:
- **Key-value, mỗi value thuộc một kiểu dữ liệu có sẵn** (Đúng): String, list, hash, set, sorted set, stream — mỗi kiểu có bộ lệnh riêng thao tác tại chỗ.
- **Tài liệu JSON lồng nhau, truy vấn bằng đường dẫn** (Sai): Đó là mô hình tài liệu của MongoDB; Redis chỉ hỗ trợ JSON qua một module riêng.
- **Bảng và dòng có schema cố định như cơ sở dữ liệu quan hệ** (Sai): Redis không có bảng, không có schema và không có JOIN.
- **Cột rộng, mỗi dòng có tập cột khác nhau** (Sai): Đó là mô hình của Cassandra hay HBase.
