---
id: trunk-based-development-va-gitflow-khac-nhau-the-nao
position: backend
technology: devops-\u0026-tools
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trunk-based development và GitFlow khác nhau thế nào?

## Question (EN)
How do trunk-based development and GitFlow differ?

## Đáp án chi tiết (VI)
Hai chiến lược nhánh (branching model) trái ngược về cách tích hợp:\
\
- **Trunk-based development**: mọi người commit vào **một nhánh chính (trunk/main)**, merge **nhỏ và thường xuyên**; nhánh feature **sống rất ngắn** (dưới một ngày) rồi merge ngay. Tính năng chưa xong được **giấu sau feature flag** thay vì để trong nhánh lâu. Hỗ trợ **CI thật sự** (integrate liên tục), giảm merge lớn.\
- **GitFlow**: nhiều **nhánh sống lâu** — `develop`, `feature/*`, `release/*`, `hotfix/*`. Cấu trúc rõ ràng nhưng **tích hợp chậm**, merge phức tạp và **dễ conflict lớn** vì nhánh lệch nhau lâu.\
\
So sánh: trunk-based tối ưu **tốc độ tích hợp và CI/CD**, đổi lại cần kỷ luật (test tự động, feature flag). GitFlow hợp chu kỳ release có phiên bản rõ ràng nhưng ngược với tinh thần \\"integrate liên tục\\". DevOps hiện đại nghiêng về **trunk-based**.

## Detailed Answer (EN)
Two opposing branching models in how they integrate:\
\
- **Trunk-based development**: everyone commits to **one main branch (trunk/main)** with **small, frequent** merges; feature branches are **very short-lived** (under a day) then merged immediately. Unfinished features are **hidden behind feature flags** rather than kept in long branches. It enables **true CI** (continuous integration) and avoids big merges.\
- **GitFlow**: multiple **long-lived branches** — `develop`, `feature/*`, `release/*`, `hotfix/*`. Clear structure but **slow integration**, complex merges, and **larger conflicts** because branches diverge for long.\
\
Comparison: trunk-based optimizes **integration speed and CI/CD**, at the cost of discipline (automated tests, feature flags). GitFlow suits clearly versioned release cycles but works against \\"integrate continuously\\". Modern DevOps leans **trunk-based**.
