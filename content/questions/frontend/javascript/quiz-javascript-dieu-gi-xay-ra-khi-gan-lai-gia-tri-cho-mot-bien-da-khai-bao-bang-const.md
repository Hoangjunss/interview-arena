---
id: quiz-javascript-dieu-gi-xay-ra-khi-gan-lai-gia-tri-cho-mot-bien-da-khai-bao-bang-const
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Điều gì xảy ra khi gán lại giá trị cho một biến đã khai báo bằng const?

## Đáp án trắc nghiệm
- [ ] Chỉ báo lỗi nếu giá trị mới khác kiểu với giá trị cũ
- [x] Chương trình ném TypeError khi chạy — const không cho phép gán lại biến
- [ ] Phép gán bị bỏ qua trong im lặng, biến giữ giá trị cũ
- [ ] Biến nhận giá trị mới bình thường, const chỉ là quy ước đặt tên

## Giải thích (VI)
Gán lại biến const ném TypeError: Assignment to constant variable khi chạy. const khoá binding (không cho gán lại), còn let cho phép gán lại. Lưu ý: const không đóng băng giá trị — object/array mà nó trỏ tới vẫn sửa nội dung được. Quy tắc thực hành: mặc định const, chỉ dùng let khi cần gán lại.

### Giải thích các phương án:
- **Chỉ báo lỗi nếu giá trị mới khác kiểu với giá trị cũ** (Sai): JS không kiểm tra kiểu khi gán; lỗi xảy ra vì gán lại binding const, bất kể kiểu giá trị mới là gì.
- **Chương trình ném TypeError khi chạy — const không cho phép gán lại biến** (Đúng): const a = 1; a = 2 ném TypeError: Assignment to constant variable — binding của const không thể gán lại.
- **Phép gán bị bỏ qua trong im lặng, biến giữ giá trị cũ** (Sai): JS không bỏ qua trong im lặng: phép gán lại const ném TypeError, dừng luồng thực thi hiện tại.
- **Biến nhận giá trị mới bình thường, const chỉ là quy ước đặt tên** (Sai): const là ràng buộc thật của ngôn ngữ, không phải quy ước; gán lại luôn ném lỗi khi chạy.
