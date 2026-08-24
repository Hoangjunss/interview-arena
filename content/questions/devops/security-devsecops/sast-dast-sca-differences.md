---
id: sast-dast-sca-differences
position: devops
technology: security-devsecops
level: junior
tags: [sast, dast, sca, application-security]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phân biệt SAST, DAST và SCA. Mỗi loại phát hiện được loại lỗ hổng nào và có giới hạn gì?

## Question (EN)
Differentiate SAST, DAST, and SCA. What kind of vulnerabilities does each detect, and what are their limitations?

## Đáp án chi tiết (VI)
Đây là ba trụ cột chính của application security testing, mỗi loại nhìn vào một "góc" khác nhau của ứng dụng.

**SAST (Static Application Security Testing) — phân tích source code, không cần chạy app:**
- Đọc trực tiếp source code/bytecode để tìm pattern nguy hiểm: SQL injection, hardcoded credential, buffer overflow, unsafe deserialization.
- Ví dụ phát hiện được:
```java
// SAST sẽ cảnh báo: string concatenation trực tiếp vào SQL query
String query = "SELECT * FROM users WHERE id = " + userInput;
statement.executeQuery(query);
```
- **Giới hạn**: không phát hiện được lỗi logic nghiệp vụ (VD: business logic cho phép user A xem đơn hàng của user B do thiếu check quyền ở tầng service) — vì SAST chỉ nhìn cú pháp/pattern, không hiểu ngữ cảnh nghiệp vụ. Tỷ lệ false positive khá cao nếu không tune rule.

**DAST (Dynamic Application Security Testing) — tấn công app đang chạy thật:**
- Không cần source code, hoạt động như một kẻ tấn công thật gửi request vào app đang chạy (black-box) để tìm lỗ hổng runtime: XSS phản ánh (reflected XSS), CSRF, broken authentication, misconfiguration HTTP header.
- Ví dụ: công cụ DAST gửi payload `<script>alert(1)</script>` vào form input và kiểm tra xem nó có bị render thẳng ra HTML response không (XSS).
- **Giới hạn**: chỉ tìm được lỗ hổng ở đường đi mà nó thực sự "bò" tới được (crawl) — nếu tính năng yêu cầu login phức tạp hoặc luồng nhiều bước, DAST tool mặc định dễ bỏ sót nếu không cấu hình kỹ (login script, API spec). Không biết được nguyên nhân gốc trong code, chỉ biết "có lỗ hổng ở endpoint X".

**SCA (Software Composition Analysis) — kiểm tra thư viện bên thứ ba:**
- Không phân tích code tự viết, mà đối chiếu danh sách dependency (trực tiếp + transitive) với cơ sở dữ liệu CVE công khai (NVD).
- Ví dụ: phát hiện `jackson-databind:2.9.8` có CVE-2019-12384 (deserialization RCE), đề xuất upgrade lên bản đã patch.
- **Giới hạn**: chỉ phát hiện lỗ hổng đã được công khai và gán CVE — không phát hiện được zero-day, và không phát hiện được lỗi trong chính code của bạn dùng thư viện đó (VD: dùng đúng thư viện an toàn nhưng cấu hình sai).

**Bảng so sánh tổng hợp:**

| Tiêu chí | SAST | DAST | SCA |
|---|---|---|---|
| Cần code | Có (source/bytecode) | Không (app đang chạy) | Cần danh sách dependency (manifest/lockfile) |
| Phát hiện | Lỗi trong code tự viết | Lỗ hổng runtime, hành vi thực tế | CVE trong thư viện bên thứ 3 |
| Thời điểm chạy | Sớm (mỗi commit/PR) | Sau khi deploy staging | Mỗi khi dependency thay đổi |
| False positive | Khá cao nếu chưa tune | Thấp hơn (test thực tế) | Thấp (dựa trên CVE đã xác nhận) |
| Bỏ sót gì | Lỗi logic nghiệp vụ, lỗ hổng runtime | Lỗi trong code chưa được exercise qua HTTP | Lỗ hổng chưa công khai (zero-day), lỗi tự viết |

**Kết luận thực tế khi phỏng vấn hay được hỏi thêm:** ba công cụ này **bổ sung cho nhau, không thay thế nhau** — một pipeline DevSecOps trưởng thành cần cả ba, vì mỗi loại bắt được một lớp lỗ hổng hoàn toàn khác nhau. Chỉ dùng SCA (rất phổ biến vì dễ setup) mà bỏ SAST/DAST sẽ để lọt toàn bộ lỗ hổng logic và lỗ hổng do chính code tự viết gây ra.

## Detailed Answer (EN)
These are the three main pillars of application security testing, each examining a different "angle" of the application.

**SAST (Static Application Security Testing) — analyzes source code, no need to run the app:**
- Reads source code/bytecode directly to find dangerous patterns: SQL injection, hardcoded credentials, buffer overflows, unsafe deserialization.
- Example it catches:
```java
// SAST flags: direct string concatenation into a SQL query
String query = "SELECT * FROM users WHERE id = " + userInput;
statement.executeQuery(query);
```
- **Limitation**: cannot detect business-logic flaws (e.g., business logic that lets user A view user B's order due to a missing authorization check at the service layer) — because SAST only sees syntax/patterns, not business context. False-positive rates are quite high without rule tuning.

**DAST (Dynamic Application Security Testing) — attacks a real running app:**
- Doesn't need source code; acts like a real attacker sending requests to a running app (black-box) to find runtime vulnerabilities: reflected XSS, CSRF, broken authentication, HTTP header misconfiguration.
- Example: a DAST tool sends the payload `<script>alert(1)</script>` into a form field and checks whether it's rendered unescaped in the HTML response (XSS).
- **Limitation**: it only finds vulnerabilities along paths it actually manages to crawl to — if a feature requires a complex login or a multi-step flow, default DAST tools easily miss it unless carefully configured (login script, API spec). It doesn't know the root cause in code, only that "vulnerability exists at endpoint X."

**SCA (Software Composition Analysis) — checks third-party libraries:**
- Doesn't analyze your own code; cross-references the dependency list (direct + transitive) against public CVE databases (NVD).
- Example: detecting `jackson-databind:2.9.8` has CVE-2019-12384 (deserialization RCE) and recommending an upgrade to a patched version.
- **Limitation**: only detects publicly disclosed, CVE-assigned vulnerabilities — misses zero-days, and doesn't catch bugs in how your own code uses that library (e.g., using a safe library but configuring it incorrectly).

**Comparison table:**

| Criteria | SAST | DAST | SCA |
|---|---|---|---|
| Needs code | Yes (source/bytecode) | No (running app) | Needs a dependency list (manifest/lockfile) |
| Detects | Bugs in your own code | Runtime vulnerabilities, actual behavior | CVEs in third-party libraries |
| When it runs | Early (every commit/PR) | After deploying to staging | Whenever a dependency changes |
| False positives | Fairly high without tuning | Lower (real exploitation attempts) | Low (based on confirmed CVEs) |
| What it misses | Business-logic flaws, runtime vulnerabilities | Bugs not exercised via HTTP | Undisclosed (zero-day) vulnerabilities, custom-code bugs |

**Practical takeaway when this comes up in an interview:** these three tools **complement, not replace, each other** — a mature DevSecOps pipeline needs all three, since each catches a completely different class of vulnerability. Using only SCA (popular because it's easy to set up) while skipping SAST/DAST leaves entire categories of logic flaws and custom-code vulnerabilities undetected.
