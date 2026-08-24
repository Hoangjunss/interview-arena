---
id: quiz-vuejs-vue-khac-react-o-diem-nao-la-cot-loi-nhat-khi-viet-giao-dien
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Vue khác React ở điểm nào là cốt lõi nhất khi viết giao diện?

## Đáp án trắc nghiệm
- [ ] Vue là framework cho backend, React là thư viện frontend
- [x] Vue dùng template + directive và tự theo dõi phụ thuộc; React dùng JSX
- [ ] Vue chỉ chạy được với JavaScript thuần, hoàn toàn không hỗ trợ TypeScript
- [ ] Vue hoàn toàn không dùng virtual DOM, còn React thì có

## Giải thích (VI)
Vue mô tả UI bằng template kèm directive và có hệ thống reactivity tự theo dõi phụ thuộc: sửa state là phần view liên quan tự cập nhật. React mô tả UI bằng JSX và render lại component khi state đổi, còn việc tối ưu do lập trình viên quyết định. Vue cũng đi kèm sẵn router và store chính thức (Vue Router, Pinia), trong khi React để team tự chọn.

### Giải thích các phương án:
- **Vue là framework cho backend, React là thư viện frontend** (Sai): Cả hai đều dành cho giao diện phía client (và đều có giải pháp SSR).
- **Vue dùng template + directive và tự theo dõi phụ thuộc; React dùng JSX** (Đúng): Đúng: khác biệt nằm ở cách mô tả UI (template với v-if/v-for vs JSX) và ai chịu trách nhiệm theo dõi phụ thuộc — Vue tự track, React để lập trình viên tự quản lý render lại qua state/hook.
- **Vue chỉ chạy được với JavaScript thuần, hoàn toàn không hỗ trợ TypeScript** (Sai): Vue 3 được viết lại bằng TypeScript và hỗ trợ TS đầy đủ.
- **Vue hoàn toàn không dùng virtual DOM, còn React thì có** (Sai): Vue 3 vẫn có virtual DOM, kèm các tối ưu ở bước biên dịch template.
