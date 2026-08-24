---
id: git-flow-va-trunk-based-development-khac-nhau-the-nao-khi-nao-dung-cai-nao
position: backend
technology: workflow-\u0026-branching
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Git Flow và Trunk-based development khác nhau thế nào? Khi nào dùng cái nào?

## Question (EN)
How do Git Flow and trunk-based development differ, and when do you use each?

## Đáp án chi tiết (VI)
**Git Flow**: nhiều nhánh dài hạn — `main`, `develop`, `feature/*`, `release/*`, `hotfix/*`. Hợp khi: release theo chu kỳ dài, cần maintain nhiều version song song, team lớn cần tách biệt. Nhược điểm: feature branch sống lâu → merge conflict lớn; hotfix phải merge vào cả `main` lẫn `develop`.\
\
**Trunk-based development (TBD)**: mọi người push thẳng vào `main` hoặc nhánh rất ngắn (\u003c1 ngày), tích hợp liên tục, deploy nhiều lần/ngày. Giảm conflict, hợp với team muốn CI/CD nhanh — nhưng cần commit nhỏ và kỷ luật (mỗi commit vào `main` phải deploy-ready).\
\
**Chọn cái nào:** sản phẩm cần nhiều version / kỳ release dài → Git Flow; web/service deploy liên tục → TBD. Nhiều team VN dùng bản rút gọn **GitHub Flow**: `main` + feature branch ngắn + Pull Request review, cân bằng giữa hai thái cực.

## Detailed Answer (EN)
**Git Flow**: multiple long-lived branches — `main`, `develop`, `feature/*`, `release/*`, `hotfix/*`. Fits: long release cycles, maintaining several versions in parallel, large teams needing isolation. Downsides: long-lived feature branches → large merge conflicts; hotfixes must merge into both `main` and `develop`.\
\
**Trunk-based development (TBD)**: everyone pushes straight to `main` or very short branches (\u003c1 day), integrating continuously and deploying many times a day. Fewer conflicts, fits teams wanting fast CI/CD — but requires small commits and discipline (every commit to `main` must be deploy-ready).\
\
**Which to use:** products needing many versions / long release cycles → Git Flow; continuously deployed web/services → TBD. Many teams use the lighter **GitHub Flow**: `main` + short feature branches + Pull Request review, a middle ground.
