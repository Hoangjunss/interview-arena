---
id: xu-ly-loi-trong-async-await-nhu-the-nao
position: backend
technology: promise-\u0026-async
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Xử lý lỗi trong async/await như thế nào?

## Question (EN)
How do you handle errors in async/await?

## Đáp án chi tiết (VI)
Dùng try/catch bọc await expressions. Lỗi từ rejected Promise được catch như exception.\
```javascript\
async function loadData() {\
  try {\
    const res = await fetch('/api/data');\
    if (!res.ok) throw new Error(`HTTP ${res.status}`);\
    return await res.json();\
  } catch (err) {\
    console.error('Failed:', err.message);\
    return null;\
  } finally {\
    hideLoading(); // luôn chạy\
  }\
}\
\
// Hoặc chain .catch() bên ngoài\
loadData().catch(err =\u003e console.error(err));\
\
// Parallel: cần Promise.all để catch cả hai\
const [a, b] = await Promise.all([fetchA(), fetchB()]);\
```

## Detailed Answer (EN)
Use try/catch to wrap await expressions. Errors from rejected Promises are caught like exceptions.\
```javascript\
async function loadData() {\
  try {\
    const res = await fetch('/api/data');\
    if (!res.ok) throw new Error(`HTTP ${res.status}`);\
    return await res.json();\
  } catch (err) {\
    console.error('Failed:', err.message);\
    return null;\
  } finally {\
    hideLoading(); // always runs\
  }\
}\
\
// Or chain .catch() from the outside\
loadData().catch(err =\u003e console.error(err));\
\
// Parallel: use Promise.all to catch both errors\
const [a, b] = await Promise.all([fetchA(), fetchB()]);\
```
