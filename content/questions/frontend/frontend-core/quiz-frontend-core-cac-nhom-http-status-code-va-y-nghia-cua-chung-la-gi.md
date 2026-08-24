---
id: quiz-frontend-core-cac-nhom-http-status-code-va-y-nghia-cua-chung-la-gi
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các nhóm HTTP status code và ý nghĩa của chúng là gì?

## Đáp án trắc nghiệm
- [x] 2xx thành công, 3xx chuyển hướng, 4xx lỗi phía client, 5xx lỗi phía server
- [ ] 3xx nghĩa là request thất bại và không được thử lại
- [ ] 4xx là lỗi phía server, 5xx là lỗi do client gửi request sai
- [ ] Mọi lỗi đều trả về 200 kèm cờ trong body nên frontend chỉ cần đọc body là đủ

## Giải thích (VI)
2xx là thành công (200 OK, 201 Created, 204 No Content). 3xx là chuyển hướng (301 vĩnh viễn, 302 tạm thời, 304 dùng lại bản cache). 4xx là lỗi từ phía client: 400 dữ liệu sai, 401 chưa xác thực, 403 đã xác thực nhưng không đủ quyền, 404 không tồn tại, 409 xung đột, 429 quá nhiều request. 5xx là lỗi phía server (500, 502, 503, 504).

### Giải thích các phương án:
- **2xx thành công, 3xx chuyển hướng, 4xx lỗi phía client, 5xx lỗi phía server** (Đúng): Đúng: bốn nhóm quyết định cách frontend xử lý phản hồi. 4xx là request sai (sai dữ liệu, chưa xác thực, không đủ quyền) nên sửa request mới hết; 5xx là phía server hỏng nên thử lại mới có nghĩa.
- **3xx nghĩa là request thất bại và không được thử lại** (Sai): 3xx là chuyển hướng — client thường đi tiếp tới địa chỉ mới.
- **4xx là lỗi phía server, 5xx là lỗi do client gửi request sai** (Sai): Ngược lại: 4xx thuộc về phía gửi request, 5xx thuộc về phía xử lý.
- **Mọi lỗi đều trả về 200 kèm cờ trong body nên frontend chỉ cần đọc body là đủ** (Sai): Một số API làm vậy nhưng đó là thiết kế lệch chuẩn; status code là phần hợp đồng của HTTP.
