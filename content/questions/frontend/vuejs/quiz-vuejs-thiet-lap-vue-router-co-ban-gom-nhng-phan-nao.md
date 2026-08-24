---
id: quiz-vuejs-thiet-lap-vue-router-co-ban-gom-nhng-phan-nao
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Thiết lập Vue Router cơ bản gồm những phần nào?

## Đáp án trắc nghiệm
- [ ] Chỉ cần đặt file component vào thư mục pages, Vue tự sinh route
- [x] createRouter với routes, app.use(router), <router-view>, <router-link>
- [ ] Điều hướng bằng thẻ <a href> để giữ nguyên hành vi điều hướng chuẩn của trình duyệt
- [ ] Trong code chỉ điều hướng được bằng window.location

## Giải thích (VI)
Tạo router với createRouter({ history: createWebHistory(), routes }), cài bằng app.use(router), đặt <router-view> ở nơi muốn render trang, và điều hướng bằng <router-link to="/users/1"> trong template hoặc router.push() trong code. Đọc tham số bằng useRoute().params; điều hướng bằng useRouter().

### Giải thích các phương án:
- **Chỉ cần đặt file component vào thư mục pages, Vue tự sinh route** (Sai): Đó là quy ước của Nuxt (hoặc plugin file-based routing), không phải Vue Router thuần.
- **createRouter với routes, app.use(router), <router-view>, <router-link>** (Đúng): Đúng: bốn mảnh — cấu hình (kèm history), cài vào app, hiển thị route hiện tại và điều hướng.
- **Điều hướng bằng thẻ <a href> để giữ nguyên hành vi điều hướng chuẩn của trình duyệt** (Sai): <a href> tải lại toàn trang; điều hướng nội bộ nên dùng <router-link>.
- **Trong code chỉ điều hướng được bằng window.location** (Sai): Dùng router.push() / router.replace() từ useRouter().
