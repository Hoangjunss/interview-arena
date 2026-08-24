---
id: security-incident-response-runbook
position: devops
technology: security-devsecops
level: mid
tags: [incident-response, runbook, audit-logging]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trình bày các bước cơ bản của một security incident response runbook, lấy ví dụ tình huống phát hiện một API key production đang bị lộ và bị khai thác (có traffic bất thường từ IP lạ).

## Question (EN)
Walk through the basic steps of a security incident response runbook, using the example of discovering a leaked and actively-exploited production API key (unusual traffic from an unknown IP).

## Đáp án chi tiết (VI)
Hầu hết framework incident response (NIST SP 800-61, SANS) đều xoay quanh 6 giai đoạn: **Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned**.

**Áp dụng vào tình huống: API key production bị lộ và đang bị khai thác**

**1. Preparation (đã có sẵn trước khi sự cố xảy ra):**
- Runbook đã viết sẵn, on-call rotation rõ ràng, kênh liên lạc khẩn cấp (Slack channel `#security-incident`, PagerDuty).
- Alerting đã cấu hình sẵn: bất thường về rate limit, traffic từ IP lạ, spike request đến endpoint nhạy cảm.

**2. Identification — xác nhận đây thực sự là sự cố:**
```bash
# Kiểm tra log truy cập API, lọc theo API key nghi ngờ
grep "api_key=sk_live_abc123" /var/log/api-gateway/access.log | tail -100
```
- Xác nhận: traffic từ IP `203.0.113.50` (không thuộc dải IP nội bộ/CDN đã biết) gọi endpoint `/admin/export-users` với tần suất bất thường (200 requests/phút so với baseline ~2/phút).
- Đánh giá mức độ nghiêm trọng (severity): key này có quyền gì? Nếu chỉ đọc public data → SEV3; nếu có quyền export PII khách hàng → SEV1, escalate ngay cho leadership + pháp lý.

**3. Containment — ngăn thiệt hại lan rộng, ưu tiên trên hết:**
```bash
# Revoke NGAY API key bị lộ, không chờ điều tra xong
curl -X DELETE https://api-gateway.internal/admin/keys/sk_live_abc123 \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Chặn IP nguồn ở tầng WAF/firewall trong lúc chờ xác nhận thêm
aws wafv2 update-ip-set --name blocked-ips --addresses "203.0.113.50/32" ...
```
- Trade-off cần cân nhắc nhanh: revoke key có thể làm gián đoạn service hợp pháp đang dùng key đó — nhưng để key sống thêm 1 phút là thêm dữ liệu bị đánh cắp, nên **containment luôn ưu tiên hơn availability** trong tình huống này.
- Nếu key được cấp cho nhiều service dùng chung (thiết kế tồi nhưng thực tế phổ biến) → phải cấp key mới cho từng service hợp pháp song song với revoke.

**4. Eradication — loại bỏ nguyên nhân gốc, không chỉ triệu chứng:**
- Xác định **key bị lộ bằng cách nào**: commit nhầm lên Git? Log ứng dụng in ra header Authorization? Bị lộ qua một dependency độc hại?
- Nếu do lộ trong code: purge khỏi Git history, kiểm tra xem có key/secret nào khác bị lộ cùng cách tương tự không (thường không chỉ có 1).
- Nếu do lỗ hổng ứng dụng (VD: SSRF cho phép đọc metadata endpoint chứa key) → patch lỗ hổng đó trước khi cấp lại key mới, nếu không key mới cũng sẽ bị lộ lại theo cách tương tự.

**5. Recovery — đưa hệ thống về trạng thái bình thường có kiểm soát:**
- Cấp key mới, rotate qua secret manager, rolling deploy các service liên quan.
- Theo dõi sát traffic trong 24-48h tiếp theo để đảm bảo không còn dấu hiệu bất thường (kẻ tấn công đôi khi có backup access khác).
- Gỡ block IP tạm thời sau khi xác nhận (nếu chặn nhầm IP CDN hợp pháp thì cần gỡ sớm).

