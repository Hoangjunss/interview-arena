---
id: quiz-cpp-vi-sao-container-mang-dong-cua-thu-vien-chuan-thuong-duoc-uu-tien-hon-mang-tho
position: backend
technology: cpp
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao container mảng động của thư viện chuẩn thường được ưu tiên hơn mảng thô?

## Đáp án trắc nghiệm
- [ ] Nó truy cập phần tử nhanh hơn mảng thô
- [x] Nó tự quản lý bộ nhớ và biết kích thước của mình
- [ ] Nó lưu phần tử ở các vùng nhớ rời rạc nên linh hoạt hơn
- [ ] Nó tự kiểm tra chỉ số nằm ngoài phạm vi

## Giải thích (VI)
Nó tự quản lý bộ nhớ, biết kích thước của mình và tự lớn lên khi cần . Mảng thô truyền vào hàm sẽ mất thông tin kích thước, và mảng cấp phát động thì phải tự nhớ giải phóng.

### Giải thích các phương án:
- **Nó truy cập phần tử nhanh hơn mảng thô** (Sai): Truy cập theo chỉ số có chi phí tương đương.
- **Nó tự quản lý bộ nhớ và biết kích thước của mình** (Đúng): Mảng thô truyền vào hàm mất thông tin kích thước và phải tự giải phóng khi cấp phát động.
- **Nó lưu phần tử ở các vùng nhớ rời rạc nên linh hoạt hơn** (Sai): Ngược lại, các phần tử nằm liên tiếp trong bộ nhớ.
- **Nó tự kiểm tra chỉ số nằm ngoài phạm vi** (Sai): Toán tử chỉ số không kiểm tra, chỉ phương thức truy cập an toàn mới kiểm.
