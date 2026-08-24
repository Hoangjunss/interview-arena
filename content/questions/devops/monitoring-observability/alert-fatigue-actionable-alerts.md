---
id: alert-fatigue-actionable-alerts
position: devops
technology: monitoring-observability
level: mid
tags: [alerting, on-call, best-practices]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Alert fatigue là gì và nó nguy hiểm như thế nào? Bạn thiết kế alert như thế nào để đảm bảo mọi alert đều "actionable" (có thể hành động được)?

## Question (EN)
What is alert fatigue and why is it dangerous? How would you design alerts so that every alert is "actionable"?

## Đáp án chi tiết (VI)
**Alert fatigue** xảy ra khi on-call nhận quá nhiều alert (đặc biệt là alert không cần hành động ngay, hoặc false positive) tới mức **chai lì cảm giác cấp bách** — dần dần bỏ qua hoặc snooze alert mà không xem kỹ, kể cả khi có alert thực sự nghiêm trọng.

**Vì sao nguy hiểm**: đây chính là nguyên nhân gốc của nhiều outage lớn trong thực tế — hệ thống *đã* alert đúng lúc sự cố xảy ra, nhưng on-call đã quen với việc "cái này chắc lại false alarm" nên phản ứng chậm hoặc bỏ qua, khiến sự cố nhỏ leo thang thành outage lớn.

**Nguyên tắc thiết kế alert actionable** (dựa trên tiêu chí "mọi page phải cần hành động của con người ngay lập tức"):

1. **Alert trên triệu chứng (symptom), không alert trên nguyên nhân (cause)**
   - Sai: alert "CPU > 80%" — CPU cao chưa chắc ảnh hưởng user, có thể tự phục hồi.
   - Đúng: alert "error rate > 5%" hoặc "p99 latency > 2s" — đây là triệu chứng thực sự ảnh hưởng người dùng, CPU cao chỉ nên xuất hiện trong dashboard để điều tra, không cần page.

2. **Mỗi alert phải có runbook rõ ràng**
   - Alert page giữa đêm mà không có hướng dẫn hành động cụ thể khiến on-call phải tự suy nghĩ từ đầu, tăng MTTR và stress. Alert nên link kèm runbook: "làm gì đầu tiên, log/dashboard nào cần xem, escalation path nếu không tự fix được".

3. **Set threshold dựa trên impact thực tế, không phải con số "tròn"**
   - Threshold nên gắn với SLO/error budget (ví dụ alert khi burn rate error budget nhanh hơn X lần bình thường) thay vì chọn số tùy tiện như "error rate > 1%" không có căn cứ.

4. **Phân biệt severity rõ ràng — không phải mọi alert đều cần page ngay**
   - **Page (đánh thức người)**: chỉ dành cho vấn đề ảnh hưởng user ngay lập tức, cần hành động trong vài phút.
   - **Ticket/Slack notification**: vấn đề cần biết nhưng không khẩn cấp (có thể xử lý giờ hành chính).
   - Nhầm lẫn 2 loại này là nguyên nhân phổ biến nhất của alert fatigue.

5. **Loại bỏ alert trùng lặp/nhiễu (deduplication & grouping)**
   - Dùng Alertmanager `group_by` để gộp nhiều alert cùng nguyên nhân (ví dụ 50 pod cùng crash do 1 bad deploy) thành **1 notification duy nhất** thay vì spam 50 message.

6. **Review alert định kỳ**
   - Mỗi alert đã fire nên được review: có actionable không? có dẫn tới hành động thực sự không, hay chỉ bị dismiss? Alert không bao giờ dẫn tới hành động trong 3-6 tháng nên được xóa hoặc điều chỉnh.

**Ví dụ cấu hình Alertmanager để giảm noise**:
```yaml
route:
  group_by: ['alertname', 'cluster']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  routes:
    - match:
        severity: critical
      receiver: pagerduty
    - match:
        severity: warning
      receiver: slack-channel
```
`group_wait`/`group_interval` gộp các alert liên quan xảy ra gần nhau thành 1 thông báo; `repeat_interval` tránh spam lặp lại alert chưa resolve.

## Detailed Answer (EN)
**Alert fatigue** happens when on-call receives too many alerts (especially non-urgent ones or false positives), to the point of **desensitization to urgency** — they gradually start ignoring or snoozing alerts without careful review, even genuinely severe ones.

**Why it's dangerous**: this is the root cause behind many real-world major outages — the system *did* alert correctly when the incident happened, but on-call had grown used to "this is probably another false alarm" and responded slowly or ignored it, letting a small incident escalate into a major outage.

**Principles for designing actionable alerts** (based on "every page must require immediate human action"):

1. **Alert on symptoms, not causes**
   - Wrong: alert on "CPU > 80%" — high CPU doesn't necessarily impact users and may self-recover.
   - Right: alert on "error rate > 5%" or "p99 latency > 2s" — these are symptoms that genuinely impact users; high CPU should only appear on a dashboard for investigation, not trigger a page.

2. **Every alert must have a clear runbook**
   - A page at 3am with no concrete action guidance forces on-call to think from scratch, increasing MTTR and stress. Every alert should link to a runbook: "what to check first, which logs/dashboards to look at, the escalation path if it can't be self-resolved."

3. **Set thresholds based on real impact, not round numbers**
   - Thresholds should tie to the SLO/error budget (e.g. alert when the error budget burn rate exceeds X times normal) rather than an arbitrary number like "error rate > 1%" with no basis.

4. **Clearly separate severity — not every alert needs an immediate page**
   - **Page (wake someone up)**: reserved for issues immediately impacting users, requiring action within minutes.
   - **Ticket/Slack notification**: something worth knowing but not urgent (can be handled during business hours).
   - Confusing these two is the most common cause of alert fatigue.

5. **Eliminate duplicate/noisy alerts (deduplication & grouping)**
   - Use Alertmanager's `group_by` to merge alerts sharing a root cause (e.g. 50 pods crashing from one bad deploy) into **a single notification** instead of spamming 50 messages.

6. **Periodically review alerts**
   - Every fired alert should be reviewed: was it actionable? Did it lead to real action, or just get dismissed? An alert that never leads to action over 3-6 months should be removed or retuned.

**Example Alertmanager config to reduce noise**:
```yaml
route:
  group_by: ['alertname', 'cluster']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  routes:
    - match:
        severity: critical
      receiver: pagerduty
    - match:
        severity: warning
      receiver: slack-channel
```
`group_wait`/`group_interval` merge related alerts happening close together into one notification; `repeat_interval` avoids repeatedly spamming an unresolved alert.
