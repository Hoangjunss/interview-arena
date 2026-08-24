---
id: quiz-vuejs-script-setup-khac-setup-thong-thuong-o-diem-nao
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
<script setup> khác setup() thông thường ở điểm nào?

## Đáp án trắc nghiệm
- [x] Biến khai báo ở cấp cao nhất tự dùng được trong template, không cần return
- [ ] Các macro defineProps/defineEmits phải import từ vue trước khi dùng
- [ ] Component import vào vẫn phải khai báo thêm trong mục components
- [ ] Cho phép bỏ hoàn toàn hệ thống reactivity — biến thường cũng tự cập nhật view

## Giải thích (VI)
<script setup> là đường cú pháp ở bước biên dịch cho setup(): biến ở cấp cao nhất tự dùng được trong template (không cần return), component import vào tự đăng ký, và có các macro defineProps/defineEmits/defineExpose cho kiểu chặt hơn. Reactivity không đổi — vẫn phải dùng ref/reactive để giá trị được theo dõi.

### Giải thích các phương án:
- **Biến khai báo ở cấp cao nhất tự dùng được trong template, không cần return** (Đúng): Đúng: compiler tự đưa binding ra cho template nên không phải return thủ công.
- **Các macro defineProps/defineEmits phải import từ vue trước khi dùng** (Sai): Chúng là macro xử lý ở bước biên dịch nên không cần import.
- **Component import vào vẫn phải khai báo thêm trong mục components** (Sai): Ngược lại — với <script setup>, component import vào được đăng ký tự động.
- **Cho phép bỏ hoàn toàn hệ thống reactivity — biến thường cũng tự cập nhật view** (Sai): Vẫn cần ref/reactive; <script setup> chỉ là đường cú pháp cho khai báo component.
