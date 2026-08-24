---
id: rollback-strategies
position: devops
technology: ci-cd
level: mid
tags: [rollback, reliability, deployment-strategy]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi một bản deploy production gây lỗi nghiêm trọng, bạn có những chiến lược rollback nào? So sánh rollback code với rollback qua feature flag và rollback database migration.

## Question (EN)
When a production deployment causes a serious issue, what rollback strategies are available? Compare code rollback, feature-flag rollback, and database migration rollback.

## Đáp án chi tiết (VI)
Rollback là khả năng **đưa hệ thống về trạng thái ổn định trước đó** nhanh nhất có thể khi phát hiện sự cố. Tốc độ rollback quyết định trực tiếp đến MTTR (Mean Time To Recovery) — một trong các chỉ số DORA quan trọng nhất.

**1. Rollback artifact/deployment (nhanh nhất, phổ biến nhất):**
Vì artifact được version hóa bất biến (xem câu hỏi về artifact management), rollback chỉ là deploy lại version cũ:
```bash
# Kubernetes
kubectl rollout undo deployment/app
kubectl rollout undo deployment/app --to-revision=3

# Hoặc rõ ràng hơn
kubectl set image deployment/app app=myrepo/app:v2.4.0
```
Ưu điểm: nhanh (giây đến vài phút), không cần build lại. Nhược điểm: chỉ giải quyết được nếu vấn đề nằm ở code/config, không giúp gì nếu vấn đề đã lan ra dữ liệu (data corruption).

**2. Rollback qua feature flag (nhanh nhất tuyệt đối, nếu áp dụng được):**
Nếu tính năng lỗi được bọc trong feature flag, chỉ cần tắt flag — không cần deploy lại gì cả:
```bash
curl -X PATCH https://flags.internal/api/flags/new-checkout-flow -d '{"enabled": false}'
```
Ưu điểm: tức thời (mili-giây đến giây), không có downtime, không cần rollback cả service. Nhược điểm: chỉ hiệu quả nếu đã có flag bọc sẵn tính năng đó — không cứu được các thay đổi hạ tầng/dependency không nằm sau flag.

**3. Rollback database migration (phức tạp và rủi ro nhất):**
Đây là trường hợp khó nhất vì dữ liệu có tính **stateful** — không thể đơn giản "undo" như code.

Nguyên tắc an toàn: **expand-contract pattern** (còn gọi parallel change):
- **Expand:** thêm cột/bảng mới mà KHÔNG xóa cột cũ, deploy code đọc/ghi cả 2 nơi (dual write) hoặc chỉ cột mới.
- **Migrate:** chuyển toàn bộ traffic/code sang dùng schema mới, backfill dữ liệu.
- **Contract:** sau khi chắc chắn ổn định (thường vài ngày-tuần), mới xóa cột/bảng cũ.

Nhờ pattern này, nếu phát hiện lỗi ở bước Migrate, có thể rollback code về bản cũ mà **schema cũ vẫn còn tồn tại** — không bị mất khả năng rollback. Ngược lại, nếu migration **xóa cột ngay lập tức** (không theo expand-contract), rollback code sẽ crash vì code cũ tham chiếu cột đã bị xóa — đây là lỗi rất phổ biến và nguy hiểm.

```sql
-- Sai: migration không tương thích ngược
ALTER TABLE users DROP COLUMN old_email;

-- Đúng: theo expand-contract, xóa sau, không xóa cùng lúc với đổi code
ALTER TABLE users ADD COLUMN new_email VARCHAR(255);
-- (deploy code dual-write/dual-read, đợi ổn định)
-- ALTER TABLE users DROP COLUMN old_email; -- chỉ chạy ở migration sau, tách biệt
```

**So sánh tổng quan:**

