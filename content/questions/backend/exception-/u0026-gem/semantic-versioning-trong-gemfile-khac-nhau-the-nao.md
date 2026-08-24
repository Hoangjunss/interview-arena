---
id: semantic-versioning-trong-gemfile-khac-nhau-the-nao
position: backend
technology: exception-\u0026-gem
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Semantic versioning trong Gemfile: `~\u003e`, `\u003e=`, `=` khác nhau thế nào?

## Question (EN)
What do `~\u003e`, `\u003e=`, and `=` mean in a Ruby Gemfile?

## Đáp án chi tiết (VI)
Bundler dùng **pessimistic constraint operator `~\u003e`** (twiddle-wakka) để cân bằng giữa nhận patch/minor mới và tránh breaking change:\
\
| Ràng buộc | Nghĩa | Khoảng hợp lệ |\
|---|---|---|\
| `\\"~\u003e 2.1\\"` | `\u003e= 2.1, \u003c 3.0` | nhận 2.x mới |\
| `\\"~\u003e 2.1.0\\"` | `\u003e= 2.1.0, \u003c 2.2.0` | chỉ nhận patch 2.1.x |\
| `\\"\u003e= 2.1\\"` | không giới hạn trên | nguy hiểm với major version |\
| `\\"= 2.1.3\\"` | đúng version này | pin cứng |\
\
**Best practice:** dùng `~\u003e` với 2 phần số cho app (`~\u003e 7.1`), 3 phần số cho gem nhạy cảm (`~\u003e 1.5.0`).

## Detailed Answer (EN)
Bundler uses the **pessimistic constraint operator `~\u003e`** (twiddle-wakka) to balance receiving new patches/minors while avoiding breaking changes:\
\
| Constraint | Meaning | Valid range |\
|---|---|---|\
| `\\"~\u003e 2.1\\"` | `\u003e= 2.1, \u003c 3.0` | any 2.x |\
| `\\"~\u003e 2.1.0\\"` | `\u003e= 2.1.0, \u003c 2.2.0` | only 2.1.x patches |\
| `\\"\u003e= 2.1\\"` | no upper bound | risky across major versions |\
| `\\"= 2.1.3\\"` | exactly this version | hard pin |\
\
**Best practice:** use `~\u003e` with 2 digits for applications (`~\u003e 7.1`), 3 digits for sensitive gems (`~\u003e 1.5.0`).
