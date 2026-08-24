---
id: co-nhung-cong-nghe-va-framework-nao-de-xay-micro-frontend
position: backend
technology: micro-frontend
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Có những công nghệ và framework nào để xây micro-frontend?

## Question (EN)
What technologies and frameworks are used to build micro-frontends?

## Đáp án chi tiết (VI)
Chia làm hai nhóm, cộng thêm tooling cho monorepo.\
\
**Thư viện tích hợp:**\
- **Module Federation** (webpack 5, có bản cho Rspack/Vite): nạp và chia sẻ code lúc runtime — phổ biến nhất hiện nay.\
- **single-spa**: orchestrator điều phối và quản vòng đời app theo route.\
- **qiankun** (Alibaba): dựng trên single-spa, thêm sandbox JS/CSS, hợp enterprise.\
- **Piral**: mô hình \\"pilets\\" cắm động vào một shell kiểu portal.\
- **Luigi** (SAP): khai báo, hướng enterprise.\
- **Bit**: chia sẻ component xuyên nhiều app.\
\
**Kỹ thuật nền tảng:** Web Components, import maps, iframe, và ESI/SSI (tích hợp ở server).\
\
**Monorepo:** Nx, Turborepo để quản nhiều app/lib trong một repo.\
\
Lưu ý: công cụ không quyết định thành công — ranh giới team và contract giữa các mảnh mới là cốt lõi. Chọn theo nhu cầu: cùng stack → Module Federation; cần trộn nhiều framework → single-spa/qiankun.

## Detailed Answer (EN)
Two groups, plus monorepo tooling.\
\
**Integration libraries:**\
- **Module Federation** (webpack 5, with Rspack/Vite ports): loads and shares code at runtime — the most popular today.\
- **single-spa**: an orchestrator handling routing and app lifecycle.\
- **qiankun** (by Alibaba): builds on single-spa, adding JS/CSS sandboxing, suited to enterprise.\
- **Piral**: a \\"pilets\\" model that plug dynamically into a portal-like shell.\
- **Luigi** (by SAP): declarative and enterprise-focused.\
- **Bit**: shares components across multiple apps.\
\
**Platform techniques:** Web Components, import maps, iframes, and server-side ESI/SSI.\
\
**Monorepo:** Nx and Turborepo manage many apps/libs in one repo.\
\
Note: tooling doesn't decide success — team boundaries and the contracts between pieces matter most. Pick by need: same stack → Module Federation; mixing frameworks → single-spa/qiankun.
