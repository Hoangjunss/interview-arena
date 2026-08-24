---
id: oncall-paging-design
position: devops
technology: monitoring-observability
level: mid
tags: [on-call, paging, incident-management]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Bạn sẽ thiết kế một hệ thống on-call/paging như thế nào cho một team engineering để vừa đảm bảo phản ứng nhanh với sự cố, vừa không "đốt cháy" (burn out) nhân sự?

## Question (EN)
How would you design an on-call/paging system for an engineering team that ensures fast incident response without burning out staff?

## Đáp án chi tiết (VI)
Thiết kế on-call tốt cần cân bằng giữa **tốc độ phản ứng** và **tính bền vững con người** — đây là vấn đề tổ chức nhiều hơn là vấn đề công cụ.

**1. Rotation hợp lý**
- Rotation phổ biến: **1 tuần/người**, xoay vòng đều giữa các thành viên (tránh 1-2 người gánh phần lớn).
- Cần **primary + secondary** (backup) — nếu primary không response trong X phút, tự động escalate sang secondary, tránh trường hợp 1 người bận/mất kết nối làm toàn bộ hệ thống không ai xử lý.
- Rotation nên tính đến **múi giờ** nếu team phân tán toàn cầu — follow-the-sun (chuyển ca on-call theo giờ làm việc từng khu vực) tốt hơn nhiều so với 1 người phải thức đêm liên tục.

**2. Phân loại severity rõ ràng, chỉ page cho việc thực sự khẩn cấp**
- Như đã bàn ở nguyên tắc actionable alert: chỉ **P1/P2 (ảnh hưởng user ngay)** mới page (đánh thức/gọi điện); **P3/P4** gửi ticket/Slack, xử lý giờ hành chính.
- Escalation policy rõ ràng: page primary → sau X phút không ACK → page secondary → sau Y phút → page engineering manager.

**3. Giới hạn tần suất page hợp lý (đo lường và cải thiện)**
- Theo dõi metric **"số page/tuần cho mỗi người"** — nếu 1 người liên tục nhận > 5-10 page/tuần trong ca trực, đây là tín hiệu đỏ cần điều tra (alert quá nhạy? sản phẩm có vấn đề cấu trúc?).
- Có chính sách **"page budget"**: nếu vượt ngưỡng page trong 1 tuần, review bắt buộc nguyên nhân gốc trước khi tiếp tục.

**4. Đền bù công bằng**
- On-call nên có **đãi ngộ rõ ràng** (phụ cấp, giờ nghỉ bù nếu bị page giữa đêm) — thiếu đền bù công bằng là nguyên nhân phổ biến khiến engineer giỏi rời team/công ty.
- Cho phép **swap ca** linh hoạt khi có việc cá nhân, không cứng nhắc.

**5. Runbook và tooling hỗ trợ**
- Mỗi alert page phải kèm link runbook — giảm gánh nặng nhận thức lúc nửa đêm.
- Dashboard tổng quan dễ truy cập ngay từ notification (deep link), tránh mất thời gian tìm kiếm.

**6. Đo lường và cải thiện liên tục**
- Theo dõi **MTTA** (mean time to acknowledge), **MTTR**, số lần escalate tới secondary/manager — các con số này phản ánh chất lượng của hệ thống on-call, không chỉ chất lượng của từng cá nhân.
- Retro định kỳ (ví dụ hàng tháng) về trải nghiệm on-call, không chỉ về sự cố kỹ thuật.

**Ví dụ policy cụ thể** (PagerDuty/Opsgenie):
```
Escalation policy:
  Level 1: Primary on-call — page ngay, timeout 5 phút
  Level 2: Secondary on-call — page nếu Level 1 không ACK, timeout 10 phút
  Level 3: Engineering Manager — page nếu Level 2 không ACK
```

**Pitfall thường gặp**:
- Rotation quá dài (1 người trực 2-4 tuần liên tục) dẫn tới kiệt sức, đặc biệt nếu sản phẩm có nhiều alert nhiễu.
- Không có secondary/escalation — khi primary bận (đang lái xe, mất mạng), sự cố không ai xử lý cho tới khi primary tự check lại.
- Coi on-call là "nghĩa vụ miễn phí" không có đãi ngộ — dẫn tới burn out và turnover cao ở những engineer giỏi nhất (thường là người bị page nhiều nhất vì họ giỏi debug).

## Detailed Answer (EN)
Good on-call design balances **response speed** against **human sustainability** — this is more of an organizational problem than a tooling problem.

**1. Sensible rotation**
- A common pattern: **1 week per person**, rotating evenly among team members (avoid 1-2 people carrying most of the load).
- Have a **primary + secondary (backup)** — if the primary doesn't respond within X minutes, auto-escalate to the secondary, avoiding a scenario where one busy/unreachable person leaves nobody to handle an incident.
- Rotation should account for **time zones** on globally distributed teams — follow-the-sun (shifting on-call by regional working hours) is much better than forcing one person to stay up every night.

**2. Clear severity classification, paging only for true emergencies**
- As covered under actionable alert design: only **P1/P2 (immediate user impact)** should page (wake up/call); **P3/P4** should send a ticket/Slack message, handled during business hours.
- A clear escalation policy: page primary → no ACK within X minutes → page secondary → no ACK within Y minutes → page engineering manager.

**3. Cap page frequency reasonably (measure and improve)**
- Track the metric **"pages per person per week"** — if someone consistently receives >5-10 pages per week during their shift, that's a red flag worth investigating (overly sensitive alerts? a structural product issue?).
- Have a **"page budget" policy**: exceeding a page threshold in a week triggers a mandatory root-cause review before continuing.

**4. Fair compensation**
- On-call should come with **clear compensation** (stipends, comp time for overnight pages) — lack of fair compensation is a common reason good engineers leave a team/company.
- Allow **flexible shift swapping** for personal circumstances rather than rigid scheduling.

**5. Runbooks and supportive tooling**
- Every page should link to a runbook — reducing cognitive load at 3am.
- An easily accessible overview dashboard directly from the notification (deep link) avoids wasted time searching.

**6. Measure and continuously improve**
- Track **MTTA** (mean time to acknowledge), **MTTR**, and how often incidents escalate to secondary/manager — these numbers reflect the quality of the on-call system, not just individual performance.
- Hold periodic retros (e.g. monthly) on the on-call experience itself, not just on technical incidents.

**Example concrete policy (PagerDuty/Opsgenie)**:
```
Escalation policy:
  Level 1: Primary on-call — page immediately, timeout 5 min
  Level 2: Secondary on-call — page if Level 1 doesn't ACK, timeout 10 min
  Level 3: Engineering Manager — page if Level 2 doesn't ACK
```

**Common pitfalls**:
- Rotations that are too long (one person on-call for 2-4 straight weeks) lead to exhaustion, especially with a noisy alerting setup.
- No secondary/escalation — when the primary is busy (driving, no signal), an incident goes unhandled until the primary happens to check back in.
- Treating on-call as an unpaid obligation — leads to burnout and high turnover among the best engineers (often the ones paged the most, precisely because they're good at debugging).
