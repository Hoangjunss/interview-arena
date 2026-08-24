---
id: quiz-frontend-core-jwt-gom-nhng-phan-nao-va-payload-co-duoc-ma-hoa-khong
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
JWT gồm những phần nào và payload có được mã hoá không?

## Đáp án trắc nghiệm
- [ ] Signature dùng để mã hoá payload trước khi gửi lên server
- [x] Ba phần header, payload, signature; payload chỉ base64url nên ai cũng đọc được
- [ ] Payload được mã hoá bằng khoá bí mật nên không ai đọc được nội dung bên trong token
- [ ] Chỉ gồm hai phần: payload và signature nối bằng dấu chấm

## Giải thích (VI)
JWT có ba phần nối bằng dấu chấm: header (thuật toán ký), payload (các claim như sub, exp, role) và signature. Header và payload chỉ được mã hoá base64url — đây là cách biểu diễn, không phải bảo mật, nên bất kỳ ai cầm token đều đọc được nội dung. Signature bảo đảm token không bị sửa. Vì vậy không đặt dữ liệu nhạy cảm vào payload.

### Giải thích các phương án:
- **Signature dùng để mã hoá payload trước khi gửi lên server** (Sai): Signature dùng để xác minh tính toàn vẹn và nguồn gốc, không mã hoá gì.
- **Ba phần header, payload, signature; payload chỉ base64url nên ai cũng đọc được** (Đúng): Đúng: base64url là cách biểu diễn, không phải mã hoá bảo mật — dán token vào công cụ giải base64 là đọc được payload. Signature chỉ đảm bảo nội dung không bị sửa, không giấu nội dung.
- **Payload được mã hoá bằng khoá bí mật nên không ai đọc được nội dung bên trong token** (Sai): JWT ký chứ không mã hoá (trừ khi dùng JWE); nội dung đọc được bằng công cụ giải base64.
- **Chỉ gồm hai phần: payload và signature nối bằng dấu chấm** (Sai): Có ba phần, phần đầu là header chứa thuật toán ký.
