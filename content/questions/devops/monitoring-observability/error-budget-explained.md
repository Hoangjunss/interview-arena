---
id: error-budget-explained
position: devops
technology: monitoring-observability
level: mid
tags: [sre, slo, error-budget]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Error budget là gì? Làm sao dùng error budget để đưa ra quyết định giữa việc release feature mới và việc dừng lại để ổn định hệ thống?

## Question (EN)
What is an error budget? How do you use it to decide between shipping new features and pausing to stabilize the system?

## Đáp án chi tiết (VI)
**Error budget** = 100% - SLO. Nếu SLO là 99.9% uptime trong 30 ngày, error budget là 0.1% thời gian được phép "không đạt chuẩn" — tương đương khoảng 43.2 phút downtime/tháng.

**Công thức tính nhanh**:
```
Error budget (phút/tháng) = (1 - SLO) x số phút trong tháng
SLO 99.9%  → 0.1% x 43200 phút ≈ 43.2 phút
SLO 99.95% → 0.05% x 43200 phút ≈ 21.6 phút
SLO 99.99% → 0.01% x 43200 phút ≈ 4.32 phút
```

**Cách dùng để ra quyết định** (đây là ý tưởng cốt lõi của SRE, không phải chỉ là con số để báo cáo):
- **Còn nhiều budget** (ví dụ mới dùng 20% budget của tháng) → team được phép release nhanh, chấp nhận rủi ro cao hơn (feature mới, thử nghiệm, thay đổi lớn).
- **Sắp hết/hết budget** (đã dùng >80-100%) → **đóng băng release tính năng mới**, toàn bộ ưu tiên chuyển sang độ tin cậy: fix bug, giảm technical debt, cải thiện testing/rollback, không merge thay đổi rủi ro cao cho tới khi budget hồi phục.

**Ví dụ thực tế**: Team X có SLO 99.9% (budget 43 phút/tháng). Ngày 15 của tháng, một đợt outage do bad deploy đã tiêu tốn 35 phút. Còn lại 8 phút cho 15 ngày còn lại. Theo error budget policy, team phải:
1. Tạm dừng mọi release không critical.
2. Review lại quy trình deploy (thêm canary, thêm gate kiểm tra tự động).
3. Chỉ resume release bình thường khi bắt đầu chu kỳ 30 ngày mới (rolling window) hoặc khi có buffer đủ.

**Lợi ích của cơ chế này**:
- Giải quyết xung đột kinh điển giữa Product (muốn ship nhanh) và SRE/Ops (muốn ổn định) bằng **số liệu khách quan** thay vì tranh cãi cảm tính.
- Chấp nhận rằng **100% uptime là không cần thiết và tốn kém** — cho phép rủi ro có kiểm soát khi hệ thống đang khỏe.

**Pitfall**:
- Dùng window cố định theo lịch (calendar month) thay vì rolling window sẽ tạo hiệu ứng "reset đột ngột" ngày 1 hàng tháng — rolling 30 ngày công bằng hơn.
- Error budget cần được **tự động tính và hiển thị** (dashboard/Alertmanager), không phải tính tay cuối tháng — nếu không sẽ không ai dùng được để ra quyết định real-time.
- Team dễ "quên" khoá release khi budget cạn nếu không có policy cứng (ví dụ CI/CD tự động chặn deploy khi burn rate vượt ngưỡng) — cần gắn error budget vào quy trình, không chỉ vào văn hóa.

## Detailed Answer (EN)
**Error budget** = 100% - SLO. If the SLO is 99.9% uptime over 30 days, the error budget is the 0.1% of time allowed to be "out of spec" — roughly 43.2 minutes of downtime per month.

**Quick formula**:
```
Error budget (min/month) = (1 - SLO) x minutes in the month
SLO 99.9%  → 0.1% x 43200 min ≈ 43.2 min
SLO 99.95% → 0.05% x 43200 min ≈ 21.6 min
SLO 99.99% → 0.01% x 43200 min ≈ 4.32 min
```

**How it drives decisions** (this is the core SRE idea, not just a reporting number):
- **Plenty of budget left** (e.g. only 20% used this month) → the team can ship faster and accept more risk (new features, experiments, big changes).
- **Budget nearly/fully exhausted** (>80-100% used) → **freeze new feature releases**, shift all priority to reliability: bug fixes, reducing tech debt, improving testing/rollback, no merging high-risk changes until the budget recovers.

**Concrete example**: Team X has a 99.9% SLO (43-minute monthly budget). On day 15, a bad-deploy outage burns 35 minutes. Only 8 minutes remain for the other 15 days. Under the error budget policy, the team must:
1. Pause all non-critical releases.
2. Review the deploy process (add canary deploys, automated pre-merge gates).
3. Only resume normal releases once a new 30-day window starts (rolling window) or once enough buffer has recovered.

**Benefits of this mechanism**:
- Resolves the classic Product-vs-SRE/Ops tension (ship fast vs stay stable) with **objective data** instead of subjective debate.
- Accepts that **100% uptime is unnecessary and expensive** — allows controlled risk-taking while the system is healthy.

**Pitfalls**:
- Using a fixed calendar-month window instead of a rolling window creates a jarring "sudden reset" on the 1st of every month — a rolling 30-day window is fairer.
- The error budget must be **automatically computed and displayed** (dashboard/Alertmanager), not calculated by hand at month-end — otherwise no one can use it for real-time decisions.
- Teams easily "forget" to freeze releases when the budget runs out unless there's a hard policy (e.g. CI/CD auto-blocking deploys when burn rate crosses a threshold) — bake the error budget into process, not just culture.
