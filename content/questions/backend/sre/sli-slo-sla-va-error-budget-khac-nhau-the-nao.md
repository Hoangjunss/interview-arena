---
id: sli-slo-sla-va-error-budget-khac-nhau-the-nao
position: backend
technology: sre
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SLI, SLO, SLA và error budget khác nhau thế nào?

## Question (EN)
What is the difference between SLI, SLO, SLA and an error budget?

## Đáp án chi tiết (VI)
Bộ khái niệm cốt lõi của SRE (Google) để đo và cam kết độ tin cậy:\
\
- **SLI (Indicator)**: một **số đo thực tế** về chất lượng dịch vụ — vd tỉ lệ request thành công, độ trễ p99, uptime. Là \\"thước đo\\".\
- **SLO (Objective)**: **mục tiêu nội bộ** đặt trên SLI — vd \\"99,9% request thành công trong 30 ngày\\". Là \\"cái đích ta tự đặt\\".\
- **SLA (Agreement)**: **cam kết với khách hàng** kèm **hậu quả** (bồi thường, credit) nếu vi phạm. Thường đặt **lỏng hơn SLO** để có biên an toàn.\
- **Error budget**: phần **được phép lỗi** = `100% − SLO`. SLO 99,9% → budget 0,1% thời gian/lỗi.\
\
Ý nghĩa của error budget: khi **còn budget**, đội được phép **release nhanh, thử nghiệm**; khi **cạn budget**, ưu tiên **ổn định** (đóng băng thay đổi rủi ro). Đây là cách cân bằng khách quan giữa **tốc độ phát hành** và **độ tin cậy**, thay cho tranh luận cảm tính.

## Detailed Answer (EN)
The core SRE (Google) concepts for measuring and committing to reliability:\
\
- **SLI (Indicator)**: an **actual measurement** of service quality — e.g. success rate, p99 latency, uptime. The \\"gauge\\".\
- **SLO (Objective)**: an **internal target** on the SLI — e.g. \\"99.9% of requests succeed over 30 days\\". The \\"goal we set ourselves\\".\
- **SLA (Agreement)**: a **customer-facing commitment** with **consequences** (refunds, credits) if breached. Usually set **looser than the SLO** for a safety margin.\
- **Error budget**: the **allowed failure** = `100% − SLO`. A 99.9% SLO → a 0.1% budget of time/errors.\
\
The point of the error budget: while **budget remains**, the team may **release fast and experiment**; when the **budget is exhausted**, prioritize **stability** (freeze risky changes). It is an objective way to balance **release velocity** against **reliability**, replacing gut-feel debates.
