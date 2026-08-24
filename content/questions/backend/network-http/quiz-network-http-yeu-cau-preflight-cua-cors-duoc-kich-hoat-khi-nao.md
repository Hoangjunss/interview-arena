---
id: quiz-network-http-yeu-cau-preflight-cua-cors-duoc-kich-hoat-khi-nao
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Yêu cầu preflight của CORS được kích hoạt khi nào?

## Đáp án trắc nghiệm
- [x] Khi yêu cầu vượt khỏi nhóm đơn giản
- [ ] Chỉ khi yêu cầu có kèm cookie xác thực
- [ ] Với mọi yêu cầu đi tới tên miền khác
- [ ] Chỉ khi máy chủ trả về mã lỗi ở lần gọi trước

## Giải thích (VI)
Khi yêu cầu không thuộc nhóm đơn giản : dùng phương thức ngoài GET/HEAD/POST, có header tùy chỉnh (ví dụ Authorization hoặc X-Request-Id), hoặc Content-Type ngoài ba loại được coi là đơn giản. Trình duyệt gửi OPTIONS hỏi trước rồi mới gửi yêu cầu thật.

### Giải thích các phương án:
- **Khi yêu cầu vượt khỏi nhóm đơn giản** (Đúng): Phương thức lạ, header tùy chỉnh, hoặc content-type ngoài danh sách cho phép.
- **Chỉ khi yêu cầu có kèm cookie xác thực** (Sai): Cookie ảnh hưởng tới cấu hình credentials, không phải điều kiện duy nhất.
- **Với mọi yêu cầu đi tới tên miền khác** (Sai): Yêu cầu đơn giản không cần preflight.
- **Chỉ khi máy chủ trả về mã lỗi ở lần gọi trước** (Sai): Preflight diễn ra trước, không phụ thuộc lần gọi trước.
