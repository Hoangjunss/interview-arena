---
id: quiz-angular-signal-computed-va-effect-phan-vai-nhu-the-nao
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
signal, computed và effect phân vai như thế nào?

## Đáp án trắc nghiệm
- [ ] effect là nơi nên tính giá trị dẫn xuất rồi set ngược vào signal khác
- [ ] computed chạy lại mỗi lần change detection chạy, bất kể phụ thuộc có đổi hay không
- [x] signal giữ state ghi được; computed dẫn xuất có cache; effect tác dụng phụ
- [ ] Cả ba đều ghi được, chỉ khác nhau ở cú pháp khai báo

## Giải thích (VI)
signal(v) giữ state ghi được, đổi bằng set/update. computed(fn) khai báo giá trị dẫn xuất: chỉ tính khi có người đọc, cache kết quả và tính lại khi phụ thuộc đổi. effect(fn) dành cho tác dụng phụ — ghi log, đồng bộ localStorage, gọi API bên ngoài hệ thống signal. Giá trị dẫn xuất luôn nên là computed, không phải effect ghi ngược vào signal khác.

### Giải thích các phương án:
- **effect là nơi nên tính giá trị dẫn xuất rồi set ngược vào signal khác** (Sai): Đó là phản mẫu: dẫn xuất thuộc về computed; dùng effect để ghi ngược dễ tạo vòng lặp và khó lần lỗi.
- **computed chạy lại mỗi lần change detection chạy, bất kể phụ thuộc có đổi hay không** (Sai): computed chỉ tính lại khi phụ thuộc đổi và khi có người đọc; kết quả được cache.
- **signal giữ state ghi được; computed dẫn xuất có cache; effect tác dụng phụ** (Đúng): Đúng: state — dẫn xuất — tác dụng phụ là ba vai rõ ràng. computed tính lười và có cache; effect chạy khi phụ thuộc đổi và không trả về giá trị.
- **Cả ba đều ghi được, chỉ khác nhau ở cú pháp khai báo** (Sai): computed là chỉ đọc; muốn đổi giá trị phải đổi signal nguồn.
