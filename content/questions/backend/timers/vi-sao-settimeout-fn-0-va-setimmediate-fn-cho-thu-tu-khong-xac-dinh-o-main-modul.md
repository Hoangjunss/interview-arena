---
id: vi-sao-settimeout-fn-0-va-setimmediate-fn-cho-thu-tu-khong-xac-dinh-o-main-modul
position: backend
technology: timers
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao `setTimeout(fn, 0)` và `setImmediate(fn)` cho thứ tự không xác định ở main module, nhưng trong callback I/O thì `setImmediate` luôn chạy trước?

## Question (EN)
Why is the order of `setTimeout(fn, 0)` vs `setImmediate(fn)` non-deterministic in the main module, yet `setImmediate` always runs first inside an I/O callback?

## Đáp án chi tiết (VI)
$7a

## Detailed Answer (EN)
$7b
