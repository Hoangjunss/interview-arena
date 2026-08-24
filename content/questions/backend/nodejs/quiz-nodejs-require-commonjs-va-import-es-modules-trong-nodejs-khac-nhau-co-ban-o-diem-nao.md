---
id: quiz-nodejs-require-commonjs-va-import-es-modules-trong-nodejs-khac-nhau-co-ban-o-diem-nao
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
require() (CommonJS) và import (ES Modules) trong Node.js khác nhau cơ bản ở điểm nào?

## Đáp án trắc nghiệm
- [ ] import chỉ là cú pháp khác của require, hành vi giống hệt nhau
- [ ] Node.js không chạy được ES Modules, import chỉ dùng được ở trình duyệt
- [ ] require chạy bất đồng bộ và trả về Promise, nên phải await require(...)
- [x] require nạp module đồng bộ lúc runtime và gọi được ở bất kỳ đâu

## Giải thích (VI)
require (CommonJS) là lời gọi hàm đồng bộ, nạp module lúc runtime, gọi được ở bất kỳ vị trí nào trong code. import tĩnh (ESM) được phân giải ở giai đoạn parse trước khi thực thi, phải nằm ở top-level, binding là live; ESM còn hỗ trợ top-level await. Node chạy ESM qua file .mjs hoặc "type": "module".

### Giải thích các phương án:
- **import chỉ là cú pháp khác của require, hành vi giống hệt nhau** (Sai): Khác nhau thật sự về ngữ nghĩa: ESM phân giải tĩnh, binding là live và read-only, có top-level await; CJS nạp động, export là giá trị copy tại thời điểm require.
- **Node.js không chạy được ES Modules, import chỉ dùng được ở trình duyệt** (Sai): Node hỗ trợ ESM ổn định từ lâu: file .mjs hoặc "type": "module" trong package.json chạy import/export natively.
- **require chạy bất đồng bộ và trả về Promise, nên phải await require(...)** (Sai): require hoàn toàn đồng bộ: nó đọc, biên dịch và thực thi module rồi trả về module.exports ngay. Thứ trả về Promise là import() động của ESM.
- **require nạp module đồng bộ lúc runtime và gọi được ở bất kỳ đâu** (Đúng): import tĩnh của ESM được phân giải lúc parse, hoisted lên đầu file, và ESM hỗ trợ top-level await. CJS là hệ module động: require là một lời gọi hàm đồng bộ, chạy tới đâu nạp tới đó. ESM phân giải import tĩnh trước khi thực thi, cho phép phân tích dependency graph, và hỗ trợ top-level await.
