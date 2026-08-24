---
id: quiz-nextjs-trang-dung-cookies-hoac-headers-thi-duoc-render-theo-kieu-nao
position: frontend
technology: nextjs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Trang dùng cookies() hoặc headers() thì được render theo kiểu nào?

## Đáp án trắc nghiệm
- [ ] Static, nhưng phần dùng cookie được điền vào phía client sau khi tải
- [x] Dynamic — hai hàm này phụ thuộc vào request cụ thể
- [ ] Tùy next.config.js, mặc định vẫn là static
- [ ] Vẫn static, vì Next.js chụp lại cookie tại thời điểm build

## Giải thích (VI)
Dynamic. cookies(), headers(), searchParams và connection() đều phụ thuộc vào request nên không thể dựng sẵn HTML — dùng bất kỳ cái nào là cả route chuyển sang render theo request. Muốn giữ phần còn lại tĩnh thì cô lập phần động vào một component bọc <Suspense>.

### Giải thích các phương án:
- **Static, nhưng phần dùng cookie được điền vào phía client sau khi tải** (Sai): Không có cơ chế điền tự động như vậy trên server-rendered HTML.
- **Dynamic — hai hàm này phụ thuộc vào request cụ thể** (Đúng): Các API phụ thuộc request tự động đẩy route sang chế độ dynamic. Next.js không thể dựng sẵn HTML lúc build cho trang như vậy.
- **Tùy next.config.js, mặc định vẫn là static** (Sai): Việc chuyển sang dynamic là hệ quả tự động, không phải tùy chọn cấu hình.
- **Vẫn static, vì Next.js chụp lại cookie tại thời điểm build** (Sai): Cookie của người dùng chưa tồn tại lúc build.
