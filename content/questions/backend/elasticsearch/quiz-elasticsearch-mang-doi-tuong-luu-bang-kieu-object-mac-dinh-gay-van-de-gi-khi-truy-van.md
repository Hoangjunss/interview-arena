---
id: quiz-elasticsearch-mang-doi-tuong-luu-bang-kieu-object-mac-dinh-gay-van-de-gi-khi-truy-van
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Mảng đối tượng lưu bằng kiểu object mặc định gây vấn đề gì khi truy vấn?

## Đáp án trắc nghiệm
- [ ] Không thể gộp nhóm trên các trường bên trong
- [ ] Mảng bị chuyển thành chuỗi ký tự khi lưu
- [ ] Chỉ phần tử đầu tiên của mảng được đánh chỉ mục
- [x] Quan hệ giữa các trường trong cùng phần tử bị mất

## Giải thích (VI)
Các trường bị làm phẳng thành danh sách riêng nên quan hệ trong cùng một phần tử bị mất. Tìm sản phẩm có màu đỏ và cỡ lớn sẽ khớp cả sản phẩm có biến thể đỏ cỡ nhỏ và biến thể xanh cỡ lớn.

### Giải thích các phương án:
- **Không thể gộp nhóm trên các trường bên trong** (Sai): Gộp nhóm vẫn chạy, chỉ là ngữ nghĩa có thể sai.
- **Mảng bị chuyển thành chuỗi ký tự khi lưu** (Sai): Không có bước chuyển thành chuỗi nào.
- **Chỉ phần tử đầu tiên của mảng được đánh chỉ mục** (Sai): Mọi phần tử đều được đánh chỉ mục, chỉ là quan hệ bị mất.
- **Quan hệ giữa các trường trong cùng phần tử bị mất** (Đúng): Các giá trị bị làm phẳng thành danh sách riêng nên điều kiện kết hợp khớp chéo giữa các phần tử.
