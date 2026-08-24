---
id: secret-rotation-strategy
position: devops
technology: security-devsecops
level: mid
tags: [secrets-management, vault, incident-response]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết kế chiến lược rotation cho một database password đang được nhiều service production sử dụng, sao cho không gây downtime. Rotation khẩn cấp (do bị leak) khác gì so với rotation định kỳ?

## Question (EN)
Design a rotation strategy for a database password used by multiple production services, without causing downtime. How does emergency rotation (due to a leak) differ from scheduled rotation?

## Đáp án chi tiết (VI)
**Tại sao cần rotation:**
- Giảm cửa sổ thời gian một credential bị leak có thể bị khai thác (nếu password không đổi trong 2 năm, kẻ tấn công có 2 năm để khai thác nếu lấy được nó qua bất kỳ kênh nào — log cũ, backup cũ, laptop cũ nhân viên).
- Yêu cầu bắt buộc trong nhiều chuẩn compliance (PCI-DSS yêu cầu rotate credential định kỳ).

**Vấn đề cốt lõi khi rotate mà không downtime:** không thể đổi password ở DB và ở tất cả service cùng một thời điểm chính xác — luôn có độ trễ (service reload config, restart pod...).

**Chiến lược "dual credential" (không downtime):**
1. Tạo credential MỚI trên DB, **giữ nguyên credential CŨ vẫn hoạt động song song** (không revoke ngay).
2. Cập nhật secret store (Vault/Secrets Manager) với credential mới.
3. Rolling restart/reload từng service một để pull credential mới — mỗi service tự chuyển sang dùng credential mới theo tốc độ riêng, không cần đồng bộ tuyệt đối.
4. Theo dõi log kết nối DB để xác nhận **không còn service nào dùng credential cũ**.
5. Chỉ sau khi xác nhận 100% service đã chuyển, mới **revoke credential cũ**.

```bash
# Với Vault dynamic secrets, quy trình này gần như tự động:
# mỗi service lease credential riêng, hết lease tự request credential mới
vault read database/creds/app-role
# lease_duration ngắn (VD 1h) buộc rotation diễn ra liên tục tự nhiên,
# không cần "chiến dịch rotation" thủ công định kỳ nữa
```

**Với static credential (không dùng Vault dynamic secrets) — quy trình thủ công hơn:**
```sql
-- Bước 1: tạo user mới song song, không xoá user cũ
CREATE USER app_user_v2 WITH PASSWORD 'new-strong-password';
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO app_user_v2;

-- Bước 2: sau khi confirm mọi service đã chuyển (check pg_stat_activity)
SELECT usename, count(*) FROM pg_stat_activity WHERE usename LIKE 'app_user%' GROUP BY usename;

-- Bước 3: chỉ sau khi app_user (cũ) không còn connection nào, mới xoá
DROP USER app_user;
```

**Rotation định kỳ (scheduled) vs khẩn cấp (emergency leak):**

| Tiêu chí | Định kỳ | Khẩn cấp (leak) |
|---|---|---|
| Mục tiêu thời gian | Có kế hoạch, thường 30-90 ngày | Ngay lập tức, tính bằng phút |
| Có thể dùng dual-credential | Có, đủ thời gian rollout êm | Thường KHÔNG đủ thời gian — phải chấp nhận rủi ro downtime ngắn để đóng lỗ hổng ngay |
| Ưu tiên | Tránh downtime, làm cẩn thận | Đóng cửa sổ khai thác trước, xử lý downtime sau |
| Quy trình | Theo runbook chuẩn, tự động hoá qua Vault/cron | Kích hoạt incident response, có thể revoke NGAY credential cũ dù chưa migrate hết, chấp nhận một số service lỗi tạm thời còn hơn để lộ dữ liệu tiếp |
| Thông báo | Thông báo trước cho team liên quan | Escalate ngay cho security team + on-call, có thể cần thông báo pháp lý nếu là PII |

