---
id: gofmt-vs-goimports-vs-golangci-lint-khac-nhau-the-nao
position: backend
technology: testing-\u0026-tooling
level: senior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
gofmt vs goimports vs golangci-lint — khác nhau thế nào?

## Question (EN)
gofmt vs goimports vs golangci-lint — what's the difference?

## Đáp án chi tiết (VI)
**`gofmt`** là formatter chính thức của Go, chuẩn hóa indentation (tab), spacing, và cú pháp. Không có option cấu hình — một chuẩn duy nhất cho toàn bộ cộng đồng Go. Chạy: `gofmt -w .`\
\
**`goimports`** = `gofmt` + tự động thêm/xóa import statements. Đây là công cụ được khuyến nghị dùng trong editor (VS Code, GoLand) thay thế gofmt.\
\
```bash\
goimports -w .          # format + fix imports\
goimports -l .          # chỉ list files cần fix\
```\
\
**`golangci-lint`** là meta-linter chạy hàng chục linters song song: `staticcheck` (bugs tiềm ẩn), `errcheck` (bỏ sót check error), `govet` (misuse of sync primitives), `revive` (code style), `gosec` (security), v.v.\
\
```bash\
golangci-lint run ./...\
golangci-lint run --fix ./...  # tự fix một số issues\
```\
\
**Cấu hình** qua `.golangci.yml`:\
```yaml\
linters:\
  enable:\
    - errcheck\
    - staticcheck\
    - gosimple\
    - unused\
    - revive\
```\
\
**Best practice:** tích hợp `goimports` vào editor (save hook), chạy `golangci-lint` trong CI pipeline và fail build nếu có lỗi.

## Detailed Answer (EN)
**`gofmt`** is Go's official formatter: normalizes indentation (tabs), spacing, and syntax. Zero configuration — one style for the entire community.\
\
**`goimports`** = `gofmt` + automatically adds/removes import statements. Recommended as the editor save-hook formatter (replaces gofmt directly).\
\
**`golangci-lint`** is a meta-linter running dozens of linters in parallel: `staticcheck` (latent bugs), `errcheck` (unchecked errors), `govet` (sync misuse), `revive` (code style), `gosec` (security), etc.\
\
```bash\
golangci-lint run ./...        # lint everything\
golangci-lint run --fix ./...  # auto-fix where possible\
```\
\
**Best practice:** configure `goimports` as the editor on-save hook; run `golangci-lint` in CI and fail the build on any finding.
