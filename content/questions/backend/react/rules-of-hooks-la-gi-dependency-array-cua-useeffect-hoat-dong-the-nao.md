---
id: rules-of-hooks-la-gi-dependency-array-cua-useeffect-hoat-dong-the-nao
position: backend
technology: react
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Rules of Hooks là gì? Dependency array của `useEffect` hoạt động thế nào?

## Question (EN)
What are the Rules of Hooks? How does the `useEffect` dependency array work?

## Đáp án chi tiết (VI)
**Rules of Hooks** (bắt buộc để React khớp đúng state qua các lần render):\
1. **Chỉ gọi hook ở cấp cao nhất** — không đặt trong `if`, vòng lặp, hàm lồng. React nhận diện hook theo **thứ tự gọi**, nên thứ tự phải ổn định.\
2. **Chỉ gọi hook từ** function component hoặc custom hook (không gọi từ hàm JS thường).\
\
**Dependency array của `useEffect`** quyết định khi nào effect chạy lại:\
- `useEffect(fn)` — **không** mảng deps → chạy sau **mỗi** render.\
- `useEffect(fn, [])` — mảng rỗng → chạy **một lần** sau mount (+ cleanup khi unmount).\
- `useEffect(fn, [a, b])` — chạy lại khi `a` **hoặc** `b` đổi (so sánh `Object.is`).\
\
Điểm hay bị hỏi:\
- Phải liệt kê **mọi giá trị reactive** effect dùng (props, state, hàm) — thiếu → **stale closure** (đọc giá trị cũ). ESLint `exhaustive-deps` cảnh báo.\
- Trả về **hàm cleanup** để hủy subscription/timer trước lần chạy sau và khi unmount.\
- Hàm/object tạo mới mỗi render làm deps \\"đổi\\" liên tục → bọc `useCallback`/`useMemo`.

## Detailed Answer (EN)
$88
