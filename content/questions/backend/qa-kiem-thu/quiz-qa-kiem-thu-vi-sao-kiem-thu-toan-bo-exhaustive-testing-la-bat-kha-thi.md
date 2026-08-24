---
id: quiz-qa-kiem-thu-vi-sao-kiem-thu-toan-bo-exhaustive-testing-la-bat-kha-thi
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao kiểm thử toàn bộ (exhaustive testing) là bất khả thi?

## Đáp án trắc nghiệm
- [ ] Vì công cụ kiểm thử hiện nay chưa đủ mạnh
- [ ] Vì tester không bao giờ đủ thời gian trong dự án
- [ ] Vì yêu cầu luôn thay đổi trong quá trình phát triển
- [x] Số tổ hợp đầu vào và trạng thái quá lớn để chạy hết

## Giải thích (VI)
Vì không gian đầu vào và trạng thái bùng nổ tổ hợp . Chỉ một ô nhập số nguyên đã có hàng tỉ giá trị, chưa kể thứ tự thao tác và trạng thái hệ thống. Nên kiểm thử luôn là bài toán chọn mẫu theo rủi ro .

### Giải thích các phương án:
- **Vì công cụ kiểm thử hiện nay chưa đủ mạnh** (Sai): Đây là giới hạn toán học, không phải giới hạn công cụ.
- **Vì tester không bao giờ đủ thời gian trong dự án** (Sai): Thời gian là ràng buộc thực tế nhưng không phải lý do gốc.
- **Vì yêu cầu luôn thay đổi trong quá trình phát triển** (Sai): Yêu cầu ổn định thì không gian tổ hợp vẫn quá lớn.
- **Số tổ hợp đầu vào và trạng thái quá lớn để chạy hết** (Đúng): Không gian tổ hợp bùng nổ nên chỉ có thể chọn mẫu theo rủi ro.
