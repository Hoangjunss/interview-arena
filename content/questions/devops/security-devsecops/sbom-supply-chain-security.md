---
id: sbom-supply-chain-security
position: devops
technology: security-devsecops
level: mid
tags: [supply-chain-security, sbom, sca]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
SBOM (Software Bill of Materials) là gì và nó giúp gì cho supply-chain security? Làm sao để tạo và sử dụng SBOM trong thực tế khi có sự cố như Log4Shell?

## Question (EN)
What is an SBOM (Software Bill of Materials) and how does it help supply-chain security? How would you generate and use an SBOM in practice during an incident like Log4Shell?

## Đáp án chi tiết (VI)
**SBOM** là một "danh sách thành phần" đầy đủ của một phần mềm — liệt kê mọi dependency trực tiếp và gián tiếp (transitive), version cụ thể, license, và nguồn gốc (nơi build, hash). Có thể coi như "nhãn thành phần thực phẩm" áp dụng cho software.

**Tại sao cần cho supply-chain security:**
- Phần lớn codebase hiện đại (60-90%) là code của bên thứ ba (open source packages). Một lỗ hổng trong dependency sâu (transitive dependency) rất khó phát hiện bằng mắt thường.
- Khi có sự cố như **Log4Shell (CVE-2021-44228)**, câu hỏi đầu tiên leadership hỏi là "hệ thống nào của chúng ta dùng Log4j?" — nếu không có SBOM, team phải đi rà thủ công hàng chục repo, tốn hàng ngày; có SBOM thì chỉ cần query.
- Là yêu cầu pháp lý/hợp đồng ngày càng phổ biến (Executive Order 14028 của Mỹ yêu cầu SBOM cho phần mềm bán cho chính phủ liên bang).

**Định dạng phổ biến:** SPDX, CycloneDX.

**Tạo SBOM với Syft:**
```bash
syft myapp:1.2.0 -o cyclonedx-json > sbom.json
```
Trích đoạn kết quả (CycloneDX):
```json
{
  "components": [
    {
      "type": "library",
      "name": "log4j-core",
      "version": "2.14.1",
      "purl": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
    }
  ]
}
```

**Dùng SBOM khi có sự cố (workflow thực tế):**
```bash
# Query nhanh mọi service có dùng log4j-core version bị ảnh hưởng
grep -l "log4j-core" sboms/*.json | xargs grep -E '"version": "2\.(0|1[0-6])' 
```
Hoặc dùng công cụ chuyên dụng như **Dependency-Track** — import toàn bộ SBOM của mọi service vào, khi CVE mới công bố, nó tự động đối chiếu và cảnh báo service nào bị ảnh hưởng ngay lập tức, thay vì phải scan lại từ đầu.

**Tích hợp vào pipeline:**
```yaml
- name: Generate SBOM
  run: syft ${{ env.IMAGE }} -o cyclonedx-json > sbom.json
- name: Upload SBOM to Dependency-Track
  run: |
    curl -X POST "https://dtrack.internal/api/v1/bom" \
      -H "X-Api-Key: ${{ secrets.DTRACK_API_KEY }}" \
      -F "project=${{ env.PROJECT_UUID }}" \
      -F "bom=@sbom.json"
```

**Trade-off/pitfall:**
- SBOM chỉ có giá trị nếu được **cập nhật liên tục** (mỗi build) — SBOM cũ 6 tháng gần như vô dụng khi cần trả lời nhanh trong sự cố.
- SBOM không tự phát hiện lỗ hổng — nó chỉ là dữ liệu để đối chiếu với CVE database; cần kết hợp với công cụ SCA/vulnerability database.
- Với monorepo hoặc microservices quy mô lớn, quản lý hàng trăm SBOM riêng lẻ cần một hệ thống tập trung (Dependency-Track, hoặc registry nội bộ) chứ không thể quản lý bằng file rời rạc.

## Detailed Answer (EN)
An **SBOM** is a complete "ingredient list" of a piece of software — every direct and transitive dependency, its exact version, license, and provenance (build origin, hash). Think of it as a "nutrition label" applied to software.

**Why it matters for supply-chain security:**
- Most modern codebases (60-90%) are third-party (open source) code. A vulnerability buried in a deep transitive dependency is nearly impossible to spot manually.
- During an incident like **Log4Shell (CVE-2021-44228)**, leadership's first question is "which of our systems use Log4j?" — without an SBOM, teams manually comb through dozens of repos, taking days; with one, it's a query.
- Increasingly a legal/contractual requirement (US Executive Order 14028 mandates SBOMs for software sold to the federal government).

**Common formats:** SPDX, CycloneDX.

**Generating an SBOM with Syft:**
```bash
syft myapp:1.2.0 -o cyclonedx-json > sbom.json
```
Excerpt (CycloneDX):
```json
{
  "components": [
    {
      "type": "library",
      "name": "log4j-core",
      "version": "2.14.1",
      "purl": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
    }
  ]
}
```

**Using an SBOM during an incident (real workflow):**
```bash
# Quickly find every service using an affected log4j-core version
grep -l "log4j-core" sboms/*.json | xargs grep -E '"version": "2\.(0|1[0-6])'
```
Or use a dedicated tool like **Dependency-Track** — ingest every service's SBOM into it; when a new CVE is disclosed, it automatically cross-references and flags affected services immediately instead of requiring a fresh scan.

**Pipeline integration:**
```yaml
- name: Generate SBOM
  run: syft ${{ env.IMAGE }} -o cyclonedx-json > sbom.json
- name: Upload SBOM to Dependency-Track
  run: |
    curl -X POST "https://dtrack.internal/api/v1/bom" \
      -H "X-Api-Key: ${{ secrets.DTRACK_API_KEY }}" \
      -F "project=${{ env.PROJECT_UUID }}" \
      -F "bom=@sbom.json"
```

**Trade-offs/pitfalls:**
- An SBOM is only valuable if **continuously updated** (every build) — a 6-month-old SBOM is nearly useless when you need to answer fast during an incident.
- An SBOM doesn't detect vulnerabilities by itself — it's data to cross-reference against CVE databases; pair it with SCA tools/vulnerability feeds.
- For large monorepos or microservice fleets, managing hundreds of individual SBOMs needs a centralized system (Dependency-Track or an internal registry), not loose files.
