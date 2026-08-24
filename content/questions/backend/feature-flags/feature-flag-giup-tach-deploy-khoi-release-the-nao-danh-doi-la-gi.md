---
id: feature-flag-giup-tach-deploy-khoi-release-the-nao-danh-doi-la-gi
position: backend
technology: feature-flags
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Feature flag giúp tách \\"deploy\\" khỏi \\"release\\" thế nào? Đánh đổi là gì?

## Question (EN)
How do feature flags decouple deploy from release? What are the trade-offs?

## Đáp án chi tiết (VI)
**Deploy** là đưa code lên server; **release** là để người dùng thấy tính năng. Feature flag tách hai việc này: code lên production nhưng nhánh mới **tắt**, bật sau bằng cấu hình, không cần deploy lại.\
\
```ts\
if (flags.isEnabled('new-checkout', user)) {\
  return newCheckout(user)\
}\
return legacyCheckout(user)\
```\
\
**Được gì:**\
\
- Merge sớm vào nhánh chính → không còn nhánh sống lâu và merge hell, hợp với trunk-based.\
- Bật dần theo phần trăm user hoặc theo nhóm nội bộ; hỏng thì **tắt flag trong vài giây**, nhanh hơn rollback deploy.\
- Tách quyết định kinh doanh (bao giờ ra mắt) khỏi lịch kỹ thuật.\
\
**Đánh đổi phải nói rõ:**\
\
- Mỗi flag nhân đôi số nhánh logic; nhiều flag cùng lúc tạo tổ hợp trạng thái không test hết được.\
- Flag chết không dọn sẽ tích lại thành code không ai dám xóa. Cần **ngày hết hạn** và task dọn ngay khi tính năng ra hết 100%.\
- Phân loại theo vòng đời: flag release (ngắn hạn, phải xóa) khác flag vận hành / kill switch (dài hạn, giữ có chủ đích).

## Detailed Answer (EN)
$85
