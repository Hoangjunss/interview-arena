---
id: quiz-graphql-phan-hoi-graphql-co-the-vua-co-d-lieu-vua-co-loi-khong
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phản hồi GraphQL có thể vừa có dữ liệu vừa có lỗi không?

## Đáp án trắc nghiệm
- [ ] Có, nhưng chỉ khi dùng mã trạng thái HTTP 500
- [x] Có, dữ liệu lấy được vẫn trả về kèm lỗi
- [ ] Không, có lỗi thì toàn bộ phản hồi bị bỏ
- [ ] Không, lỗi luôn được trả về ở một endpoint riêng

## Giải thích (VI)
Có. Phản hồi gồm phần dữ liệu và phần lỗi, nên một truy vấn có thể trả về kết quả một phần : nhánh nào lỗi thì null và được ghi vào danh sách lỗi, nhánh khác vẫn có dữ liệu bình thường.

### Giải thích các phương án:
- **Có, nhưng chỉ khi dùng mã trạng thái HTTP 500** (Sai): Mã trạng thái thường vẫn là 200 kể cả khi có lỗi trong phản hồi.
- **Có, dữ liệu lấy được vẫn trả về kèm lỗi** (Đúng): Đây là kết quả một phần, xảy ra khi một nhánh lỗi còn các nhánh khác thành công.
- **Không, có lỗi thì toàn bộ phản hồi bị bỏ** (Sai): Chỉ nhánh lỗi bị ảnh hưởng, phần còn lại vẫn được trả về.
- **Không, lỗi luôn được trả về ở một endpoint riêng** (Sai): Chỉ có một endpoint và lỗi nằm trong chính phản hồi.
