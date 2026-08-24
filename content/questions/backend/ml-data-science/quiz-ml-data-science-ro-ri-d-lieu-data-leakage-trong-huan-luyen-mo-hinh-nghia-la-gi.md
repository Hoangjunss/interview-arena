---
id: quiz-ml-data-science-ro-ri-d-lieu-data-leakage-trong-huan-luyen-mo-hinh-nghia-la-gi
position: backend
technology: ml-data-science
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rò rỉ dữ liệu (data leakage) trong huấn luyện mô hình nghĩa là gì?

## Đáp án trắc nghiệm
- [ ] Dữ liệu người dùng bị lộ ra ngoài do lỗi bảo mật
- [x] Mô hình thấy thông tin không có lúc dự đoán thật
- [ ] Dữ liệu huấn luyện có quá nhiều giá trị rỗng
- [ ] Một phần dữ liệu bị mất trong quá trình xử lý

## Giải thích (VI)
Mô hình được tiếp cận thông tin mà lúc dự đoán thật nó không thể có . Kết quả là điểm đánh giá đẹp giả tạo, rồi mô hình sụp đổ khi triển khai — một trong những lỗi tốn kém nhất trong dự án dữ liệu.

### Giải thích các phương án:
- **Dữ liệu người dùng bị lộ ra ngoài do lỗi bảo mật** (Sai): Đó là sự cố bảo mật, khác với khái niệm này.
- **Mô hình thấy thông tin không có lúc dự đoán thật** (Đúng): Điểm đánh giá cao giả tạo rồi sụp đổ khi lên thực tế.
- **Dữ liệu huấn luyện có quá nhiều giá trị rỗng** (Sai): Giá trị thiếu là vấn đề chất lượng dữ liệu.
- **Một phần dữ liệu bị mất trong quá trình xử lý** (Sai): Mất dữ liệu là vấn đề khác.
