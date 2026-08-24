---
id: quiz-angular-angular-khac-react-o-diem-nao-la-cot-loi-nhat-khi-chon-cong-nghe-cho-du-an
position: frontend
technology: angular
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Angular khác React ở điểm nào là cốt lõi nhất khi chọn công nghệ cho dự án?

## Đáp án trắc nghiệm
- [ ] Angular chạy trên server còn React chạy trên trình duyệt, nên hai bên không cùng bài toán
- [ ] Angular không dùng component, chỉ dùng template HTML rời như jQuery
- [ ] React có TypeScript còn Angular chỉ viết được bằng JavaScript thuần
- [x] Angular là framework trọn gói; React là thư viện view, phần còn lại team tự chọn

## Giải thích (VI)
Angular là framework trọn gói: router, HTTP client, forms, dependency injection, CLI và testing đều do đội Angular cung cấp và version cùng nhau. React là thư viện view — router, state management, form phải chọn thêm từ hệ sinh thái. Đổi lại, Angular ràng buộc kiến trúc chặt hơn, React linh hoạt hơn nhưng team phải tự quyết nhiều thứ.

### Giải thích các phương án:
- **Angular chạy trên server còn React chạy trên trình duyệt, nên hai bên không cùng bài toán** (Sai): Cả hai đều là framework/thư viện client-side và đều có giải pháp SSR (Angular SSR, Next.js) — không phải khác biệt về nơi chạy.
- **Angular không dùng component, chỉ dùng template HTML rời như jQuery** (Sai): Angular hoàn toàn xoay quanh component; đơn vị cấu thành UI là class component kèm template.
- **React có TypeScript còn Angular chỉ viết được bằng JavaScript thuần** (Sai): Ngược lại: Angular mặc định dùng TypeScript, còn React dùng TypeScript hay JavaScript đều được.
- **Angular là framework trọn gói; React là thư viện view, phần còn lại team tự chọn** (Đúng): Đúng: khác biệt lớn nhất nằm ở phạm vi. Angular quy định sẵn kiến trúc và bộ công cụ chính thức (router, HTTP client, forms, DI, testing); React để team tự ghép router, state, form từ hệ sinh thái.