| Loại rollback | Tốc độ | Rủi ro | Khi áp dụng được |
|---|---|---|---|
| Feature flag off | Giây | Thấp | Tính năng đã được bọc flag |
| Deploy artifact cũ | Phút | Trung bình | Lỗi nằm ở code/config, DB tương thích ngược |
| Revert DB migration | Giờ, có thể không thể | Cao | Chỉ an toàn nếu theo expand-contract; nếu không, có thể mất dữ liệu |

**Pitfall:**
- "Rollback" code nhưng quên rằng DB đã migrate không tương thích ngược — dẫn đến lỗi 500 hàng loạt vì code cũ query cột không tồn tại.
- Không có runbook rollback được test trước — khi sự cố xảy ra lúc nửa đêm, team lúng túng không biết chạy lệnh gì, tăng MTTR đáng kể.
- Rollback code nhưng cache/CDN vẫn serve response cũ theo schema mới, gây incompatibility ở tầng khác.

## Detailed Answer (EN)
Rollback is the ability to **return the system to a previously stable state** as fast as possible when an incident is detected. Rollback speed directly determines MTTR (Mean Time To Recovery) — one of the most important DORA metrics.

**1. Rollback artifact/deployment (fastest, most common):**
Because artifacts are versioned and immutable (see the artifact management question), rollback is simply redeploying an older version:
```bash
# Kubernetes
kubectl rollout undo deployment/app
kubectl rollout undo deployment/app --to-revision=3

# Or explicitly
kubectl set image deployment/app app=myrepo/app:v2.4.0
```
Pros: fast (seconds to a few minutes), no rebuild needed. Cons: only fixes issues rooted in code/config — doesn't help if the problem has already spread to data (data corruption).

**2. Rollback via feature flag (fastest possible, when applicable):**
If the broken feature is wrapped in a feature flag, just turn the flag off — no redeploy needed at all:
```bash
curl -X PATCH https://flags.internal/api/flags/new-checkout-flow -d '{"enabled": false}'
```
Pros: instant (milliseconds to seconds), no downtime, no service rollback needed. Cons: only works if the feature was already wrapped in a flag — doesn't rescue infrastructure/dependency changes that aren't behind a flag.

**3. Rolling back a database migration (the hardest and riskiest case):**
This is the hardest case because data is **stateful** — you can't simply "undo" it like code.

Safe pattern: **expand-contract** (also called parallel change):
- **Expand:** add new columns/tables WITHOUT removing old ones; deploy code that reads/writes to both (dual write) or just the new location.
- **Migrate:** shift all traffic/code to use the new schema, backfill data.
- **Contract:** only after confidence is high (usually days-weeks later), drop the old columns/tables.

With this pattern, if a bug surfaces during the Migrate step, you can roll code back to the old version while **the old schema still exists** — you don't lose the ability to roll back. Conversely, if a migration **drops a column immediately** (skipping expand-contract), rolling back the code will crash because the old code references a column that no longer exists — this is a very common and dangerous mistake.

```sql
-- Wrong: a migration that isn't backward compatible
ALTER TABLE users DROP COLUMN old_email;

-- Right: expand-contract, drop later, not at the same time as the code change
ALTER TABLE users ADD COLUMN new_email VARCHAR(255);
-- (deploy dual-write/dual-read code, wait for stability)
-- ALTER TABLE users DROP COLUMN old_email; -- run only in a later, separate migration
```

**Overall comparison:**

| Rollback type | Speed | Risk | When it applies |
|---|---|---|---|
| Feature flag off | Seconds | Low | Feature is already wrapped in a flag |
| Redeploy old artifact | Minutes | Medium | Issue is in code/config, DB is backward compatible |
| Revert DB migration | Hours, sometimes impossible | High | Only safe if expand-contract was followed; otherwise data loss is possible |

**Pitfalls:**
- Rolling back code but forgetting the DB migration wasn't backward compatible — causing a wave of 500 errors because old code queries a column that no longer exists.
- Having no rollback runbook tested in advance — when an incident hits at 2am, the team fumbles for the right commands, significantly increasing MTTR.
- Rolling back code while cache/CDN still serves responses matching the new schema, causing incompatibility at another layer.