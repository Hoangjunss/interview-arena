---
id: quiz-typescript-kieu-b-trong-doan-code-sau-la-gi
position: frontend
technology: typescript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Kiểu B trong đoạn code sau là gì?

## Đáp án trắc nghiệm
- [ ] Lỗi compile — ReturnType không dùng được với hàm async
- [ ] Promise<{ id: number; name: string }> — Awaited không thay đổi gì
- [ ] { id: 1; name: 'An' } — giữ literal type của giá trị trả về
- [x] { id: number; name: string } — ReturnType cho ra Promise<{...}>, Awaited unwrap Promise

## Giải thích (VI)
B là { id: number; name: string }. ReturnType<typeof fetchUser> lấy kiểu trả về của hàm — với async là Promise<{...}>. Awaited<T> unwrap Promise (đệ quy với Promise lồng nhau). Combo Awaited<ReturnType<typeof fn>> là cách chuẩn lấy kiểu dữ liệu từ hàm fetch mà không khai báo trùng lặp.

### Giải thích các phương án:
- **Lỗi compile — ReturnType không dùng được với hàm async** (Sai): ReturnType hoạt động với mọi function type; với hàm async nó đơn giản trả về kiểu Promise.
- **Promise<{ id: number; name: string }> — Awaited không thay đổi gì** (Sai): Đó là kiểu của A; Awaited tồn tại chính là để unwrap Promise (kể cả Promise lồng nhau).
- **{ id: 1; name: 'An' } — giữ literal type của giá trị trả về** (Sai): Giá trị return trong object literal bị widen theo mặc định (1 → number, "An" → string) vì property có thể gán lại.
- **{ id: number; name: string } — ReturnType cho ra Promise<{...}>, Awaited unwrap Promise** (Đúng): Hàm async luôn trả Promise nên A là Promise<{ id: number; name: string }>; Awaited<A> bóc lớp Promise ra kiểu bên trong.
