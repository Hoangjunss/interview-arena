---
id: quiz-testing-unit-test-va-integration-test-khac-nhau-o-diem-cot-loi-nao
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Unit test và integration test khác nhau ở điểm cốt lõi nào?

## Đáp án trắc nghiệm
- [x] Phạm vi: unit test một đơn vị, integration test nhiều phần
- [ ] Unit test do dev viết còn integration test thì do QA viết ra
- [ ] Unit test chạy tự động còn integration test chạy bằng tay
- [ ] Unit test kiểm logic còn integration test chỉ kiểm giao diện

## Giải thích (VI)
Phạm vi. Unit kiểm một đơn vị logic tách biệt, chạy rất nhanh. Integration kiểm nhiều phần ghép lại (service + DB thật, API + handler), chậm hơn nhưng bắt được lỗi ở chỗ các phần nối với nhau.

### Giải thích các phương án:
- **Phạm vi: unit test một đơn vị, integration test nhiều phần** (Đúng): Integration test chạy chậm hơn nhưng bắt được lỗi ở chỗ các phần nối với nhau.
- **Unit test do dev viết còn integration test thì do QA viết ra** (Sai): Ai viết là chuyện tổ chức, không phải định nghĩa của loại test.
- **Unit test chạy tự động còn integration test chạy bằng tay** (Sai): Cả hai đều chạy tự động trong CI.
- **Unit test kiểm logic còn integration test chỉ kiểm giao diện** (Sai): Integration test không giới hạn ở giao diện.
