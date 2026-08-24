---
id: redux-toolkit-vs-zustand-vs-jotai-trong-rn-2026-chon-cai-nao
position: backend
technology: state-\u0026-data
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Redux Toolkit vs Zustand vs Jotai trong RN 2026 — chọn cái nào?

## Question (EN)
Redux Toolkit vs Zustand vs Jotai in RN 2026 — which one?

## Đáp án chi tiết (VI)
**Redux Toolkit (RTK)**: full-featured. RTK Query thay axios cho server state, devtools tốt nhất, time-travel debugging. Phù hợp app lớn (10+ engineers), cần audit trail rõ ràng. Boilerplate vẫn nặng dù RTK đã giảm so với Redux cổ điển. Trên RN, devtools cần Reactotron hoặc Flipper plugin.\
\
**Zustand**: API tối giản (hook + closure), không context, không boilerplate. Khoảng 1KB bundle. Dễ test (store là plain object). Persist middleware cho RN dùng MMKV/AsyncStorage adapter.\
\
**Jotai**: atom-based — chia state thành nhiều atom nhỏ, component subscribe atom nào re-render atom đó. Phù hợp UI nhiều nguồn state độc lập (form tự do, canvas).\
\
**Khuyến nghị 2026:**\
- App nhỏ-trung (≤ 50 screen, ≤ 5 dev): **Zustand**. Đủ tính năng, DX rất tốt.\
- App lớn cần audit, time-travel: **RTK + RTK Query**.\
- UI editor/canvas/form đa ngả: **Jotai**.\
- Server state: **TanStack Query** kèm bất kỳ store nào ở trên cho client state.

## Detailed Answer (EN)
**Redux Toolkit (RTK):** full-featured. RTK Query replaces axios for server state, has the best devtools, and supports time-travel debugging. Fits large apps (10+ engineers) needing a clean audit trail. Boilerplate is still heavy compared with Zustand. On RN, devtools require Reactotron or a Flipper plugin.\
\
**Zustand:** minimalist API (hook + closure), no context, no boilerplate. ~1 KB bundle. Easy to test (the store is a plain object). The persist middleware works for RN via an MMKV/AsyncStorage adapter.\
\
**Jotai:** atom-based — split state into small atoms, components subscribe to the atoms they care about. Good fit when UI has many independent state sources (free-form forms, canvas).\
\
**Recommendation 2026:**\
- Small/medium app (≤ 50 screens, ≤ 5 devs): **Zustand**. Enough features, unbeatable DX.\
- Large app needing audit/time-travel: **RTK + RTK Query**.\
- Multi-source editors/canvas/forms: **Jotai**.\
- Server state: **TanStack Query** alongside any of the above for client state.
