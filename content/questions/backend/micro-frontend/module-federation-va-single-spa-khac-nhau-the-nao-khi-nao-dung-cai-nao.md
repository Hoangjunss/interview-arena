---
id: module-federation-va-single-spa-khac-nhau-the-nao-khi-nao-dung-cai-nao
position: backend
technology: micro-frontend
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Module Federation và single-spa khác nhau thế nào? Khi nào dùng cái nào?

## Question (EN)
How do Module Federation and single-spa differ? When do you use each?

## Đáp án chi tiết (VI)
Hai thứ giải quyết hai vấn đề khác nhau và bổ trợ nhau, không loại trừ. Module Federation phụ trách việc NẠP và CHIA SẺ code lúc runtime (qua webpack/rspack) — host nạp module từ remote, dùng chung dependency. single-spa phụ trách việc ĐIỀU PHỐI và VÒNG ĐỜI app — đăng ký các micro-frontend, quyết định cái nào active theo route, gọi mount/unmount. Chọn Module Federation khi các team cùng stack (vd đều React) và muốn chia sẻ code/deps runtime. Chọn single-spa khi cần trộn nhiều framework và quản mount theo route. Nhiều dự án dùng single-spa cho orchestration CỘNG Module Federation cho loading. Lưu ý: đừng nghĩ phải chọn một trong hai — câu trả lời \\"tuỳ nhu cầu, và thường dùng kèm\\" thường được đánh giá cao hơn.

## Detailed Answer (EN)
They solve two different, complementary problems — not mutually exclusive. Module Federation handles LOADING and SHARING code at runtime (via webpack/rspack) — the host pulls modules from a remote and shares dependencies. single-spa handles ORCHESTRATION and app LIFECYCLE — registering micro-frontends, deciding which is active per route, calling mount/unmount. Choose Module Federation when teams share a stack (e.g., all React) and want runtime code/dep sharing. Choose single-spa when you need to mix frameworks and manage mounting by route. Many projects use single-spa for orchestration PLUS Module Federation for loading. Note: don't assume you must pick one — \\"it depends, and they're often used together\\" usually scores better.
