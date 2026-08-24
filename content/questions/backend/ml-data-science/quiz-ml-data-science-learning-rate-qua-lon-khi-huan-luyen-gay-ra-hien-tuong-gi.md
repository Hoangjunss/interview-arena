---
id: quiz-ml-data-science-learning-rate-qua-lon-khi-huan-luyen-gay-ra-hien-tuong-gi
position: backend
technology: ml-data-science
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Learning rate quá lớn khi huấn luyện gây ra hiện tượng gì?

## Đáp án trắc nghiệm
- [ ] Dữ liệu huấn luyện bị mất thứ tự
- [x] Hàm mất mát dao động mạnh hoặc phân kỳ
- [ ] Mô hình hội tụ chậm hơn bình thường
- [ ] Mô hình chắc chắn bị quá khớp

## Giải thích (VI)
Hàm mất mát dao động mạnh hoặc tăng vọt vì mỗi bước cập nhật nhảy quá xa, liên tục vượt qua điểm tối ưu. Ngược lại, learning rate quá nhỏ thì hội tụ rất chậm và dễ mắc kẹt ở vùng phẳng.

### Giải thích các phương án:
- **Dữ liệu huấn luyện bị mất thứ tự** (Sai): Không liên quan tới thứ tự dữ liệu.
- **Hàm mất mát dao động mạnh hoặc phân kỳ** (Đúng): Bước cập nhật quá dài nên vượt qua điểm tối ưu liên tục.
- **Mô hình hội tụ chậm hơn bình thường** (Sai): Đó là triệu chứng của learning rate quá nhỏ.
- **Mô hình chắc chắn bị quá khớp** (Sai): Quá khớp liên quan tới độ phức tạp và dữ liệu, không phải bước học.
