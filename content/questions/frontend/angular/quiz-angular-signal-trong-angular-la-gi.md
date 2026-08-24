---
id: quiz-angular-signal-trong-angular-la-gi
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Signal trong Angular là gì?

## Đáp án trắc nghiệm
- [ ] Một cơ chế gửi sự kiện giữa các component, thay thế cho @Output()
- [ ] Một Observable của RxJS được đổi tên, có đầy đủ operator như map, filter, switchMap
- [ ] Một decorator đánh dấu property cần được change detection theo dõi
- [x] Wrapper quanh giá trị, đọc bằng cách gọi như hàm; Angular ghi nhận nơi đọc nó

## Giải thích (VI)
Signal là một ô chứa giá trị có khả năng thông báo khi giá trị đó thay đổi. Đọc bằng cách gọi như hàm — count() — và mỗi lần đọc trong ngữ cảnh phản ứng (template, computed, effect) sẽ đăng ký một phụ thuộc. Ghi bằng set() hoặc update(). Nhờ biết chính xác nơi nào phụ thuộc, Angular chỉ cập nhật đúng phần đó thay vì kiểm tra cả cây component.

### Giải thích các phương án:
- **Một cơ chế gửi sự kiện giữa các component, thay thế cho @Output()** (Sai): Signal biểu diễn state, không phải kênh sự kiện.
- **Một Observable của RxJS được đổi tên, có đầy đủ operator như map, filter, switchMap** (Sai): Signal không phải Observable: nó luôn có giá trị hiện tại, đồng bộ, và không mang theo bộ operator của RxJS.
- **Một decorator đánh dấu property cần được change detection theo dõi** (Sai): Signal là hàm/giá trị chứ không phải decorator.
- **Wrapper quanh giá trị, đọc bằng cách gọi như hàm; Angular ghi nhận nơi đọc nó** (Đúng): Đúng: điểm mấu chốt là signal theo dõi được quan hệ phụ thuộc, nên khi giá trị đổi chỉ cập nhật đúng chỗ phụ thuộc chứ không quét toàn cây.
