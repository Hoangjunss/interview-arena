---
id: quiz-system-design-health-check-endpoint-nen-kiem-tra-nhng-gi
position: system-design
technology: system-design
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Health check endpoint nên kiểm tra những gì?

## Đáp án trắc nghiệm
- [ ] Kiểm tra toàn bộ phụ thuộc trong một endpoint duy nhất
- [x] Tách hai loại: liveness kiểm tiến trình, readiness kiểm phụ thuộc
- [ ] Chạy một truy vấn nghiệp vụ thật để chắc chắn mọi thứ vẫn đúng
- [ ] Chỉ trả về 200 để chứng tỏ tiến trình còn sống

## Giải thích (VI)
Tách hai loại. Liveness : tiến trình còn chạy và không treo → fail thì restart. Readiness : đã kết nối được DB, cache, đã nạp cấu hình → fail thì rút khỏi load balancer nhưng không restart.

### Giải thích các phương án:
- **Kiểm tra toàn bộ phụ thuộc trong một endpoint duy nhất** (Sai): DB chậm sẽ làm mọi pod bị restart dù bản thân chúng vẫn khoẻ.
- **Tách hai loại: liveness kiểm tiến trình, readiness kiểm phụ thuộc** (Đúng): Liveness fail thì restart, readiness fail thì rút khỏi load balancer — hai hành động khác nhau.
- **Chạy một truy vấn nghiệp vụ thật để chắc chắn mọi thứ vẫn đúng** (Sai): Quá đắt cho một endpoint bị gọi vài giây một lần.
- **Chỉ trả về 200 để chứng tỏ tiến trình còn sống** (Sai): Đủ cho liveness nhưng không biết instance đã sẵn sàng nhận traffic chưa.
