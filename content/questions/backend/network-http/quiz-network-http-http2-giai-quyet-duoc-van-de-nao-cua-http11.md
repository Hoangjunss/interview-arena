---
id: quiz-network-http-http2-giai-quyet-duoc-van-de-nao-cua-http11
position: backend
technology: network-http
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
HTTP/2 giải quyết được vấn đề nào của HTTP/1.1?

## Đáp án trắc nghiệm
- [ ] Chặn đầu hàng đợi ở tầng TCP
- [ ] Độ trễ do khoảng cách địa lý giữa hai đầu
- [ ] Nhu cầu mã hóa dữ liệu trên đường truyền
- [x] Chặn đầu hàng đợi ở tầng HTTP

## Giải thích (VI)
Ghép nhiều luồng trên một kết nối : HTTP/1.1 phải chờ xong yêu cầu trước mới gửi yêu cầu sau trên cùng kết nối, nên trình duyệt phải mở nhiều kết nối song song. HTTP/2 gửi nhiều yêu cầu cùng lúc trên một kết nối, cộng thêm nén header.

### Giải thích các phương án:
- **Chặn đầu hàng đợi ở tầng TCP** (Sai): Vẫn còn ở HTTP/2; phải tới HTTP/3 mới xử lý được.
- **Độ trễ do khoảng cách địa lý giữa hai đầu** (Sai): Không giao thức nào rút ngắn được khoảng cách vật lý.
- **Nhu cầu mã hóa dữ liệu trên đường truyền** (Sai): Mã hóa vẫn do TLS đảm nhiệm.
- **Chặn đầu hàng đợi ở tầng HTTP** (Đúng): Nhiều yêu cầu chạy song song trên một kết nối TCP.
