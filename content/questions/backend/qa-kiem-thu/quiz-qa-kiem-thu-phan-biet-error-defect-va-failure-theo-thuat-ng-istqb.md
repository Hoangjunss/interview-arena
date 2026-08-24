---
id: quiz-qa-kiem-thu-phan-biet-error-defect-va-failure-theo-thuat-ng-istqb
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt error, defect và failure theo thuật ngữ ISTQB?

## Đáp án trắc nghiệm
- [ ] Error do developer gây ra, defect do tester phát hiện, failure do người dùng báo
- [ ] Ba từ này đồng nghĩa, chỉ khác ngữ cảnh sử dụng
- [ ] Error là lỗi nhẹ, defect là lỗi nặng, failure là sự cố production
- [x] Con người mắc error, sinh ra defect trong sản phẩm, gây failure khi chạy

## Giải thích (VI)
Chuỗi nhân quả: con người mắc error (nhầm lẫn) → để lại defect (lỗi trong code hoặc tài liệu) → khi thực thi có thể gây failure (hệ thống hành xử sai). Một defect có thể chưa bao giờ gây failure nếu đoạn code đó không bao giờ chạy.

### Giải thích các phương án:
- **Error do developer gây ra, defect do tester phát hiện, failure do người dùng báo** (Sai): Phân biệt theo người phát hiện là cách hiểu sai.
- **Ba từ này đồng nghĩa, chỉ khác ngữ cảnh sử dụng** (Sai): Chúng chỉ ba giai đoạn khác nhau trong cùng một chuỗi nhân quả.
- **Error là lỗi nhẹ, defect là lỗi nặng, failure là sự cố production** (Sai): Ba khái niệm này không phân biệt theo mức độ nghiêm trọng.
- **Con người mắc error, sinh ra defect trong sản phẩm, gây failure khi chạy** (Đúng): Đây là chuỗi nhân quả chuẩn: mistake → defect/fault → failure.
