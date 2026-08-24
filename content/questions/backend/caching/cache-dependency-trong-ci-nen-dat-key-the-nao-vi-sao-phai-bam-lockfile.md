---
id: cache-dependency-trong-ci-nen-dat-key-the-nao-vi-sao-phai-bam-lockfile
position: backend
technology: caching
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Cache dependency trong CI nên đặt key thế nào? Vì sao phải băm lockfile?

## Question (EN)
How should you key a dependency cache in CI? Why hash the lockfile?

## Đáp án chi tiết (VI)
Cache key phải **thay đổi khi và chỉ khi tập dependency thay đổi**. Cách chuẩn: băm nội dung **lockfile** (`pnpm-lock.yaml`, `package-lock.json`, `go.sum`, `poetry.lock`).\
\
```yaml\
- uses: actions/cache@v4\
  with:\
    path: ~/.pnpm-store\
    key: ${{ runner.os }}-pnpm-${{ hashFiles('**/pnpm-lock.yaml') }}\
    restore-keys: ${{ runner.os }}-pnpm-\
```\
\
**Hai lỗi hay gặp:**\
\
1. **Key cố định** (`key: node-modules`) — cache không bao giờ được làm mới, build dùng dependency cũ và kết quả CI không còn phản ánh code hiện tại.\
2. **Key theo commit SHA** — mỗi commit là một key mới, tỉ lệ hit gần bằng 0, chỉ tốn thời gian upload.\
\
`restore-keys` là prefix dự phòng: khi không khớp chính xác, CI lấy cache gần nhất rồi cài phần thiếu — vẫn nhanh hơn cài từ đầu.\
\
Nên cache **thư mục store của package manager** thay vì `node_modules`: store là dữ liệu bất biến theo version, còn `node_modules` phụ thuộc nền tảng và dễ hỏng khi khôi phục lệch.

## Detailed Answer (EN)
$83
