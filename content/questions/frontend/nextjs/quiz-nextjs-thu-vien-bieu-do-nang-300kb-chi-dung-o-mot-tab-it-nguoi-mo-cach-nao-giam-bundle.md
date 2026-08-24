---
id: quiz-nextjs-thu-vien-bieu-do-nang-300kb-chi-dung-o-mot-tab-it-nguoi-mo-cach-nao-giam-bundle
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thư viện biểu đồ nặng 300KB chỉ dùng ở một tab ít người mở. Cách nào giảm bundle ban đầu?

## Đáp án trắc nghiệm
- [ ] Thêm thư viện vào next.config.js phần transpilePackages
- [ ] Bọc component trong <Suspense> là đủ để tách code
- [x] next/dynamic để tách thư viện ra chunk riêng và chỉ tải khi component đó thực sự render
- [ ] Đặt thư viện vào devDependencies để không đóng gói vào production

## Giải thích (VI)
next/dynamic: const Chart = dynamic(() => import('./chart')). Thư viện được tách thành chunk riêng, chỉ tải khi component render. Thêm { ssr: false } khi thư viện đụng window, và loading để có giao diện chờ.

### Giải thích các phương án:
- **Thêm thư viện vào next.config.js phần transpilePackages** (Sai): Tùy chọn đó xử lý việc biên dịch, không liên quan tới kích thước bundle.
- **Bọc component trong <Suspense> là đủ để tách code** (Sai): Suspense xử lý trạng thái chờ, không tự tách chunk.
- **next/dynamic để tách thư viện ra chunk riêng và chỉ tải khi component đó thực sự render** (Đúng): Thêm ssr: false nếu thư viện chạm vào API trình duyệt. Dynamic import tách code thành chunk riêng, tải theo nhu cầu.
- **Đặt thư viện vào devDependencies để không đóng gói vào production** (Sai): Code production import nó thì vẫn được bundle; đổi chỗ khai báo không thay đổi gì.
