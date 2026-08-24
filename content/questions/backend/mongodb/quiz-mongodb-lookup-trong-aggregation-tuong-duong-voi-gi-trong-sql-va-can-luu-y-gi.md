---
id: quiz-mongodb-lookup-trong-aggregation-tuong-duong-voi-gi-trong-sql-va-can-luu-y-gi
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
$lookup trong aggregation tương đương với gì trong SQL, và cần lưu ý gì?

## Đáp án trắc nghiệm
- [ ] Nó gộp hai collection thành một collection mới lưu trên đĩa
- [ ] MongoDB không hỗ trợ nối collection, $lookup chỉ đổi tên trường
- [x] Gần LEFT OUTER JOIN — gắn mảng document khớp; cần index trên trường nối
- [ ] Tương đương INNER JOIN — document không có bản khớp sẽ bị loại khỏi kết quả

## Giải thích (VI)
$lookup giống LEFT OUTER JOIN: mỗi document được gắn thêm một mảng chứa các document khớp bên collection kia; không khớp thì mảng rỗng. Bắt buộc đánh index trên trường được nối (foreignField), nếu không mỗi document đầu vào kéo theo một lần quét toàn bộ collection kia.

### Giải thích các phương án:
- **Nó gộp hai collection thành một collection mới lưu trên đĩa** (Sai): Nó chỉ tạo kết quả trong pipeline, không ghi ra collection nào.
- **MongoDB không hỗ trợ nối collection, $lookup chỉ đổi tên trường** (Sai): $lookup thực sự nối dữ liệu giữa hai collection.
- **Gần LEFT OUTER JOIN — gắn mảng document khớp; cần index trên trường nối** (Đúng): Đúng ngữ nghĩa LEFT JOIN, và index trên trường được nối là điều kiện để nó không biến thành N lần quét collection kia.
- **Tương đương INNER JOIN — document không có bản khớp sẽ bị loại khỏi kết quả** (Sai): Không khớp thì $lookup trả về mảng rỗng chứ không loại document đi.
