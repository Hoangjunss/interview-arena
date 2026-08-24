---
id: conditionalonproperty-dung-de-lam-gi
position: backend
technology: configuration
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
@ConditionalOnProperty dùng để làm gì?

## Question (EN)
What is @ConditionalOnProperty used for?

## Đáp án chi tiết (VI)
`@ConditionalOnProperty` tạo bean **chỉ khi property có giá trị nhất định** — feature flag, optional component.\
\
```java\
@Component\
@ConditionalOnProperty(name = \\"app.feature.email\\

## Detailed Answer (EN)
`@ConditionalOnProperty` creates a bean **only when a property has a specific value** — feature flags, optional components.\
\
```java\
@Component\
@ConditionalOnProperty(name = \\"app.feature.email\\
