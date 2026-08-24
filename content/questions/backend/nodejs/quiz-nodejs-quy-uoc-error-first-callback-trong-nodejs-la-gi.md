---
id: quiz-nodejs-quy-uoc-error-first-callback-trong-nodejs-la-gi
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Quy ước "error-first callback" trong Node.js là gì?

## Đáp án trắc nghiệm
- [ ] Mỗi API nhận hai callback riêng: một cho thành công, một cho thất bại
- [ ] Lỗi trong callback bất đồng bộ được throw ra và bắt bằng try/catch bao quanh lời gọi hàm
- [x] Callback nhận error làm tham số ĐẦU TIÊN ((err, data) => {})
- [ ] Error được đặt làm tham số cuối cùng của callback để dễ bỏ qua khi không cần

## Giải thích (VI)
Các API bất đồng bộ callback-style của Node truyền lỗi qua tham số ĐẦU của callback: fs.readFile(path, (err, data) => {...}). Thành công → err là null; thất bại → err là object Error và data không đáng tin. Quy ước này tồn tại vì try/catch quanh lời gọi không bắt được lỗi xảy ra trong callback chạy ở tick sau.

### Giải thích các phương án:
- **Mỗi API nhận hai callback riêng: một cho thành công, một cho thất bại** (Sai): Đó là style success/failure callback của một số thư viện cũ, không phải quy ước Node. API callback của Node dùng một callback duy nhất với err ở vị trí đầu.
- **Lỗi trong callback bất đồng bộ được throw ra và bắt bằng try/catch bao quanh lời gọi hàm** (Sai): Hiểu nhầm kinh điển: try/catch quanh lời gọi không bắt được lỗi xảy ra sau đó trong callback, vì callback chạy ở tick khác khi try block đã thoát. Vì vậy lỗi mới được truyền qua tham số err.
- **Callback nhận error làm tham số ĐẦU TIÊN ((err, data) => {})** (Đúng): Thành công thì err là null, thất bại thì err chứa lỗi và phải kiểm tra trước khi dùng data. Đây là quy ước chuẩn của các API bất đồng bộ callback-style trong Node (fs, http...): vị trí đầu dành cho error buộc caller đối mặt với lỗi trước khi chạm vào kết quả.
- **Error được đặt làm tham số cuối cùng của callback để dễ bỏ qua khi không cần** (Sai): Ngược quy ước: error đứng đầu, chính là để KHÔNG thể bỏ qua — caller phải bước qua tham số err trước khi lấy data.
