---
id: audit-logging-requirements
position: devops
technology: security-devsecops
level: mid
tags: [audit-logging, compliance, observability]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Audit logging trong hệ thống production cần đáp ứng những yêu cầu gì để phục vụ điều tra sự cố bảo mật và compliance? Phân biệt audit log với application log thông thường.

## Question (EN)
What requirements must audit logging in a production system meet to support security incident investigation and compliance? How does an audit log differ from a regular application log?

## Đáp án chi tiết (VI)
**Phân biệt audit log vs application log:**

| Tiêu chí | Application log | Audit log |
|---|---|---|
| Mục đích | Debug lỗi, theo dõi performance | Trả lời "ai đã làm gì, khi nào, từ đâu" cho mục đích bảo mật/pháp lý |
| Nội dung | Stack trace, giá trị biến, thời gian xử lý | Actor (user/service), action, resource bị tác động, timestamp, kết quả (thành công/thất bại), nguồn gốc (IP, user-agent) |
| Khả năng chỉnh sửa | Có thể xoá/rotate tự do | Phải **immutable** (không sửa/xoá được, kể cả bởi admin) |
| Retention | Ngắn (7-30 ngày thường thấy) | Dài hạn theo luật/compliance (1-7 năm tuỳ ngành) |
| Ai xem được | Dev/SRE | Security team, auditor, đôi khi cả cơ quan pháp lý |

**Yêu cầu cốt lõi của audit logging:**

1. **Đầy đủ 5W**: Who (actor), What (action + resource), When (timestamp chính xác, UTC), Where (IP, region, service), kết quả (allow/deny).
   ```json
   {
     "timestamp": "2026-08-24T09:15:32Z",
     "actor": "svc-account:ci-pipeline",
     "action": "secrets:read",
     "resource": "vault:secret/prod/db-password",
     "source_ip": "10.2.4.17",
     "result": "success",
     "request_id": "req-8f3a2c1d"
   }
   ```
2. **Immutable / tamper-evident**: log phải được ghi vào nơi mà kể cả người có quyền admin hệ thống cũng không thể sửa/xoá âm thầm — thường dùng write-once storage (S3 with Object Lock, hoặc gửi thẳng đến SIEM tách biệt quyền quản trị khỏi hệ thống production).
3. **Ghi cả sự kiện quan trọng lẫn hành vi bị từ chối**: không chỉ log request thành công mà còn phải log **mọi lần bị từ chối quyền truy cập** (401/403) — đây thường là dấu hiệu sớm của một cuộc tấn công đang dò quét hệ thống.
4. **Tách biệt khỏi hệ thống production**: audit log nên được stream ngay lập tức (không buffer lâu) đến hệ thống tách biệt (SIEM như Splunk, Elastic SIEM, hoặc cloud-native như AWS CloudTrail + S3) — nếu kẻ tấn công chiếm được quyền root trên server, chúng không thể xoá log vì log đã rời khỏi server đó rồi.
5. **Không log thông tin nhạy cảm vào audit log**: tuyệt đối không log password, token, hoặc PII đầy đủ vào chính audit log — chỉ log resource identifier (VD: `user_id: 12345`, không log số thẻ tín dụng đầy đủ).
6. **Time sync chính xác (NTP)**: nếu server lệch giờ, việc đối chiếu timeline giữa các service khi điều tra sự cố sẽ sai lệch nghiêm trọng — đây là lỗi hạ tầng cơ bản nhưng thường bị bỏ qua.

**Ví dụ enable audit log Kubernetes API server:**
```yaml
# audit-policy.yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  - level: RequestResponse
    resources:
      - group: ""
        resources: ["secrets"]
  - level: Metadata
    resources:
      - group: ""
        resources: ["pods"]
```
```bash
kube-apiserver \
  --audit-policy-file=/etc/kubernetes/audit-policy.yaml \
  --audit-log-path=/var/log/kubernetes/audit.log \
  --audit-log-maxage=90 \
  --audit-log-maxbackup=10
```
Mọi request `get secrets` sẽ ghi lại đầy đủ request/response (mức `RequestResponse`), còn thao tác trên `pods` chỉ cần ghi metadata (ai gọi API nào), không cần payload đầy đủ để tránh log quá tải.

