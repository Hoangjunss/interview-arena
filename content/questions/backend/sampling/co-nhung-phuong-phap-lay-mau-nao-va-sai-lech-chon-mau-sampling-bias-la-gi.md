---
id: co-nhung-phuong-phap-lay-mau-nao-va-sai-lech-chon-mau-sampling-bias-la-gi
position: backend
technology: sampling
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Có những phương pháp lấy mẫu nào và sai lệch chọn mẫu (sampling bias) là gì?

## Question (EN)
What sampling methods exist, and what is sampling bias?

## Đáp án chi tiết (VI)
**Các phương pháp lấy mẫu xác suất** (mỗi đơn vị có xác suất được chọn xác định):\
- **Ngẫu nhiên đơn giản** — mỗi cá thể có cơ hội như nhau.\
- **Phân tầng (stratified)** — chia tổng thể thành các nhóm con (tầng) rồi lấy mẫu trong mỗi tầng; giúp đại diện tốt các nhóm.\
- **Cụm (cluster)** — chia thành cụm, chọn ngẫu nhiên một số cụm rồi khảo sát toàn bộ.\
- **Hệ thống (systematic)** — chọn mỗi phần tử thứ `k`.\
\
**Sampling bias** xảy ra khi mẫu **lệch có hệ thống** so với tổng thể, khiến ước lượng bị chệch. Các dạng phổ biến:\
- **Selection / undercoverage** — bỏ sót một phần tổng thể.\
- **Self-selection / voluntary response** — chỉ người tự nguyện tham gia.\
- **Non-response** — nhóm không trả lời khác biệt có hệ thống.\
- **Survivorship** — chỉ nhìn vào những cái \\"sống sót\\".\
\
Lưu ý: **mẫu to không sửa được bias** — một mẫu lệch dù lớn vẫn lệch. Chỉ ngẫu nhiên hoá và khung mẫu tốt mới giảm bias.

## Detailed Answer (EN)
**Probability sampling methods** (each unit has a known chance of selection):\
- **Simple random** — every individual has an equal chance.\
- **Stratified** — split the population into subgroups (strata), then sample within each; ensures subgroups are represented.\
- **Cluster** — split into clusters, randomly pick some clusters, survey them fully.\
- **Systematic** — take every `k`-th element.\
\
**Sampling bias** occurs when the sample **systematically differs** from the population, skewing estimates. Common types:\
- **Selection / undercoverage** — part of the population is left out.\
- **Self-selection / voluntary response** — only volunteers participate.\
- **Non-response** — the non-responding group differs systematically.\
- **Survivorship** — only looking at those that \\"survived\\".\
\
Note: **a bigger sample does not fix bias** — a large biased sample is still biased. Only randomization and a good sampling frame reduce it.
