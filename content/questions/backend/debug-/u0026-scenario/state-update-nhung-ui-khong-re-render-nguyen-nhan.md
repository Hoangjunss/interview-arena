---
id: state-update-nhung-ui-khong-re-render-nguyen-nhan
position: backend
technology: debug-\u0026-scenario
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
State update nhưng UI không re-render, nguyên nhân?

## Question (EN)
State was updated but the UI didn't re-render. What are the causes?

## Đáp án chi tiết (VI)
(1) Mutate object/array trực tiếp thay vì tạo copy mới (React dùng reference comparison). (2) State nằm trong stale closure. (3) Dùng ref thay vì state. Fix: `setState([...arr])` hoặc `setState({...obj, key: value})` tạo reference mới. Immer giúp tránh lỗi này.

## Detailed Answer (EN)
(1) Mutating an object/array directly instead of creating a new copy (React uses reference comparison). (2) State is trapped in a stale closure. (3) Using a ref instead of state. Fix: `setState([...arr])` or `setState({...obj, key: value})` to create a new reference. Using Immer helps avoid this class of bugs.
