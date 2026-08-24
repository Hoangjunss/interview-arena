---
id: quiz-typescript-kieu-k-trong-doan-code-sau-la-gi
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiểu K trong đoạn code sau là gì?

## Đáp án trắc nghiệm
- [ ] string — key của object luôn là string
- [ ] Lỗi compile — keyof không áp dụng được lên biến, chỉ lên type
- [x] 'host' | 'port' — keyof typeof lấy union các key
- [ ] 'localhost' | 3000 — union các giá trị của object

## Giải thích (VI)
K là 'host' | 'port'. typeof config (type query) lấy type của value: { host: string; port: number }; keyof áp lên type đó cho ra union literal các key. Tổ hợp keyof typeof là idiom chuẩn để derive type từ một object có sẵn.

### Giải thích các phương án:
- **string — key của object luôn là string** (Sai): Với object literal có key xác định, keyof trả union literal cụ thể; chỉ khi type có index signature [key: string] mới ra string | number.
- **Lỗi compile — keyof không áp dụng được lên biến, chỉ lên type** (Sai): Chính vì vậy mới cần typeof config chuyển value thành type trước — tổ hợp này hợp lệ và rất phổ biến.
- **'host' | 'port' — keyof typeof lấy union các key** (Đúng): config là value nên cần typeof để có type { host: string; port: number } trước, sau đó keyof cho union literal các tên key. typeof config lấy type của value, rồi keyof lấy các key của type đó.
- **'localhost' | 3000 — union các giá trị của object** (Sai): keyof lấy tên key, không phải value; muốn union value phải viết thêm [keyof typeof config] để index vào.
