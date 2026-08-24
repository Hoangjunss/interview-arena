---
id: quiz-graphql-resolver-trong-graphql-lam-nhiem-vu-gi
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Resolver trong GraphQL làm nhiệm vụ gì?

## Đáp án trắc nghiệm
- [x] Trả về giá trị cho một trường khi truy vấn tới nó
- [ ] Kiểm tra cú pháp của truy vấn trước khi chạy
- [ ] Quyết định người dùng nào được gọi API
- [ ] Chuyển truy vấn GraphQL thành câu lệnh SQL tương ứng

## Giải thích (VI)
Resolver là hàm trả về giá trị cho một trường . Server đi theo hình dạng truy vấn và gọi resolver tương ứng cho từng trường, nên một truy vấn lồng nhiều tầng sẽ kích hoạt một cây lời gọi.

### Giải thích các phương án:
- **Trả về giá trị cho một trường khi truy vấn tới nó** (Đúng): Mỗi trường có thể có resolver riêng, và chúng ghép lại thành cây thực thi theo hình dạng truy vấn.
- **Kiểm tra cú pháp của truy vấn trước khi chạy** (Sai): Việc kiểm tra cú pháp và đối chiếu schema diễn ra trước bước thực thi.
- **Quyết định người dùng nào được gọi API** (Sai): Xác thực thường nằm ở tầng trước khi vào thực thi.
- **Chuyển truy vấn GraphQL thành câu lệnh SQL tương ứng** (Sai): Không có bước dịch tự động nào, việc lấy dữ liệu do người viết resolver quyết định.