**Ví dụ tình huống khẩn cấp:** phát hiện DB password bị commit nhầm lên GitHub public repo.
1. **Revoke ngay lập tức** credential đó trên DB — chấp nhận service có thể lỗi vài phút.
2. Tạo credential mới, deploy khẩn cấp qua pipeline ưu tiên cao (hotfix pipeline).
3. Song song: xoá secret khỏi Git history (`git filter-repo` hoặc BFG), thông báo GitHub để purge cache nếu repo public đã bị index.
4. Kiểm tra log truy cập DB trong khoảng thời gian secret bị lộ để xác định có bị khai thác hay chưa (forensics) — đây là input quan trọng cho báo cáo incident.

**Pitfall:** thiết kế rotation chỉ tính đến "happy path" (mọi service reload config đúng lúc) mà không có cơ chế phát hiện service nào **chưa** pull được credential mới (VD: service bị crash loop, không đọc được secret mount mới) — dẫn đến outage khi credential cũ bị revoke mà vẫn còn service phụ thuộc nó.

## Detailed Answer (EN)
**Why rotation matters:**
- It shrinks the window an attacker can exploit a leaked credential (if a password never changes for 2 years, an attacker has 2 years to exploit it via any leak vector — old logs, old backups, a former employee's laptop).
- It's a mandatory control under many compliance standards (PCI-DSS requires periodic credential rotation).

**Core challenge for zero-downtime rotation:** you can't change the password on the DB and on every service at the exact same instant — there's always a lag (config reload, pod restart, etc.).

**"Dual credential" strategy (no downtime):**
1. Create a NEW credential on the DB while **keeping the OLD one active in parallel** (don't revoke immediately).
2. Update the secret store (Vault/Secrets Manager) with the new credential.
3. Rolling-restart/reload each service one at a time to pull the new credential — each service transitions at its own pace, no need for exact synchronization.
4. Watch DB connection logs to confirm **no service is still using the old credential**.
5. Only after confirming 100% migration, **revoke the old credential**.

```bash
# With Vault dynamic secrets, this process is nearly automatic:
# each service leases its own credential and requests a new one when the lease expires
vault read database/creds/app-role
# a short lease_duration (e.g. 1h) makes rotation happen continuously and naturally,
# no manual periodic "rotation campaign" needed
```

**With static credentials (no Vault dynamic secrets) — a more manual process:**
```sql
-- Step 1: create a new user in parallel, don't drop the old one
CREATE USER app_user_v2 WITH PASSWORD 'new-strong-password';
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO app_user_v2;

-- Step 2: after confirming all services have switched (check pg_stat_activity)
SELECT usename, count(*) FROM pg_stat_activity WHERE usename LIKE 'app_user%' GROUP BY usename;

-- Step 3: only drop the old user once it has zero active connections
DROP USER app_user;
```

**Scheduled vs emergency (leak) rotation:**

| Criteria | Scheduled | Emergency (leak) |
|---|---|---|
| Timeframe | Planned, typically 30-90 days | Immediate, measured in minutes |
| Can use dual-credential | Yes, plenty of time for a smooth rollout | Usually NOT enough time — accept brief downtime risk to close the exposure now |
| Priority | Avoid downtime, proceed carefully | Close the exploitation window first, deal with downtime after |
| Process | Standard runbook, automated via Vault/cron | Trigger incident response; may revoke the old credential IMMEDIATELY even before full migration — a few services erroring briefly beats continued data exposure |
| Notification | Advance notice to relevant teams | Immediate escalation to security + on-call, possibly legal notification if PII is involved |

**Emergency scenario example:** a DB password is discovered accidentally committed to a public GitHub repo.
1. **Revoke the credential immediately** on the DB — accept a few minutes of service errors.
2. Generate a new credential and deploy it urgently via a high-priority hotfix pipeline.
3. In parallel: purge the secret from Git history (`git filter-repo` or BFG), and notify GitHub to purge caches if the public repo was already indexed.
4. Review DB access logs from the exposure window to determine whether it was actually exploited (forensics) — critical input for the incident report.

**Pitfall:** designing rotation only for the "happy path" (every service reloads config on time) without a mechanism to detect services that **failed** to pull the new credential (e.g., crash-looping, unable to read the new secret mount) — leading to an outage once the old credential is revoked while some service still depends on it.
