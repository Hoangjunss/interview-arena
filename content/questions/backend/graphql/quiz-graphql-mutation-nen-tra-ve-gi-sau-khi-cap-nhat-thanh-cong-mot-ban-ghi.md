---
id: quiz-graphql-mutation-nen-tra-ve-gi-sau-khi-cap-nhat-thanh-cong-mot-ban-ghi
position: backend
technology: graphql
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mutation nên trả về gì sau khi cập nhật thành công một bản ghi?

## Đáp án trắc nghiệm
- [ ] Một giá trị đúng sai cho biết đã thành công
- [ ] Toàn bộ danh sách chứa bản ghi đó
- [ ] Chuỗi thông báo để hiển thị cho người dùng
- [x] Bản ghi vừa thay đổi kèm các trường liên quan

## Giải thích (VI)
Trả về bản ghi vừa thay đổi kèm các trường liên quan, để client cập nhật cache và giao diện ngay. Với cache chuẩn hoá, chỉ cần định danh và các trường đã đổi là mọi màn hình đang hiển thị tự cập nhật.

### Giải thích các phương án:
- **Một giá trị đúng sai cho biết đã thành công** (Sai): Client buộc phải gọi thêm một truy vấn để lấy dữ liệu mới.
- **Toàn bộ danh sách chứa bản ghi đó** (Sai): Tốn dữ liệu không cần thiết, nhất là với danh sách dài.
- **Chuỗi thông báo để hiển thị cho người dùng** (Sai): Nội dung hiển thị nên do client quyết định theo ngôn ngữ và ngữ cảnh.
- **Bản ghi vừa thay đổi kèm các trường liên quan** (Đúng): Client cập nhật được bộ nhớ đệm và giao diện ngay mà không cần gọi thêm truy vấn.
