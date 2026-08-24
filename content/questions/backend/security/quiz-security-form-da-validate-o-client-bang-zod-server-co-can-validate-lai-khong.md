---
id: quiz-security-form-da-validate-o-client-bang-zod-server-co-can-validate-lai-khong
position: backend
technology: security
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Form đã validate ở client bằng Zod. Server có cần validate lại không?

## Đáp án trắc nghiệm
- [ ] Không, nếu API chỉ được gọi từ ứng dụng của mình
- [x] Có — validate ở client là để trải nghiệm, không phải để bảo mật
- [ ] Chỉ cần với các trường có liên quan tới thanh toán
- [ ] Không, nếu client và server dùng cùng một schema Zod

## Giải thích (VI)
Có, luôn luôn. Validate ở client chỉ để phản hồi nhanh cho người dùng. Kẻ tấn công gọi thẳng API bằng curl, bỏ qua toàn bộ giao diện. Nguyên tắc: mọi thứ đến từ client đều không tin được.

### Giải thích các phương án:
- **Không, nếu API chỉ được gọi từ ứng dụng của mình** (Sai): Không có cách nào bảo đảm điều đó với API công khai.
- **Có — validate ở client là để trải nghiệm, không phải để bảo mật** (Đúng): Ai cũng gọi API trực tiếp được, bỏ qua toàn bộ giao diện.
- **Chỉ cần với các trường có liên quan tới thanh toán** (Sai): Mọi đầu vào từ client đều phải coi là không tin cậy.
- **Không, nếu client và server dùng cùng một schema Zod** (Sai): Dùng chung schema rất tốt, nhưng phải chạy nó ở cả hai phía.
