---
id: quiz-cs-fundamentals-vi-sao-mat-khau-phai-duoc-bam-hash-chu-khong-phai-ma-hoa-encrypt-khi-luu-vao-co
position: backend
technology: cs-fundamentals
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao mật khẩu phải được băm (hash) chứ không phải mã hoá (encrypt) khi lưu vào cơ sở dữ liệu?

## Đáp án trắc nghiệm
- [x] Vì mã hoá đảo ngược được, lấy được khoá là khôi phục hết mật khẩu
- [ ] Vì băm nhanh hơn mã hoá nên quá trình đăng nhập phản hồi nhanh hơn
- [ ] Vì băm cho kết quả độ dài cố định nên tiết kiệm dung lượng lưu trữ
- [ ] Vì luật bảo vệ dữ liệu cấm mã hoá thông tin cá nhân

## Giải thích (VI)
Vì mã hoá có thể đảo ngược. Ai lấy được khoá — kẻ tấn công hay nhân viên nội bộ — sẽ khôi phục toàn bộ mật khẩu ở dạng rõ. Băm là một chiều: hệ thống chỉ cần băm lại mật khẩu người dùng nhập và so sánh, không bao giờ cần biết giá trị gốc. Phải dùng hàm băm chuyên cho mật khẩu (bcrypt, scrypt, Argon2) kèm salt.

### Giải thích các phương án:
- **Vì mã hoá đảo ngược được, lấy được khoá là khôi phục hết mật khẩu** (Đúng): Hệ thống không cần biết mật khẩu gốc, chỉ cần kiểm tra khớp; giữ dạng khôi phục được tạo ra một điểm hỏng duy nhất là khoá giải mã.
- **Vì băm nhanh hơn mã hoá nên quá trình đăng nhập phản hồi nhanh hơn** (Sai): Hàm băm mật khẩu được thiết kế để chậm có chủ đích (bcrypt, Argon2) nhằm hạn chế tốc độ dò; tốc độ không phải lý do chọn.
- **Vì băm cho kết quả độ dài cố định nên tiết kiệm dung lượng lưu trữ** (Sai): Độ dài cố định là đặc điểm kỹ thuật, không phải lý do bảo mật; tiết kiệm vài chục byte không liên quan gì tới quyết định này.
- **Vì luật bảo vệ dữ liệu cấm mã hoá thông tin cá nhân** (Sai): Không có quy định nào cấm mã hoá; ngược lại mã hoá được khuyến khích cho dữ liệu cần đọc lại — mật khẩu chỉ là trường hợp không cần đọc lại.
