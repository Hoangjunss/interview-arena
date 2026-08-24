---
id: quiz-frontend-core-cors-va-preflight-request-hoat-dong-the-nao
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CORS và preflight request hoạt động thế nào?

## Đáp án trắc nghiệm
- [ ] Lỗi CORS nghĩa là request chưa bao giờ tới được server
- [x] Server đặt Access-Control-Allow-Origin; request phức tạp thì OPTIONS hỏi trước
- [ ] Preflight chỉ xảy ra khi request có file đính kèm dạng multipart
- [ ] CORS được cấu hình ở phía frontend, chỉ cần thêm header vào request là hết lỗi ngay

## Giải thích (VI)
CORS là cách server nới lỏng Same-Origin Policy bằng header phản hồi: Access-Control-Allow-Origin, -Methods, -Headers, và -Credentials khi cần gửi cookie. Với request "không đơn giản" (method PUT/DELETE/PATCH, header tuỳ chỉnh như Authorization, hoặc Content-Type: application/json), trình duyệt gửi trước một OPTIONS để hỏi phép. Lỗi CORS phải sửa ở server, không sửa được từ client.

### Giải thích các phương án:
- **Lỗi CORS nghĩa là request chưa bao giờ tới được server** (Sai): Server thường đã nhận và xử lý; trình duyệt chặn ở bước cho script đọc phản hồi.
- **Server đặt Access-Control-Allow-Origin; request phức tạp thì OPTIONS hỏi trước** (Đúng): Đúng: quyền nằm ở header phản hồi của server, preflight là bước hỏi phép trước khi gửi request thật. Request "đơn giản" (GET/POST/HEAD, content-type thông thường, không header lạ) thì bỏ qua preflight.
- **Preflight chỉ xảy ra khi request có file đính kèm dạng multipart** (Sai): Preflight kích hoạt bởi method ngoài GET/POST/HEAD, header tuỳ chỉnh, hoặc content-type ngoài danh sách đơn giản.
- **CORS được cấu hình ở phía frontend, chỉ cần thêm header vào request là hết lỗi ngay** (Sai): Client không thể tự cấp quyền cho mình — quyết định nằm ở header phản hồi của server.
