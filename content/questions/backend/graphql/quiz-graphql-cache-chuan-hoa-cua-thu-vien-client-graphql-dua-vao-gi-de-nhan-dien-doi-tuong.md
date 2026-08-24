---
id: quiz-graphql-cache-chuan-hoa-cua-thu-vien-client-graphql-dua-vao-gi-de-nhan-dien-doi-tuong
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cache chuẩn hoá của thư viện client GraphQL dựa vào gì để nhận diện đối tượng?

## Đáp án trắc nghiệm
- [x] Tên kiểu kết hợp với định danh của bản ghi
- [ ] Thời điểm phản hồi được nhận về
- [ ] Chuỗi truy vấn đã gửi tới server
- [ ] Thứ tự phần tử trong danh sách trả về

## Giải thích (VI)
Dựa vào tên kiểu cộng định danh của bản ghi. Nhờ vậy cùng một đối tượng xuất hiện trong nhiều truy vấn chỉ được lưu một bản, và cập nhật nó ở một nơi sẽ tự phản ánh ở mọi màn hình đang hiển thị.

### Giải thích các phương án:
- **Tên kiểu kết hợp với định danh của bản ghi** (Đúng): Nhờ cặp này, cùng một bản ghi xuất hiện ở nhiều truy vấn được lưu chung một chỗ.
- **Thời điểm phản hồi được nhận về** (Sai): Thời điểm dùng cho việc hết hạn chứ không phải nhận diện.
- **Chuỗi truy vấn đã gửi tới server** (Sai): Đệm theo chuỗi truy vấn là cách thô hơn và không chia sẻ được giữa các truy vấn.
- **Thứ tự phần tử trong danh sách trả về** (Sai): Thứ tự thay đổi liên tục nên không dùng làm định danh được.
