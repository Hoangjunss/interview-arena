---
id: quiz-elasticsearch-kieu-truong-text-khac-kieu-keyword-o-diem-nao
position: backend
technology: elasticsearch
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiểu trường text khác kiểu keyword ở điểm nào?

## Đáp án trắc nghiệm
- [ ] keyword hỗ trợ tiếng Việt còn text thì không
- [x] text được phân tích thành từ, keyword thì không
- [ ] text không tìm kiếm được, chỉ dùng để hiển thị
- [ ] text lưu được chuỗi dài hơn keyword nhiều lần

## Giải thích (VI)
text được phân tích thành từ nên hợp cho tìm toàn văn; keyword giữ nguyên cả chuỗi nên hợp cho lọc chính xác, sắp xếp và gộp nhóm. Đây là phân biệt quan trọng nhất khi thiết kế mapping.

### Giải thích các phương án:
- **keyword hỗ trợ tiếng Việt còn text thì không** (Sai): Cả hai đều lưu được tiếng Việt, khác nhau ở cách xử lý.
- **text được phân tích thành từ, keyword thì không** (Đúng): Vì thế text hợp cho tìm toàn văn, còn keyword hợp cho lọc chính xác, sắp xếp và gộp nhóm.
- **text không tìm kiếm được, chỉ dùng để hiển thị** (Sai): text chính là kiểu dành cho tìm kiếm toàn văn.
- **text lưu được chuỗi dài hơn keyword nhiều lần** (Sai): Giới hạn độ dài không phải điểm khác biệt cốt lõi.
