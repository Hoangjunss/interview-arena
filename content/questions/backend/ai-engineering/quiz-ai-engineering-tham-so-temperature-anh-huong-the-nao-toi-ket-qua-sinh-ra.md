---
id: quiz-ai-engineering-tham-so-temperature-anh-huong-the-nao-toi-ket-qua-sinh-ra
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tham số temperature ảnh hưởng thế nào tới kết quả sinh ra?

## Đáp án trắc nghiệm
- [ ] Nó quyết định model suy nghĩ bao lâu trước khi trả lời
- [ ] Nó bật/tắt việc model được phép tra cứu thông tin bên ngoài
- [ ] Nó giới hạn độ dài câu trả lời
- [x] Điều chỉnh mức ngẫu nhiên khi chọn token tiếp theo

## Giải thích (VI)
Temperature điều chỉnh độ ngẫu nhiên khi chọn token kế tiếp. Gần 0 thì model gần như luôn chọn token khả dĩ nhất — hợp cho trích xuất dữ liệu, phân loại, sinh JSON. Cao hơn thì đa dạng hơn — hợp cho viết sáng tạo, brainstorm.

### Giải thích các phương án:
- **Nó quyết định model suy nghĩ bao lâu trước khi trả lời** (Sai): Không có tham số thời gian suy nghĩ; temperature chỉ tác động tới việc lấy mẫu.
- **Nó bật/tắt việc model được phép tra cứu thông tin bên ngoài** (Sai): Việc tra cứu do tool use quyết định, không phải temperature.
- **Nó giới hạn độ dài câu trả lời** (Sai): Độ dài do max_tokens quyết định.
- **Điều chỉnh mức ngẫu nhiên khi chọn token tiếp theo** (Đúng): Temperature làm phẳng hoặc nhọn phân phối xác suất trước khi lấy mẫu: giá trị thấp cho kết quả tập trung và lặp lại được, giá trị cao cho kết quả đa dạng hơn nhưng kém ổn định.
