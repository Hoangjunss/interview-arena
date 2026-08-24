---
id: dependency-pinning-lockfiles
position: devops
technology: security-devsecops
level: junior
tags: [supply-chain-security, dependency-management, sca]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Tại sao nên pin phiên bản dependency cụ thể (kèm lockfile) thay vì dùng version range (như `^1.2.0` hay `latest`)? Điều này liên quan gì đến bảo mật supply chain?

## Question (EN)
Why should you pin exact dependency versions (with a lockfile) instead of using version ranges (like `^1.2.0` or `latest`)? How does this relate to supply-chain security?

## Đáp án chi tiết (VI)
**Vấn đề với version range/`latest`:**
- `npm install lodash@^4.17.0` cho phép tự động cập nhật lên bất kỳ bản `4.x` mới nào — nếu maintainer của package (hoặc tài khoản npm của họ bị chiếm quyền) publish một bản chứa mã độc, build tiếp theo của bạn tự động kéo về mã độc đó mà không ai review.
- Đây chính là cơ chế của nhiều vụ **supply-chain attack** nổi tiếng: `event-stream` (2018), `ua-parser-js` (2021), `xz-utils` backdoor (2024) — kẻ tấn công chiếm quyền publish rồi chèn mã độc vào bản patch nhỏ, tưởng như vô hại.
- Build không **reproducible**: hôm nay build ra kết quả khác hôm qua dù code không đổi, gây khó debug ("works on my machine" vì máy khác cài version khác).

**Giải pháp — pin version + dùng lockfile:**

| Ngôn ngữ | Lockfile | Lệnh đảm bảo cài đúng lockfile |
|---|---|---|
| Node.js | `package-lock.json` / `yarn.lock` | `npm ci` (không phải `npm install`) |
| Python | `requirements.txt` với `==` hoặc `poetry.lock` | `pip install -r requirements.txt --require-hashes` |
| Java/Maven | `pom.xml` version cố định + `dependencyManagement` | Maven không có lockfile chuẩn, dùng plugin `versions-maven-plugin` để lock |
| Go | `go.sum` | `go mod verify` |

**Ví dụ thực tế:**
```json
// package.json - SAI, cho phép auto-update trong nhánh minor/patch
"dependencies": {
  "lodash": "^4.17.0"
}
```
```
# package-lock.json ghi lại chính xác version + hash đã resolve
"lodash": {
  "version": "4.17.21",
  "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
  "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4..."
}
```
```bash
# npm ci luôn cài đúng version + verify integrity hash trong lockfile
# khác với npm install có thể update lockfile nếu package.json thay đổi
npm ci
```

**Lưu ý quan trọng:** pin version không có nghĩa là "không bao giờ update" — mà là **update có kiểm soát**: dùng công cụ như Dependabot/Renovate để tự động tạo PR khi có version mới, để team review + chạy test/scan trước khi merge, thay vì để CI tự ý kéo bản mới nhất mỗi lần build.

```yaml
# renovate.json - tự động PR cập nhật dependency, có scan kèm theo
{
  "extends": ["config:base"],
  "vulnerabilityAlerts": { "enabled": true },
  "schedule": ["before 6am on monday"]
}
```

**Pitfall:** pin version nhưng không bao giờ update = tích luỹ nợ kỹ thuật và bỏ lỡ bản vá bảo mật quan trọng. Pin phải đi kèm quy trình review update định kỳ, không phải "khoá cứng rồi quên".

## Detailed Answer (EN)
**Problem with version ranges/`latest`:**
- `npm install lodash@^4.17.0` allows auto-upgrading to any new `4.x` release — if the package maintainer (or their npm account, if compromised) publishes a version containing malicious code, your next build silently pulls it in with no review.
- This is exactly the mechanism behind several famous **supply-chain attacks**: `event-stream` (2018), `ua-parser-js` (2021), the `xz-utils` backdoor (2024) — attackers gained publish access and slipped malicious code into a seemingly harmless patch release.
- Builds become **non-reproducible**: today's build differs from yesterday's even though the code hasn't changed, causing "works on my machine" debugging headaches from different resolved versions.

**Solution — pin versions + use a lockfile:**

| Language | Lockfile | Command that enforces the lockfile |
|---|---|---|
| Node.js | `package-lock.json` / `yarn.lock` | `npm ci` (not `npm install`) |
| Python | `requirements.txt` with `==` or `poetry.lock` | `pip install -r requirements.txt --require-hashes` |
| Java/Maven | Fixed versions in `pom.xml` + `dependencyManagement` | Maven has no standard lockfile; use `versions-maven-plugin` to lock |
| Go | `go.sum` | `go mod verify` |

**Real example:**
```json
// package.json - WRONG, allows auto-update within minor/patch range
"dependencies": {
  "lodash": "^4.17.0"
}
```
```
# package-lock.json records the exact resolved version + hash
"lodash": {
  "version": "4.17.21",
  "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
  "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4..."
}
```
```bash
# npm ci always installs the exact locked version and verifies its integrity hash
# unlike npm install, which can rewrite the lockfile if package.json changed
npm ci
```

**Important note:** pinning doesn't mean "never update" — it means **controlled updates**: use tools like Dependabot/Renovate to auto-open PRs when a new version is available, so the team can review and run tests/scans before merging, instead of letting CI silently pull the latest version on every build.

```yaml
# renovate.json - auto-PR dependency updates with vulnerability alerts
{
  "extends": ["config:base"],
  "vulnerabilityAlerts": { "enabled": true },
  "schedule": ["before 6am on monday"]
}
```

**Pitfall:** pinning versions but never updating them accumulates technical debt and misses important security patches. Pinning must come with a periodic update-review process, not a "lock it and forget it" approach.
