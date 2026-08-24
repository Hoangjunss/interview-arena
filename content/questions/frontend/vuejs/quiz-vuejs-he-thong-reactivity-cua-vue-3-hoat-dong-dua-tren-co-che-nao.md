---
id: quiz-vuejs-he-thong-reactivity-cua-vue-3-hoat-dong-dua-tren-co-che-nao
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Hệ thống reactivity của Vue 3 hoạt động dựa trên cơ chế nào?

## Đáp án trắc nghiệm
- [ ] Polling định kỳ để kiểm tra giá trị có đổi hay không
- [ ] So sánh sâu toàn bộ state sau mỗi sự kiện để tìm ra những chỗ vừa thay đổi
- [ ] Object.defineProperty cho từng thuộc tính, giống hệt Vue 2
- [x] Proxy bao quanh object: đọc thì track phụ thuộc, ghi thì trigger effect

## Giải thích (VI)
Vue 3 bọc object bằng Proxy. Khi một effect (hàm render, computed, watchEffect) đọc thuộc tính, Vue ghi lại quan hệ phụ thuộc; khi thuộc tính bị ghi, Vue chạy lại đúng các effect phụ thuộc. So với Object.defineProperty của Vue 2, Proxy bắt được cả việc thêm/xoá thuộc tính và thao tác mảng theo chỉ số, nên không cần Vue.set nữa.

### Giải thích các phương án:
- **Polling định kỳ để kiểm tra giá trị có đổi hay không** (Sai): Không có cơ chế polling nào trong Vue.
- **So sánh sâu toàn bộ state sau mỗi sự kiện để tìm ra những chỗ vừa thay đổi** (Sai): Vue không quét toàn bộ state; nó biết chính xác phụ thuộc nhờ track lúc đọc.
- **Object.defineProperty cho từng thuộc tính, giống hệt Vue 2** (Sai): Đó là cơ chế của Vue 2; Vue 3 chuyển sang Proxy để bắt được cả thêm/xoá thuộc tính và thao tác mảng.
- **Proxy bao quanh object: đọc thì track phụ thuộc, ghi thì trigger effect** (Đúng): Đúng: track khi đọc, trigger khi ghi — nền tảng của reactivity Vue 3. Nhờ ghi nhận lúc đọc, Vue biết chính xác effect nào phụ thuộc vào giá trị nào và chỉ chạy lại đúng những effect đó.
