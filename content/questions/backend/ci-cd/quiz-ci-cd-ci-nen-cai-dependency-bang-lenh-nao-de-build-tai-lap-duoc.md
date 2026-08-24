---
id: quiz-ci-cd-ci-nen-cai-dependency-bang-lenh-nao-de-build-tai-lap-duoc
position: backend
technology: ci-cd
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
CI nên cài dependency bằng lệnh nào để build tái lập được?

## Đáp án trắc nghiệm
- [ ] pnpm update để luôn lấy bản mới nhất có bản vá
- [ ] Cài từ cache của lần build trước cho nhanh hơn
- [x] Lệnh cài đóng băng lockfile (--frozen-lockfile)
- [ ] pnpm install như khi làm ở máy cá nhân

## Giải thích (VI)
pnpm install --frozen-lockfile (hoặc npm ci): cài đúng những gì lockfile ghi, và thất bại nếu lockfile không khớp package.json thay vì âm thầm sửa nó.

### Giải thích các phương án:
- **pnpm update để luôn lấy bản mới nhất có bản vá** (Sai): Mỗi lần chạy có thể cho ra bộ dependency khác nhau.
- **Cài từ cache của lần build trước cho nhanh hơn** (Sai): Cache là tối ưu tốc độ, không phải cơ chế bảo đảm phiên bản.
- **Lệnh cài đóng băng lockfile (--frozen-lockfile)** (Đúng): Nó cài đúng phiên bản trong lockfile và báo lỗi nếu lockfile lệch với package.json.
- **pnpm install như khi làm ở máy cá nhân** (Sai): Có thể tự cập nhật lockfile nên build không còn tái lập.
