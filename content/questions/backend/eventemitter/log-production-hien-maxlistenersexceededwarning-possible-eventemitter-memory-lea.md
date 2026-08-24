---
id: log-production-hien-maxlistenersexceededwarning-possible-eventemitter-memory-lea
position: backend
technology: eventemitter
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Log production hiện `MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 listeners added` — nghĩa là gì và sửa thế nào?

## Question (EN)
Production logs show `MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 listeners added` — what does it mean and how do you fix it?

## Đáp án chi tiết (VI)
Node cảnh báo khi một `EventEmitter` có **hơn 10 listener** cho cùng một sự kiện (ngưỡng mặc định). Đây là **cảnh báo**, không phải lỗi — nhưng nó thường chỉ đúng vào một rò rỉ thật.\
\
**Nguyên nhân điển hình:** đăng ký listener bên trong đường chạy lặp lại mà không gỡ.\
\
```js\
app.get('/report', (req, res) =\u003e {\
  process.on('SIGTERM', cleanup)   // one more listener on every request\
  // ...\
})\
```\
\
Mỗi request thêm một listener, mảng listener lớn dần, closure giữ luôn `req`/`res` → bộ nhớ tăng theo thời gian.\
\
**Cách sửa, theo thứ tự:**\
1. **Chuyển việc đăng ký ra ngoài** đường chạy lặp lại (đăng ký một lần lúc khởi động).\
2. Dùng `once()` nếu chỉ cần nghe một lần, hoặc gỡ bằng `off()` / `removeListener()` trong nhánh kết thúc.\
3. Với listener theo vòng đời request, dùng `AbortSignal` (`{ signal }` trong `addListener`) để gỡ hàng loạt.\
4. Chỉ khi số listener **thực sự hợp lệ** mới nâng ngưỡng bằng `emitter.setMaxListeners(n)`. Nâng ngưỡng để làm im cảnh báo mà không hiểu nguyên nhân là cách giấu rò rỉ.

## Detailed Answer (EN)
$7a
