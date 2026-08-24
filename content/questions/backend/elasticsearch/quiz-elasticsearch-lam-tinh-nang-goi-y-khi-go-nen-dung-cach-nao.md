---
id: quiz-elasticsearch-lam-tinh-nang-goi-y-khi-go-nen-dung-cach-nao
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm tính năng gợi ý khi gõ nên dùng cách nào?

## Đáp án trắc nghiệm
- [ ] Dùng truy vấn khớp gần đúng với khoảng cách chỉnh sửa
- [x] Đánh chỉ mục theo tiền tố bằng bộ lọc ngram biên
- [ ] Tải toàn bộ danh sách về client rồi lọc tại chỗ
- [ ] Dùng truy vấn ký tự đại diện với dấu sao ở cuối

## Giải thích (VI)
Dùng bộ lọc ngram biên lúc ghi: mỗi từ được tách sẵn thành các tiền tố. Truy vấn lúc gõ chỉ là khớp từ thường nên rất nhanh, đổi lại chỉ mục lớn hơn và phải nạp lại dữ liệu khi đổi cấu hình.

### Giải thích các phương án:
- **Dùng truy vấn khớp gần đúng với khoảng cách chỉnh sửa** (Sai): Cách này dành cho gõ sai chính tả chứ không phải khớp tiền tố.
- **Đánh chỉ mục theo tiền tố bằng bộ lọc ngram biên** (Đúng): Công việc tách tiền tố dồn vào lúc ghi nên truy vấn lúc gõ rất nhẹ và nhanh.
- **Tải toàn bộ danh sách về client rồi lọc tại chỗ** (Sai): Chỉ hợp khi danh sách rất nhỏ và cố định.
- **Dùng truy vấn ký tự đại diện với dấu sao ở cuối** (Sai): Truy vấn dạng này rất tốn kém và không mở rộng được khi dữ liệu lớn.
