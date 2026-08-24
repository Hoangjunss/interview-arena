---
id: quiz-nodejs-structuredclone-so-voi-jsonparsejsonstringify-doan-code-sau-in-ra-gi
position: backend
technology: nodejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
structuredClone so với JSON.parse(JSON.stringify()) — đoạn code sau in ra gì?

## Đáp án trắc nghiệm
- [ ] false true false false
- [ ] true true true true
- [ ] Báo lỗi vì JSON.stringify không xử lý được Set
- [x] false true false true

## Giải thích (VI)
In false true hai lần. JSON.parse(JSON.stringify(...)) làm mất kiểu: Date thành chuỗi ISO, Set thành {} rỗng. structuredClone dùng structured clone algorithm — hỗ trợ Date, Set, Map, ArrayBuffer... — nên bản sao giữ nguyên instanceof. (FREE)

### Giải thích các phương án:
- **false true false false** (Sai): Sai — structuredClone hỗ trợ Set (và Map, Date, RegExp, ArrayBuffer...); bản sao là một Set thực sự, độc lập với bản gốc.
- **true true true true** (Sai): Sai — hiểu nhầm rằng JSON round-trip khôi phục được kiểu gốc. JSON.parse chỉ tạo object/array/string/number/boolean/null; chuỗi ISO không tự biến lại thành Date.
- **Báo lỗi vì JSON.stringify không xử lý được Set** (Sai): Sai — JSON.stringify không throw với Set; nó serialize Set như object thường không có property enumerable → {}. Chỉ BigInt hoặc cấu trúc vòng (circular) mới làm stringify throw.
- **false true false true** (Đúng): JSON round-trip làm MẤT kiểu: Date thành chuỗi ISO, Set thành {} (JSON không có khái niệm Set). structuredClone dùng structured clone algorithm nên giữ nguyên Date lẫn Set.