**Compliance liên quan (SOC2/ISO 27001):** cả hai chuẩn đều yêu cầu tổ chức chứng minh có khả năng **trace lại chính xác ai truy cập dữ liệu nhạy cảm nào** trong một khoảng thời gian bất kỳ khi auditor yêu cầu — nếu audit log không đủ chi tiết hoặc bị mất do retention ngắn, tổ chức có thể fail audit.

**Pitfall:** bật audit logging nhưng không có ai/không có alert tự động theo dõi — log tồn tại chỉ để "cho có" khi audit, không phát hiện được tấn công đang diễn ra theo thời gian thực. Audit log cần đi kèm alerting rule (VD: 50 lần 403 liên tiếp từ một IP trong 1 phút → cảnh báo ngay).

## Detailed Answer (EN)
**Audit log vs application log:**

| Criteria | Application log | Audit log |
|---|---|---|
| Purpose | Debugging, performance monitoring | Answers "who did what, when, from where" for security/legal purposes |
| Content | Stack traces, variable values, processing time | Actor (user/service), action, affected resource, timestamp, outcome (success/failure), origin (IP, user-agent) |
| Mutability | Can be freely deleted/rotated | Must be **immutable** (cannot be edited/deleted, even by an admin) |
| Retention | Short (commonly 7-30 days) | Long-term per law/compliance (1-7 years depending on industry) |
| Who can view | Dev/SRE | Security team, auditors, sometimes legal authorities |

**Core requirements of audit logging:**

1. **Full 5W coverage**: Who (actor), What (action + resource), When (precise UTC timestamp), Where (IP, region, service), and the outcome (allow/deny).
   ```json
   {
     "timestamp": "2026-08-24T09:15:32Z",
     "actor": "svc-account:ci-pipeline",
     "action": "secrets:read",
     "resource": "vault:secret/prod/db-password",
     "source_ip": "10.2.4.17",
     "result": "success",
     "request_id": "req-8f3a2c1d"
   }
   ```
2. **Immutable / tamper-evident**: logs must be written somewhere that even a system admin cannot silently modify or delete — typically write-once storage (S3 with Object Lock, or streamed directly to a SIEM whose administration is separated from the production system).
3. **Record denied attempts, not just successes**: log every **access-denied event** (401/403), not just successful requests — this is often an early signal of an ongoing probing attack.
4. **Separate from the production system**: audit logs should be streamed immediately (not buffered long) to a separate system (a SIEM like Splunk, Elastic SIEM, or cloud-native like AWS CloudTrail + S3) — if an attacker gains root on a server, they cannot delete logs that have already left that server.
5. **Never log sensitive data into the audit log itself**: never log passwords, tokens, or full PII — log only resource identifiers (e.g., `user_id: 12345`, not a full credit card number).
6. **Accurate time sync (NTP)**: clock drift between servers seriously distorts timeline correlation across services during an investigation — a basic infra concern that's frequently overlooked.

**Example: enabling Kubernetes API server audit logging:**
```yaml
# audit-policy.yaml
apiVersion: audit.k8s.io/v1
kind: Policy
rules:
  - level: RequestResponse
    resources:
      - group: ""
        resources: ["secrets"]
  - level: Metadata
    resources:
      - group: ""
        resources: ["pods"]
```
```bash
kube-apiserver \
  --audit-policy-file=/etc/kubernetes/audit-policy.yaml \
  --audit-log-path=/var/log/kubernetes/audit.log \
  --audit-log-maxage=90 \
  --audit-log-maxbackup=10
```
Every `get secrets` request logs the full request/response (`RequestResponse` level), while `pods` operations only log metadata (who called which API), avoiding excessive log volume from full payloads.

**Related compliance (SOC2/ISO 27001):** both standards require organizations to prove they can **accurately trace who accessed which sensitive data** over any given period when an auditor asks — if audit logs lack sufficient detail or are lost due to short retention, the organization can fail the audit.

**Pitfall:** enabling audit logging but with no one and no automated alerting watching it — the logs exist only "for the audit" and never catch an attack happening in real time. Audit logs need accompanying alert rules (e.g., 50 consecutive 403s from one IP within a minute → immediate alert).
