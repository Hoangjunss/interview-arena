---
id: state-cua-terraform-chua-gi-va-vi-sao-khong-duoc-commit-no-vao-git
position: backend
technology: state
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
State của Terraform chứa gì và vì sao không được commit nó vào Git?

## Question (EN)
What does Terraform state contain and why must it not be committed to Git?

## Đáp án chi tiết (VI)
State là **bản đồ giữa địa chỉ resource trong code và ID thật ở provider**, cộng với snapshot attribute của lần apply gần nhất.\
\
```json\
{\
  \\"type\\": \\"aws_db_instance\\

## Detailed Answer (EN)
State is **the map between resource addresses in code and real provider IDs**, plus an attribute snapshot from the last apply.\
\
```json\
{\
  \\"type\\": \\"aws_db_instance\\
