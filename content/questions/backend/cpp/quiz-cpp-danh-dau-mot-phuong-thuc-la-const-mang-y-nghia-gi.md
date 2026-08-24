---
id: quiz-cpp-danh-dau-mot-phuong-thuc-la-const-mang-y-nghia-gi
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Đánh dấu một phương thức là const mang ý nghĩa gì?

## Đáp án trắc nghiệm
- [ ] Phương thức được trình biên dịch nội tuyến tự động
- [ ] Phương thức không được trả về giá trị nào
- [ ] Phương thức chỉ gọi được một lần cho mỗi đối tượng
- [x] Phương thức không sửa trạng thái đối tượng

## Giải thích (VI)
Phương thức const cam kết không sửa trạng thái đối tượng , nên gọi được trên đối tượng hằng và trên tham chiếu hằng. Đây là điều kiện để truyền đối tượng bằng tham chiếu hằng, cách truyền tham số phổ biến nhất trong C++.

### Giải thích các phương án:
- **Phương thức được trình biên dịch nội tuyến tự động** (Sai): Việc nội tuyến do trình biên dịch quyết định độc lập.
- **Phương thức không được trả về giá trị nào** (Sai): Nó vẫn trả về giá trị bình thường.
- **Phương thức chỉ gọi được một lần cho mỗi đối tượng** (Sai): Không có giới hạn số lần gọi.
- **Phương thức không sửa trạng thái đối tượng** (Đúng): Nhờ đó nó gọi được trên đối tượng hằng và trình biên dịch chặn việc sửa nhầm.
