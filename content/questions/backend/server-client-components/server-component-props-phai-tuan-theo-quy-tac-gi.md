---
id: server-component-props-phai-tuan-theo-quy-tac-gi
position: backend
technology: server-client-components
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Server Component props phải tuân theo quy tắc gì?

## Question (EN)
What rules must Server Component props follow?

## Đáp án chi tiết (VI)
Props từ Server sang Client Component phải serializable (có thể convert to JSON): strings, numbers, booleans, arrays, plain objects. Không thể truyền: functions, class instances, Symbols, Date objects (trực tiếp), React elements cũng có hạn chế. JSX làm children có thể pass. Cần serialize Date thành string trước khi pass.

## Detailed Answer (EN)
Props passed from a Server Component to a Client Component must be serializable (convertible to JSON): strings, numbers, booleans, arrays, and plain objects. You cannot pass: functions, class instances, Symbols, or Date objects directly. JSX as children can be passed. Serialize Dates to strings before passing them as props.
