---
id: quiz-vuejs-pinia-khac-vuex-o-nhng-diem-nao-dang-ke
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Pinia khác Vuex ở những điểm nào đáng kể?

## Đáp án trắc nghiệm
- [ ] Pinia chỉ lưu được dữ liệu dạng chuỗi nên phải tự serialize
- [ ] Pinia bắt buộc mọi thay đổi state phải đi qua mutation đồng bộ
- [ ] Pinia không dùng reactivity của Vue mà tự cài lại cơ chế riêng của mình
- [x] Bỏ mutation, store phẳng không lồng nhau, suy luận TypeScript tốt hơn

## Giải thích (VI)
Pinia là thư viện state chính thức của Vue hiện nay. So với Vuex: bỏ khái niệm mutation (thay đổi state ngay trong actions), mỗi store là một đơn vị độc lập thay vì module lồng nhau, API hợp với Composition API, và TypeScript suy luận kiểu mà không cần khai báo thêm. Vẫn có devtools và hỗ trợ SSR.

### Giải thích các phương án:
- **Pinia chỉ lưu được dữ liệu dạng chuỗi nên phải tự serialize** (Sai): Lưu được mọi cấu trúc dữ liệu như state thường.
- **Pinia bắt buộc mọi thay đổi state phải đi qua mutation đồng bộ** (Sai): Chính mutation là thứ Pinia bỏ đi; actions xử lý cả đồng bộ lẫn bất đồng bộ.
- **Pinia không dùng reactivity của Vue mà tự cài lại cơ chế riêng của mình** (Sai): Pinia dựng trên chính hệ reactivity của Vue.
- **Bỏ mutation, store phẳng không lồng nhau, suy luận TypeScript tốt hơn** (Đúng): Đúng: đơn giản hoá API và hợp với Composition API — chỉ còn state, getters, actions, và mỗi store là một đơn vị độc lập thay vì module lồng nhau.
