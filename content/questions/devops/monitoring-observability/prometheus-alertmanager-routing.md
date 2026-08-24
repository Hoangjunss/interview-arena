---
id: prometheus-alertmanager-routing
position: devops
technology: monitoring-observability
level: mid
tags: [prometheus, alertmanager, alerting]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Alertmanager của Prometheus xử lý routing, grouping và inhibition như thế nào? Cho ví dụ cấu hình cụ thể.

## Question (EN)
How does Prometheus Alertmanager handle routing, grouping, and inhibition? Give a concrete configuration example.

## Đáp án chi tiết (VI)
**Alertmanager** là thành phần tách biệt với Prometheus server, nhận alert đã fire (từ Prometheus alerting rules) và xử lý: **deduplicate, group, route, silence, inhibit** trước khi gửi notification.

**1. Routing** — quyết định alert nào đi tới receiver (Slack, PagerDuty, email) nào, dựa trên **labels** của alert, cấu hình dạng cây (tree) với route con kế thừa route cha:
```yaml
route:
  receiver: default-slack
  group_by: ['alertname', 'cluster', 'service']
  routes:
    - match:
        severity: critical
        team: payments
      receiver: pagerduty-payments
      continue: false
    - match_re:
        service: ^(checkout|payment)-.*
      receiver: slack-payments-team
```
Alert có `severity=critical, team=payments` sẽ khớp route đầu tiên → gửi PagerDuty. `continue: false` (mặc định) nghĩa là dừng lại sau khi khớp route đầu tiên, không tiếp tục kiểm tra route sau.

**2. Grouping** — gộp nhiều alert liên quan thành 1 notification duy nhất, tránh spam:
```yaml
group_by: ['alertname', 'cluster']
group_wait: 30s      # đợi 30s để gom thêm alert cùng nhóm trước khi gửi lần đầu
group_interval: 5m   # nếu có alert mới trong nhóm đã gửi, đợi 5m mới gửi update
repeat_interval: 4h  # nếu alert vẫn đang firing, nhắc lại sau mỗi 4h
```
Ví dụ: 1 bad deploy làm 30 pod cùng crash-loop → cùng `alertname=PodCrashLooping, cluster=prod` → gộp thành 1 Slack message "30 alerts: PodCrashLooping in cluster=prod" thay vì 30 message riêng lẻ.

**3. Inhibition** — chặn alert cấp thấp khi đã có alert cấp cao hơn cùng nguyên nhân đang firing, tránh "storm" alert không cần thiết:
```yaml
inhibit_rules:
  - source_match:
      alertname: 'ClusterDown'
    target_match:
      alertname: 'InstanceDown'
    equal: ['cluster']
```
Nếu cả cluster down (`ClusterDown` đang fire), không cần alert riêng từng `InstanceDown` trong cluster đó nữa — vì hiển nhiên mọi instance đều down, việc nhận thêm 50 alert riêng lẻ chỉ gây nhiễu.

**4. Silences** — tạm tắt alert theo label matcher trong khoảng thời gian nhất định (thường dùng khi biết trước có maintenance window):
```
amtool silence add alertname="HighCPU" cluster="staging" --duration=2h --comment="planned maintenance"
```

**So sánh 3 cơ chế**:

| Cơ chế | Mục đích | Khi nào dùng |
|---|---|---|
| Grouping | Gộp alert cùng nhóm thành 1 notification | Nhiều alert cùng lúc, cùng nguyên nhân |
| Inhibition | Chặn alert con khi alert cha (nghiêm trọng hơn) đang fire | Có quan hệ phân cấp rõ ràng (cluster down → instance down) |
| Silence | Tạm tắt thủ công theo thời gian | Maintenance window đã biết trước |

**Pitfall thường gặp**: cấu hình `group_by` quá rộng (ví dụ chỉ theo `cluster`) khiến alert khác nhau về bản chất (disk full và error rate cao) bị gộp chung 1 notification, làm on-call khó phân biệt vấn đề thực sự — nên `group_by` theo `alertname` kết hợp với 1-2 label khác liên quan.

## Detailed Answer (EN)
**Alertmanager** is a component separate from the Prometheus server; it receives fired alerts (from Prometheus alerting rules) and handles **deduplication, grouping, routing, silencing, and inhibition** before sending notifications.

**1. Routing** — decides which receiver (Slack, PagerDuty, email) an alert goes to, based on the alert's **labels**, configured as a tree where child routes inherit from the parent:
```yaml
route:
  receiver: default-slack
  group_by: ['alertname', 'cluster', 'service']
  routes:
    - match:
        severity: critical
        team: payments
      receiver: pagerduty-payments
      continue: false
    - match_re:
        service: ^(checkout|payment)-.*
      receiver: slack-payments-team
```
An alert with `severity=critical, team=payments` matches the first route → sent to PagerDuty. `continue: false` (the default) means it stops after matching the first route, not evaluating subsequent ones.

**2. Grouping** — merges multiple related alerts into a single notification, avoiding spam:
```yaml
group_by: ['alertname', 'cluster']
group_wait: 30s      # wait 30s to gather more alerts in the group before the first send
group_interval: 5m   # if new alerts join an already-sent group, wait 5m before sending an update
repeat_interval: 4h  # if the alert is still firing, remind again every 4h
```
Example: a bad deploy causes 30 pods to crash-loop → all share `alertname=PodCrashLooping, cluster=prod` → merged into one Slack message "30 alerts: PodCrashLooping in cluster=prod" instead of 30 separate messages.

**3. Inhibition** — suppresses lower-severity alerts when a higher-severity alert sharing the same root cause is already firing, avoiding unnecessary alert "storms":
```yaml
inhibit_rules:
  - source_match:
      alertname: 'ClusterDown'
    target_match:
      alertname: 'InstanceDown'
    equal: ['cluster']
```
If the whole cluster is down (`ClusterDown` firing), there's no need for a separate `InstanceDown` alert per instance in that cluster — since obviously every instance is down, receiving 50 individual alerts is just noise.

**4. Silences** — temporarily mute alerts matching a label matcher for a specific time window (typically used for known maintenance windows):
```
amtool silence add alertname="HighCPU" cluster="staging" --duration=2h --comment="planned maintenance"
```

**Comparing the three mechanisms**:

| Mechanism | Purpose | When to use |
|---|---|---|
| Grouping | Merge same-group alerts into one notification | Many alerts firing at once from the same cause |
| Inhibition | Suppress child alerts when a more severe parent alert is firing | Clear hierarchical relationship (cluster down → instance down) |
| Silence | Manual time-based mute | A known, planned maintenance window |

**Common pitfall**: configuring `group_by` too broadly (e.g. only by `cluster`) merges fundamentally different alerts (disk full vs high error rate) into one notification, making it hard for on-call to tell the real issue apart — `group_by` should combine `alertname` with 1-2 other relevant labels.
