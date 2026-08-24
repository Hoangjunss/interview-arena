---
id: quiz-frontend-core-huy-mot-request-dang-chay-bang-fetch-nhu-the-nao
position: frontend
technology: frontend-core
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Huỷ một request đang chạy bằng fetch như thế nào?

## Đáp án trắc nghiệm
- [ ] Gọi promise.cancel() trên promise mà fetch trả về là huỷ được request đang chạy
- [ ] Không huỷ được — chỉ có thể bỏ qua kết quả khi nó trả về
- [ ] Đặt timeout: 0 trong đối tượng tuỳ chọn thứ hai của fetch
- [x] Truyền signal của một AbortController vào fetch rồi gọi controller.abort()

## Giải thích (VI)
Tạo một AbortController, truyền controller.signal vào fetch, và gọi controller.abort() khi cần huỷ — promise reject với lỗi có name === "AbortError", cần bỏ qua để không hiển thị như lỗi thật. AbortSignal.timeout(ms) cho trường hợp cần hạn thời gian. Cùng cơ chế này dùng được cho addEventListener qua tuỳ chọn signal.

### Giải thích các phương án:
- **Gọi promise.cancel() trên promise mà fetch trả về là huỷ được request đang chạy** (Sai): Promise chuẩn không có phương thức huỷ.
- **Không huỷ được — chỉ có thể bỏ qua kết quả khi nó trả về** (Sai): Bỏ qua kết quả là giải pháp tạm; AbortController huỷ được request thật.
- **Đặt timeout: 0 trong đối tượng tuỳ chọn thứ hai của fetch** (Sai): fetch không có tuỳ chọn timeout; dùng AbortSignal.timeout() nếu cần.
- **Truyền signal của một AbortController vào fetch rồi gọi controller.abort()** (Đúng): Đúng: AbortController là cơ chế chuẩn. Promise sẽ reject với lỗi tên AbortError nên phải phân biệt lỗi này với lỗi thật, tránh hiển thị như sự cố.