**6. Lessons Learned — postmortem blameless trong vòng 1 tuần:**
- Viết timeline chi tiết: key bị lộ từ khi nào, phát hiện lúc nào (MTTD), containment mất bao lâu (MTTR).
- Xác định action item cụ thể có deadline và owner: VD "thêm pre-commit hook scan secret (gitleaks) cho toàn bộ repo", "audit lại quyền của mọi API key hiện có theo least privilege".
- **Blameless** — mục tiêu là sửa quy trình/hệ thống, không phải quy trách nhiệm cá nhân, để lần sau nhân viên báo cáo sự cố sớm thay vì giấu giếm vì sợ bị khiển trách.

**Pitfall thường gặp:**
- Bỏ qua bước containment để "điều tra kỹ trước" — mỗi phút trì hoãn là thêm dữ liệu bị đánh cắp; containment tạm thời (revoke, block) luôn nên làm trước, điều tra sâu làm song song/sau.
- Không giữ lại bằng chứng (log, snapshot) trước khi "dọn dẹp" hệ thống — mất khả năng điều tra forensics đầy đủ về sau, đặc biệt quan trọng nếu cần báo cáo cho cơ quan pháp lý (VD: có PII bị lộ).

## Detailed Answer (EN)
Most incident response frameworks (NIST SP 800-61, SANS) revolve around six phases: **Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned**.

**Applying it to: a leaked and actively-exploited production API key**

**1. Preparation (already in place before the incident):**
- A written runbook, a clear on-call rotation, emergency communication channels (`#security-incident` Slack channel, PagerDuty).
- Pre-configured alerting: rate-limit anomalies, traffic from unknown IPs, request spikes to sensitive endpoints.

**2. Identification — confirm this is a real incident:**
```bash
# Check API access logs, filtering by the suspected API key
grep "api_key=sk_live_abc123" /var/log/api-gateway/access.log | tail -100
```
- Confirm: traffic from IP `203.0.113.50` (not part of any known internal/CDN range) is hitting `/admin/export-users` at an abnormal rate (200 req/min vs a ~2 req/min baseline).
- Assess severity: what does this key permit? Read-only public data → SEV3; export of customer PII → SEV1, escalate immediately to leadership + legal.

**3. Containment — stop the bleeding, top priority:**
```bash
# Revoke the leaked API key IMMEDIATELY, don't wait for the investigation to finish
curl -X DELETE https://api-gateway.internal/admin/keys/sk_live_abc123 \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Block the source IP at the WAF/firewall layer while confirming further
aws wafv2 update-ip-set --name blocked-ips --addresses "203.0.113.50/32" ...
```
- Quick trade-off to weigh: revoking the key may disrupt legitimate services still using it — but letting it live one more minute means more stolen data, so **containment always outranks availability** here.
- If the key is shared across multiple services (bad design, but common in practice), issue new keys to each legitimate consumer in parallel with the revoke.

**4. Eradication — remove the root cause, not just the symptom:**
- Determine **how the key leaked**: accidentally committed to Git? Application logs printing the Authorization header? Leaked via a malicious dependency?
- If it leaked via code: purge it from Git history, and check whether other secrets leaked the same way (usually it's not just one).
- If it leaked via an application vulnerability (e.g., an SSRF reading the metadata endpoint that exposes the key), patch that vulnerability before reissuing a new key — otherwise the new key leaks the same way again.

**5. Recovery — bring the system back to a controlled normal state:**
- Issue a new key, rotate it through the secret manager, roll out affected services.
- Watch traffic closely for the next 24-48 hours to confirm no further anomalies (attackers sometimes have a backup access path).
- Lift temporary IP blocks once confirmed (release quickly if a legitimate CDN IP was blocked by mistake).

**6. Lessons Learned — a blameless postmortem within a week:**
- Write a detailed timeline: when the key leaked, when it was detected (MTTD), how long containment took (MTTR).
- Define concrete action items with an owner and deadline: e.g., "add a pre-commit secret scan (gitleaks) across all repos", "audit every existing API key's permissions against least privilege".
- **Blameless** — the goal is fixing the process/system, not assigning individual blame, so next time an employee reports an incident early instead of hiding it out of fear of reprimand.

**Common pitfalls:**
- Skipping containment to "investigate thoroughly first" — every minute of delay means more stolen data; temporary containment (revoke, block) should always happen first, with deep investigation running in parallel/after.
- Not preserving evidence (logs, snapshots) before "cleaning up" the system — this destroys the ability to do full forensic investigation later, especially critical if legal reporting is required (e.g., PII was exposed).
