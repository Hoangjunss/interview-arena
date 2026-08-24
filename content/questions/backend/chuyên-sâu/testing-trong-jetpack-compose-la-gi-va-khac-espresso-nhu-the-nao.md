---
id: testing-trong-jetpack-compose-la-gi-va-khac-espresso-nhu-the-nao
position: backend
technology: chuyên-sâu
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Testing trong Jetpack Compose là gì và khác Espresso như thế nào?

## Question (EN)
What is testing in Jetpack Compose and how does it differ from Espresso?

## Đáp án chi tiết (VI)
Compose Testing dùng semantics-based matcher thay vì view hierarchy. Dùng `ComposeTestRule`, `createComposeRule()`, và matcher như `onNodeWithText()`, `onNodeWithContentDescription()`. Khác Espresso tìm view theo cấu trúc, Compose testing query cây composable theo ngữ nghĩa. \
\
**Ví dụ:** `composeTestRule.onNodeWithText(\\"Button\\").performClick()`. Đáng tin cậy và nhanh hơn Espresso truyền thống.

## Detailed Answer (EN)
Compose Testing uses semantics-based matchers rather than view hierarchies. Use `ComposeTestRule`, `createComposeRule()`, and matchers like `onNodeWithText()`, `onNodeWithContentDescription()`. Unlike Espresso which finds views, Compose testing queries the composable tree semantically. \
\
**Example:** `composeTestRule.onNodeWithText(\\"Button\\").performClick()`. It's more reliable and faster than traditional Espresso testing.
