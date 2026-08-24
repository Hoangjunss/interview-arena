---
id: quiz-cpp-truyen-mot-doi-tuong-lon-vao-ham-chi-de-doc-nen-dung-cach-nao
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Truyền một đối tượng lớn vào hàm chỉ để đọc nên dùng cách nào?

## Đáp án trắc nghiệm
- [ ] Truyền bằng con trỏ thô cho linh hoạt
- [ ] Truyền theo giá trị cho an toàn
- [ ] Truyền bằng smart pointer chia sẻ
- [x] Truyền bằng tham chiếu hằng

## Giải thích (VI)
Dùng tham chiếu hằng : không tạo bản sao và cam kết không sửa. Với kiểu nhỏ như số nguyên hay con trỏ thì truyền theo giá trị lại rẻ hơn vì tránh được một tầng gián tiếp.

### Giải thích các phương án:
- **Truyền bằng con trỏ thô cho linh hoạt** (Sai): Mở ra khả năng nhận null và không diễn tả được ý định chỉ đọc.
- **Truyền theo giá trị cho an toàn** (Sai): Tạo một bản sao đầy đủ, tốn kém với đối tượng lớn.
- **Truyền bằng smart pointer chia sẻ** (Sai): Thêm chi phí đếm tham chiếu cho một việc chỉ cần đọc.
- **Truyền bằng tham chiếu hằng** (Đúng): Không tạo bản sao mà vẫn cam kết không sửa đối tượng của người gọi.
