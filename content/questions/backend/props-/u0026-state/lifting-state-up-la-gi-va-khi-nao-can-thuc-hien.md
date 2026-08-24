---
id: lifting-state-up-la-gi-va-khi-nao-can-thuc-hien
position: backend
technology: props-\u0026-state
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lifting state up là gì và khi nào cần thực hiện?

## Question (EN)
What is lifting state up and when should you do it?

## Đáp án chi tiết (VI)
Lifting state up là kỹ thuật di chuyển state lên component cha chung gần nhất khi nhiều component cần chia sẻ cùng dữ liệu. \
\
**Ví dụ:** `TemperatureInput` Celsius và Fahrenheit đều cần cùng nhiệt độ — state được đặt ở component cha, truyền xuống qua props và cập nhật qua callback `onTemperatureChange`. Cần làm khi hai sibling component mất đồng bộ. Nếu phải lift quá nhiều tầng, hãy xem xét Context hoặc state manager.

## Detailed Answer (EN)
Lifting state up means moving state to the nearest common parent when multiple components need to share the same data. For example, Celsius and Fahrenheit TemperatureInput components both need the same temperature value — the state lives in the parent, flows down via props, and is updated via an `onTemperatureChange` callback. Do it when two sibling components fall out of sync. If you need to lift through too many layers, consider Context or a state management library.
