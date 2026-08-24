---
id: quiz-ai-engineering-chain-of-thought-prompting-la-gi
position: backend
technology: ai-engineering
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Chain-of-thought prompting là gì?

## Đáp án trắc nghiệm
- [x] Yêu cầu model trình bày các bước suy luận trước khi kết luận
- [ ] Cách lưu lịch sử hội thoại để model nhớ được lâu hơn
- [ ] Nối nhiều lời gọi API lại, đầu ra của lời gọi này là đầu vào của lời gọi kia
- [ ] Kỹ thuật nén prompt bằng cách bỏ bớt từ không cần thiết

## Giải thích (VI)
Chain-of-thought là yêu cầu model viết ra các bước suy luận trước khi kết luận, thay vì trả lời thẳng. Với bài toán nhiều bước, tỉ lệ đúng tăng đáng kể. Cái giá là đầu ra dài hơn nên đắt hơn và chậm hơn — không đáng dùng cho tác vụ đơn giản.

### Giải thích các phương án:
- **Yêu cầu model trình bày các bước suy luận trước khi kết luận** (Đúng): Việc sinh ra các bước trung gian cho model thêm "không gian tính toán" trước khi chốt đáp án — cải thiện rõ với bài toán nhiều bước, đổi lại tốn thêm token và thời gian.
- **Cách lưu lịch sử hội thoại để model nhớ được lâu hơn** (Sai): Không liên quan tới quản lý bộ nhớ hội thoại.
- **Nối nhiều lời gọi API lại, đầu ra của lời gọi này là đầu vào của lời gọi kia** (Sai): Đó là prompt chaining — chain-of-thought diễn ra trong một lần sinh.
- **Kỹ thuật nén prompt bằng cách bỏ bớt từ không cần thiết** (Sai): Ngược lại, chain-of-thought làm đầu ra dài hơn.
