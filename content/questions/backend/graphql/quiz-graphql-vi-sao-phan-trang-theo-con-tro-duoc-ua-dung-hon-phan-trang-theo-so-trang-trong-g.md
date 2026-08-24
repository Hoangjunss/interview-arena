---
id: quiz-graphql-vi-sao-phan-trang-theo-con-tro-duoc-ua-dung-hon-phan-trang-theo-so-trang-trong-g
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao phân trang theo con trỏ được ưa dùng hơn phân trang theo số trang trong GraphQL?

## Đáp án trắc nghiệm
- [ ] Con trỏ không cần chỉ mục trong cơ sở dữ liệu
- [x] Dữ liệu chèn thêm không gây lặp phần tử
- [ ] Con trỏ cho phép nhảy tới trang bất kỳ dễ hơn
- [ ] Con trỏ giảm số lượng trường phải trả về

## Giải thích (VI)
Con trỏ trỏ vào một vị trí xác định trong tập kết quả, nên bản ghi mới chèn vào không làm lệch trang như phân trang theo số trang. Đổi lại, nhảy thẳng tới trang thứ mười là việc khó với con trỏ.

### Giải thích các phương án:
- **Con trỏ không cần chỉ mục trong cơ sở dữ liệu** (Sai): Vẫn cần chỉ mục trên cột dùng để sắp xếp.
- **Dữ liệu chèn thêm không gây lặp phần tử** (Đúng): Con trỏ trỏ vào một vị trí xác định trong tập kết quả nên không bị lệch khi có bản ghi mới.
- **Con trỏ cho phép nhảy tới trang bất kỳ dễ hơn** (Sai): Ngược lại, nhảy tới một trang cụ thể là điểm yếu của phân trang theo con trỏ.
- **Con trỏ giảm số lượng trường phải trả về** (Sai): Nó còn thêm các trường mô tả trang.
