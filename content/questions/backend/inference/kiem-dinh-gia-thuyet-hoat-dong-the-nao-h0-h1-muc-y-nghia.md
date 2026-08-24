---
id: kiem-dinh-gia-thuyet-hoat-dong-the-nao-h0-h1-muc-y-nghia
position: backend
technology: inference
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiểm định giả thuyết hoạt động thế nào (H0/H1, mức ý nghĩa α)?

## Question (EN)
How does hypothesis testing work (H0/H1, significance level α)?

## Đáp án chi tiết (VI)
Kiểm định giả thuyết là quy trình dùng dữ liệu mẫu để quyết định giữa hai giả thuyết đối lập:\
\
1. **Đặt giả thuyết.** `H0` (giả thuyết không) mô tả trạng thái mặc định / không có hiệu ứng; `H1` (giả thuyết đối) là điều ta muốn chứng minh (một phía hoặc hai phía).\
2. **Chọn mức ý nghĩa `α`** (thường 0.05) — mức lỗi loại I mà ta chấp nhận.\
3. **Tính thống kê kiểm định** (z, t, χ²...) và **p-value** dưới giả định H0 đúng.\
4. **Ra quyết định:** nếu `p \u003c α` → bác bỏ H0, nghiêng về H1; ngược lại → chưa đủ bằng chứng bác bỏ H0.\
\
Lưu ý quan trọng: ta **không \\"chứng minh\\" hay \\"chấp nhận\\" H0** — chỉ \\"bác bỏ\\" hoặc \\"chưa bác bỏ\\". Và **ý nghĩa thống kê ≠ ý nghĩa thực tiễn**: cần nhìn thêm **effect size**, vì mẫu rất lớn có thể làm một hiệu ứng bé xíu vẫn \\"có ý nghĩa\\".

## Detailed Answer (EN)
Hypothesis testing is a procedure that uses sample data to decide between two competing claims:\
\
1. **State the hypotheses.** `H0` (null) describes the default / no-effect state; `H1` (alternative) is what you want to demonstrate (one- or two-sided).\
2. **Choose a significance level `α`** (commonly 0.05) — the Type I error rate you tolerate.\
3. **Compute a test statistic** (z, t, χ²…) and its **p-value** under the assumption that H0 is true.\
4. **Decide:** if `p \u003c α` → reject H0 in favor of H1; otherwise → insufficient evidence to reject H0.\
\
Key caveats: you never **\\"prove\\" or \\"accept\\" H0** — only \\"reject\\" or \\"fail to reject\\". And **statistical significance ≠ practical significance**: also look at **effect size**, since a very large sample can make a tiny effect \\"significant\\".
