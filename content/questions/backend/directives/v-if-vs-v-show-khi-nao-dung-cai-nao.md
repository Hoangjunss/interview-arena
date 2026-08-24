---
id: v-if-vs-v-show-khi-nao-dung-cai-nao
position: backend
technology: directives
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
v-if vs v-show — khi nào dùng cái nào?

## Question (EN)
v-if vs v-show — when to use which?

## Đáp án chi tiết (VI)
`v-if`: xóa hoàn toàn DOM khi false — chi phí cao khi toggle thường xuyên, nhưng không render child khi không cần (lazy). `v-show`: chỉ toggle `display:none` — DOM luôn được render, chi phí thấp khi toggle. Dùng `v-show` khi element cần toggle thường xuyên. Dùng `v-if` khi điều kiện ít thay đổi, hoặc khi child component có side-effects cần tránh khởi tạo.

## Detailed Answer (EN)
`v-if`: fully removes DOM when false — high toggle cost but skips rendering children when not needed (lazy). `v-show`: only toggles `display:none` — DOM always rendered, low toggle cost. Use `v-show` when toggling frequently. Use `v-if` when the condition rarely changes, or when child components have side-effects that should not be initialized.
