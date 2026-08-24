---
id: quiz-ml-data-science-dropout-trong-mang-no-ron-co-tac-dung-gi
position: backend
technology: ml-data-science
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Dropout trong mạng nơ-ron có tác dụng gì?

## Đáp án trắc nghiệm
- [ ] Dừng huấn luyện khi điểm kiểm chứng ngừng cải thiện
- [ ] Giảm số lớp của mạng để huấn luyện nhanh hơn
- [ ] Loại bỏ các mẫu dữ liệu bất thường khỏi tập huấn luyện
- [x] Tắt ngẫu nhiên một phần nơ-ron khi huấn luyện

## Giải thích (VI)
Tắt ngẫu nhiên một phần nơ-ron trong mỗi bước huấn luyện, buộc mạng không phụ thuộc vào vài đường dẫn cố định — một dạng điều chuẩn chống quá khớp. Khi suy luận thì bật lại toàn bộ nơ-ron.

### Giải thích các phương án:
- **Dừng huấn luyện khi điểm kiểm chứng ngừng cải thiện** (Sai): Đó là dừng sớm, một kỹ thuật khác.
- **Giảm số lớp của mạng để huấn luyện nhanh hơn** (Sai): Kiến trúc mạng không đổi khi dùng dropout.
- **Loại bỏ các mẫu dữ liệu bất thường khỏi tập huấn luyện** (Sai): Đó là xử lý ngoại lai, không phải dropout.
- **Tắt ngẫu nhiên một phần nơ-ron khi huấn luyện** (Đúng): Buộc mạng không phụ thuộc vào một vài đường dẫn cố định.
