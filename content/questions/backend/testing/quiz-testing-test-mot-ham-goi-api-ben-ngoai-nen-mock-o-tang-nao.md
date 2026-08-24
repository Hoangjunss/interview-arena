---
id: quiz-testing-test-mot-ham-goi-api-ben-ngoai-nen-mock-o-tang-nao
position: backend
technology: testing
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Test một hàm gọi API bên ngoài. Nên mock ở tầng nào?

## Đáp án trắc nghiệm
- [ ] Mock chính hàm gọi API đó để test không phụ thuộc gì bên ngoài
- [ ] Mock cả module chứa hàm đó để cô lập hoàn toàn
- [x] Ở tầng network, để code thật vẫn chạy qua HTTP
- [ ] Không mock, gọi thẳng API thật trong môi trường test

## Giải thích (VI)
Mock ở tầng network (msw, nock, hoặc chặn fetch), không mock hàm của chính mình. Khi đó phần dựng URL, header, xử lý lỗi và parse response vẫn được chạy thật — đó chính là phần hay sai.

### Giải thích các phương án:
- **Mock chính hàm gọi API đó để test không phụ thuộc gì bên ngoài** (Sai): Test khi đó chỉ kiểm tra mock được gọi, không kiểm tra code thật.
- **Mock cả module chứa hàm đó để cô lập hoàn toàn** (Sai): Cô lập quá mức khiến test không còn kiểm tra hành vi thật nữa.
- **Ở tầng network, để code thật vẫn chạy qua HTTP** (Đúng): Mock hàm gọi API của mình sẽ bỏ qua luôn phần dễ sai nhất là dựng request.
- **Không mock, gọi thẳng API thật trong môi trường test** (Sai): Test sẽ chậm, không ổn định, và phụ thuộc vào bên ngoài.
