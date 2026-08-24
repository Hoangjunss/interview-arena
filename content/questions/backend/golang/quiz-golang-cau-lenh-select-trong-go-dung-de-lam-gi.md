---
id: quiz-golang-cau-lenh-select-trong-go-dung-de-lam-gi
position: backend
technology: golang
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Câu lệnh select trong Go dùng để làm gì?

## Đáp án trắc nghiệm
- [ ] Lặp tuần tự qua các channel theo đúng thứ tự case được viết
- [x] Chờ đồng thời nhiều thao tác channel và thực thi case nào sẵn sàng trước
- [ ] Đóng tất cả channel được liệt kê trong các case
- [ ] Chọn nhánh dựa trên giá trị của một biểu thức, giống switch thông thường

## Giải thích (VI)
select cho một goroutine chờ đồng thời nhiều thao tác channel và chạy case đầu tiên sẵn sàng. Nếu nhiều case cùng sẵn sàng, Go chọn ngẫu nhiên để tránh starvation. Có default thì select không chặn (non-blocking). Đây là công cụ cốt lõi cho timeout, hủy (cancel) và fan-in/fan-out.

### Giải thích các phương án:
- **Lặp tuần tự qua các channel theo đúng thứ tự case được viết** (Sai): select không duyệt theo thứ tự; khi nhiều case sẵn sàng, lựa chọn là ngẫu nhiên đồng đều, không ưu tiên case viết trước.
- **Chờ đồng thời nhiều thao tác channel và thực thi case nào sẵn sàng trước** (Đúng): Nếu nhiều case cùng sẵn sàng thì chọn ngẫu nhiên. select chặn tới khi ít nhất một case (gửi hoặc nhận trên channel) có thể tiến hành; nếu nhiều case sẵn sàng, Go chọn ngẫu nhiên một trong số đó để tránh đói (starvation).
- **Đóng tất cả channel được liệt kê trong các case** (Sai): select không đóng channel; muốn đóng phải gọi close() tường minh. select chỉ điều phối thao tác gửi/nhận.
- **Chọn nhánh dựa trên giá trị của một biểu thức, giống switch thông thường** (Sai): Đó là switch. select không so khớp giá trị biểu thức mà chờ mức sẵn sàng của các thao tác channel.
