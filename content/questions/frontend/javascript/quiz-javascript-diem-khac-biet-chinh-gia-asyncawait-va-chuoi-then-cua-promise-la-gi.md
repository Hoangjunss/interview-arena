---
id: quiz-javascript-diem-khac-biet-chinh-gia-asyncawait-va-chuoi-then-cua-promise-la-gi
position: frontend
technology: javascript
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Điểm khác biệt chính giữa async/await và chuỗi .then() của Promise là gì?

## Đáp án trắc nghiệm
- [ ] Chỉ async/await mới chạy được nhiều tác vụ song song
- [ ] async/await chạy đồng bộ, chặn luồng chính cho tới khi xong
- [ ] async/await không thể bắt lỗi, phải luôn dùng .catch()
- [x] Là lớp cú pháp trên Promise, viết bất đồng bộ theo mạch tuần tự

## Giải thích (VI)
async/await là lớp cú pháp trên Promise: await tạm dừng thân hàm async (không chặn luồng chính) cho tới khi Promise settle, giúp viết code bất đồng bộ theo lối tuần tự dễ đọc và bắt lỗi bằng try/catch. Bản chất vẫn là Promise nên hai phong cách trộn lẫn được.

### Giải thích các phương án:
- **Chỉ async/await mới chạy được nhiều tác vụ song song** (Sai): Song song đạt được bằng Promise.all với cả hai phong cách; await tuần tự thực ra dễ vô tình làm mất song song.
- **async/await chạy đồng bộ, chặn luồng chính cho tới khi xong** (Sai): await không chặn luồng — nó nhường quyền điều khiển lại event loop, chỉ tạm dừng phần thân hàm async đó.
- **async/await không thể bắt lỗi, phải luôn dùng .catch()** (Sai): await bắt lỗi bằng try/catch thông thường; đây là một ưu điểm về khả năng đọc so với .catch.
- **Là lớp cú pháp trên Promise, viết bất đồng bộ theo mạch tuần tự** (Đúng): await tạm dừng hàm async cho tới khi Promise settle; bản chất vẫn là Promise nên có thể trộn lẫn hai cách. Bên dưới vẫn là Promise, nên await một hàm async không hề chặn luồng chính.
