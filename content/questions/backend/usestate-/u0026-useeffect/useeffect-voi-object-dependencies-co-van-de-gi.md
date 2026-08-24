---
id: useeffect-voi-object-dependencies-co-van-de-gi
position: backend
technology: usestate-\u0026-useeffect
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
useEffect với object dependencies có vấn đề gì?

## Question (EN)
What problem arises when using object values as useEffect dependencies?

## Đáp án chi tiết (VI)
Object dependencies tạo infinite loop vì mỗi render tạo object literal mới có reference khác, React compare by reference không phải by value. Giải pháp: destructure primitive values từ object làm deps `[obj.id, obj.name]`, dùng useMemo để memoize object, hoặc dùng useRef để lưu object. Tương tự với array và function dependencies.

## Detailed Answer (EN)
Object dependencies cause infinite loops because every render creates a new object literal with a different reference, and React compares by reference not by value. Solutions: destructure primitive values from the object and use those as deps `[obj.id, obj.name]`, memoize the object with useMemo, or store it in a useRef. The same issue applies to array and function dependencies.
