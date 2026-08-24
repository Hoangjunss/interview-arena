---
id: lam-sao-chuyen-ket-qua-build-tu-job-nay-sang-job-khac-artifact-khac-cache-the-na
position: backend
technology: artifacts
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Làm sao chuyển kết quả build từ job này sang job khác? Artifact khác cache thế nào?

## Question (EN)
How do you pass build output from one job to another? How do artifacts differ from caches?

## Đáp án chi tiết (VI)
Mỗi job trong CI chạy trên **runner riêng, filesystem riêng** — file build ở job A không tự có ở job B. Cần đẩy qua **artifact**.\
\
```yaml\
  build:\
    steps:\
      - run: pnpm build\
      - uses: actions/upload-artifact@v4\
        with: { name: dist, path: dist/ }\
  deploy:\
    needs: [build]\
    steps:\
      - uses: actions/download-artifact@v4\
        with: { name: dist }\
```\
\
**Khác biệt cốt lõi:**\
\
| | Artifact | Cache |\
|---|---|---|\
| Mục đích | Truyền **kết quả** giữa job / lưu để tải về | Tăng tốc, tránh làm lại việc |\
| Mất đi thì sao | Pipeline **sai** (job sau thiếu input) | Chỉ **chậm hơn**, kết quả vẫn đúng |\
| Vòng đời | Gắn với một lần chạy | Dùng chung qua nhiều lần chạy |\
\
**Chốt:** artifact là dữ liệu *bắt buộc phải có*; cache là *tối ưu có thể bỏ*. Không bao giờ dùng cache để truyền build output — một lần cache miss là pipeline hỏng theo cách khó lần ra.

## Detailed Answer (EN)
Each CI job runs on its **own runner with its own filesystem** — files built in job A do not exist in job B. You move them through an **artifact**.\
\
```yaml\
  build:\
    steps:\
      - run: pnpm build\
      - uses: actions/upload-artifact@v4\
        with: { name: dist, path: dist/ }\
  deploy:\
    needs: [build]\
    steps:\
      - uses: actions/download-artifact@v4\
        with: { name: dist }\
```\
\
**Core difference:**\
\
| | Artifact | Cache |\
|---|---|---|\
| Purpose | Pass **results** between jobs / keep for download | Speed things up, avoid redoing work |\
| If it is missing | Pipeline is **wrong** (later job lacks input) | Just **slower**, results still correct |\
| Lifetime | Tied to one run | Shared across runs |\
\
**Bottom line:** an artifact is data you *must* have; a cache is an optimization you can lose. Never use a cache to ship build output — a single cache miss produces a failure that is hard to trace.
