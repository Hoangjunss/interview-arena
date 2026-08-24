---
id: quiz-mongodb-objectid-mac-dinh-cua-mongodb-co-dac-diem-gi-dang-chu-y
position: backend
technology: mongodb
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
ObjectId mặc định của MongoDB có đặc điểm gì đáng chú ý?

## Đáp án trắc nghiệm
- [x] 12 byte, có chứa dấu thời gian tạo document
- [ ] Nó là số nguyên tăng dần do server cấp phát tuần tự
- [ ] Nó là UUID v4 hoàn toàn ngẫu nhiên
- [ ] Nó là hash SHA-256 của nội dung document

## Giải thích (VI)
ObjectId dài 12 byte: 4 byte timestamp giây, 5 byte ngẫu nhiên theo tiến trình, 3 byte bộ đếm. Vì timestamp nằm ở đầu nên nó tăng dần theo thời gian tạo, và lấy ra được ngày tạo mà không cần thêm trường createdAt.

### Giải thích các phương án:
- **12 byte, có chứa dấu thời gian tạo document** (Đúng): ObjectId gồm dấu thời gian tạo, giá trị ngẫu nhiên và bộ đếm — nên nó tăng dần theo thời gian và trích ra được thời điểm tạo document.
- **Nó là số nguyên tăng dần do server cấp phát tuần tự** (Sai): ObjectId sinh ở phía client/driver, không cần server cấp, và không phải số nguyên.
- **Nó là UUID v4 hoàn toàn ngẫu nhiên** (Sai): UUID v4 không mang thông tin thời gian; ObjectId thì có.
- **Nó là hash SHA-256 của nội dung document** (Sai): Không liên quan tới nội dung document.
