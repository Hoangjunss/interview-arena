---
id: quiz-qa-kiem-thu-load-testing-va-stress-testing-khac-nhau-o-diem-nao
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Load testing và stress testing khác nhau ở điểm nào?

## Đáp án trắc nghiệm
- [x] Load chạy ở tải dự kiến, stress đẩy vượt ngưỡng
- [ ] Load đo thời gian phản hồi, stress đo mức tiêu thụ bộ nhớ
- [ ] Load chạy trên production, stress chạy trên staging
- [ ] Load kiểm số người dùng, stress kiểm khối lượng dữ liệu

## Giải thích (VI)
Load test chạy ở mức tải dự kiến để xác nhận hệ thống đáp ứng chỉ tiêu. Stress test đẩy vượt ngưỡng để tìm điểm gãy và xem hệ thống gãy như thế nào — gãy êm hay đổ sập kéo theo cả hệ thống khác.

### Giải thích các phương án:
- **Load chạy ở tải dự kiến, stress đẩy vượt ngưỡng** (Đúng): Một bên xác nhận hệ thống đáp ứng tải thật, một bên tìm điểm gãy và cách gãy.
- **Load đo thời gian phản hồi, stress đo mức tiêu thụ bộ nhớ** (Sai): Cả hai đều đo nhiều chỉ số, không phân biệt theo chỉ số đo.
- **Load chạy trên production, stress chạy trên staging** (Sai): Môi trường không phải tiêu chí phân biệt.
- **Load kiểm số người dùng, stress kiểm khối lượng dữ liệu** (Sai): Cả hai đều có thể tăng theo người dùng hoặc dữ liệu.
