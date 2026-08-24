---
id: selector-trong-provider-la-gi-va-tai-sao-dung-no-thay-vi-consumer
position: backend
technology: state-management
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
`Selector` trong Provider là gì và tại sao dùng nó thay vì `Consumer`?

## Question (EN)
What is `Selector` in Provider and why use it instead of `Consumer`?

## Đáp án chi tiết (VI)
`Consumer` theo dõi toàn bộ provider và rebuild bất cứ khi nào nó thay đổi. `Selector` cho phép chỉ theo dõi một phần cụ thể của state: `Selector\u003cUserProvider, String\u003e(selector: (_, user) =\u003e user.name, ...)` chỉ rebuild khi `name` thay đổi, không phải khi `age` thay đổi. Kiểm soát chi tiết này ngăn rebuild không cần thiết và cải thiện hiệu năng trong provider phức tạp.

## Detailed Answer (EN)
`Consumer` watches an entire provider and rebuilds whenever it changes. `Selector` lets you watch only a specific part of state, rebuilding only when that specific slice changes. This fine-grained control prevents unnecessary rebuilds and improves performance in complex providers.
