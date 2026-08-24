---
id: quiz-qa-kiem-thu-confirmation-testing-re-test-khac-regression-testing-o-diem-nao
position: backend
technology: qa-kiem-thu
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Confirmation testing (re-test) khác regression testing ở điểm nào?

## Đáp án trắc nghiệm
- [ ] Confirmation chạy trên staging, regression chạy trên production
- [x] Confirmation kiểm bản vá, regression kiểm phần còn lại
- [ ] Confirmation do tester làm, regression do developer làm
- [ ] Confirmation làm thủ công, regression làm tự động

## Giải thích (VI)
Confirmation testing chạy lại đúng ca đã lỗi để xác nhận bản vá có tác dụng. Regression testing chạy các ca khác để chắc bản vá không làm hỏng phần đang chạy tốt. Sửa xong một bug thì cần cả hai.

### Giải thích các phương án:
- **Confirmation chạy trên staging, regression chạy trên production** (Sai): Cả hai đều chạy trước khi phát hành.
- **Confirmation kiểm bản vá, regression kiểm phần còn lại** (Đúng): Một bên xác nhận bản vá, một bên bảo vệ phần còn lại khỏi tác dụng phụ.
- **Confirmation do tester làm, regression do developer làm** (Sai): Người thực hiện không quyết định loại kiểm thử.
- **Confirmation làm thủ công, regression làm tự động** (Sai): Cách thực hiện không phải tiêu chí phân biệt.
