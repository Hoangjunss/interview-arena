---
id: tai-sao-try-catch-khong-bat-duoc-loi-nem-ben-trong-callback-cua-settimeout
position: backend
technology: error-handling
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao `try/catch` không bắt được lỗi ném bên trong callback của `setTimeout`?

## Question (EN)
Why does `try/catch` fail to catch an error thrown inside a `setTimeout` callback?

## Đáp án chi tiết (VI)
Vì lúc callback chạy, khối `try` đã kết thúc từ lâu. `try/catch` chỉ bảo vệ những gì thực thi **trên cùng call stack đồng bộ** với nó.\
\
```js\
try {\
  setTimeout(() =\u003e {\
    throw new Error('boom')   // không ai bắt\
  }, 0)\
} catch (err) {\
  console.log('không bao giờ chạy')\
}\
```\
\
`setTimeout` chỉ **đăng ký** callback rồi trả về ngay; `try` thoát, stack rỗng. Sau đó event loop lấy callback ra chạy trên một stack **mới tinh** — không còn khung `catch` nào phía dưới, lỗi bay lên global (`window.onerror` / `uncaughtException`).\
\
Cách xử lý:\
\
```js\
setTimeout(() =\u003e {\
  try {\
    risky()\
  } catch (err) {\
    report(err)\
  }\
}, 0)\
```\
\
Cùng lý do đó, callback kiểu Node (`fs.readFile(path, (err, data) =\u003e ...)`) truyền lỗi qua tham số `err` thay vì ném. Ngược lại, `await` **bắt được** vì nó nối lại phần code sau `await` vào cùng ngữ cảnh hàm async, nên `try/catch` bao quanh `await` vẫn hiệu lực.

## Detailed Answer (EN)
Because by the time the callback runs, the `try` block is long gone. `try/catch` only guards what executes on **its own synchronous call stack**.\
\
```js\
try {\
  setTimeout(() =\u003e {\
    throw new Error('boom')   // nothing catches this\
  }, 0)\
} catch (err) {\
  console.log('never runs')\
}\
```\
\
`setTimeout` merely **registers** the callback and returns; `try` exits and the stack unwinds. Later the event loop runs the callback on a **fresh** stack with no `catch` frame beneath it, so the error escapes to the global handler (`window.onerror` / `uncaughtException`).\
\
The fix:\
\
```js\
setTimeout(() =\u003e {\
  try {\
    risky()\
  } catch (err) {\
    report(err)\
  }\
}, 0)\
```\
\
For the same reason Node-style callbacks (`fs.readFile(path, (err, data) =\u003e ...)`) pass errors as an `err` argument instead of throwing. `await`, by contrast, **does** work with `try/catch`: it resumes the code after `await` inside the same async function context, so the surrounding `try/catch` still applies.
