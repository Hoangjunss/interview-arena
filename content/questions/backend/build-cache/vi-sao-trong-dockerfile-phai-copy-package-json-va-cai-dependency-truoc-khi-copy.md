---
id: vi-sao-trong-dockerfile-phai-copy-package-json-va-cai-dependency-truoc-khi-copy
position: backend
technology: build-cache
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vì sao trong Dockerfile phải `COPY package.json` và cài dependency trước khi `COPY` toàn bộ source?

## Question (EN)
Why should a Dockerfile `COPY package.json` and install dependencies before copying the whole source tree?

## Đáp án chi tiết (VI)
Vì build cache của Docker **vô hiệu theo thứ tự**: khi một instruction bị coi là thay đổi, **mọi layer phía sau nó đều build lại**. Nếu copy toàn bộ source trước rồi mới `npm install`, chỉ cần sửa một dòng code là checksum thư mục đổi → layer `COPY` miss cache → `npm install` chạy lại từ đầu.\
\
```dockerfile\
# slow: every source edit reinstalls dependencies\
COPY . .\
RUN npm ci\
\
# fast: install layer only reruns when the lockfile changes\
COPY package.json package-lock.json ./\
RUN npm ci\
COPY . .\
```\
\
Nguyên tắc chung: **xếp instruction theo tần suất thay đổi tăng dần** — cài gói hệ thống, rồi dependency, rồi source code cuối cùng. Cùng logic đó áp cho `requirements.txt` (Python), `go.mod`/`go.sum` (Go), `pom.xml` (Maven).

## Detailed Answer (EN)
Because Docker's build cache is invalidated **in order**: once an instruction is considered changed, **every layer after it is rebuilt**. If you copy the whole source first and then run `npm install`, editing a single line changes the directory checksum → the `COPY` layer misses the cache → `npm install` runs from scratch.\
\
```dockerfile\
# slow: every source edit reinstalls dependencies\
COPY . .\
RUN npm ci\
\
# fast: the install layer only reruns when the lockfile changes\
COPY package.json package-lock.json ./\
RUN npm ci\
COPY . .\
```\
\
General rule: **order instructions from least to most frequently changed** — system packages, then dependencies, then application source last. The same logic applies to `requirements.txt` (Python), `go.mod`/`go.sum` (Go), and `pom.xml` (Maven).
