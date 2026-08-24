---
id: quiz-frontend-core-luong-tu-dong-refresh-token-khi-api-tra-401-nen-duoc-trien-khai-the-nao
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Luồng tự động refresh token khi API trả 401 nên được triển khai thế nào?

## Đáp án trắc nghiệm
- [x] Bắt 401 ở interceptor chung, refresh một lần rồi phát lại các request đang chờ
- [ ] Định kỳ gọi refresh mỗi 30 giây bất kể có 401 hay không
- [ ] Chuyển thẳng về trang đăng nhập ngay khi gặp 401 đầu tiên
- [ ] Mỗi request tự bắt 401 và tự gọi refresh riêng, đơn giản và dễ hiểu hơn hẳn cách gom chung

## Giải thích (VI)
Đặt xử lý ở một lớp chung: khi gặp 401, kiểm tra cờ "đang refresh" — nếu chưa thì gọi refresh một lần, các request 401 khác xếp vào hàng đợi; refresh xong thì phát lại toàn bộ hàng đợi với token mới. Nếu refresh thất bại thì xoá phiên và chuyển về đăng nhập. Cần chặn vòng lặp vô hạn: không refresh cho chính request refresh, và chỉ thử lại mỗi request một lần.

### Giải thích các phương án:
- **Bắt 401 ở interceptor chung, refresh một lần rồi phát lại các request đang chờ** (Đúng): Đúng: cần một hàng đợi và cờ để nhiều request 401 cùng lúc không tạo nhiều lần refresh. Nếu refresh cũng thất bại thì xoá phiên và chuyển về trang đăng nhập.
- **Định kỳ gọi refresh mỗi 30 giây bất kể có 401 hay không** (Sai): Lãng phí và không giải quyết được trường hợp token hết hạn giữa hai lần gọi.
- **Chuyển thẳng về trang đăng nhập ngay khi gặp 401 đầu tiên** (Sai): Người dùng bị đăng xuất mỗi lần access token hết hạn — đúng là mục đích của refresh token bị bỏ qua.
- **Mỗi request tự bắt 401 và tự gọi refresh riêng, đơn giản và dễ hiểu hơn hẳn cách gom chung** (Sai): Nhiều request song song sẽ gọi refresh nhiều lần, dễ khiến refresh token bị xoay vòng và mất phiên.
