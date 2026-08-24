---
id: quiz-vuejs-defineprops-va-defineemits-trong-script-setup-co-gi-dac-biet
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
defineProps và defineEmits trong <script setup> có gì đặc biệt?

## Đáp án trắc nghiệm
- [ ] defineProps trả về object có thể gán lại để cập nhật giá trị prop
- [ ] Chúng là hàm runtime import từ vue, gọi được ở bất kỳ đâu trong file
- [x] Là macro xử lý lúc biên dịch — không cần import, khai báo được bằng kiểu TypeScript
- [ ] Phải khai báo cả hai kể cả khi component không nhận prop nào và cũng không phát sự kiện nào

## Giải thích (VI)
defineProps/defineEmits là macro của compiler: không import, chỉ dùng ở cấp cao nhất của <script setup>, và được biến thành khai báo props/emits thật lúc build. Khai báo bằng kiểu TypeScript cho suy luận chặt cả chiều nhận (props) lẫn chiều phát (payload sự kiện). Props luôn chỉ đọc; giá trị mặc định đặt qua withDefaults hoặc cú pháp destructure có mặc định ở bản Vue mới.

### Giải thích các phương án:
- **defineProps trả về object có thể gán lại để cập nhật giá trị prop** (Sai): Props là chỉ đọc; muốn đổi phải emit lên cha.
- **Chúng là hàm runtime import từ vue, gọi được ở bất kỳ đâu trong file** (Sai): Không import và chỉ dùng được ở cấp cao nhất của <script setup>.
- **Là macro xử lý lúc biên dịch — không cần import, khai báo được bằng kiểu TypeScript** (Đúng): Đúng: compiler macro chứ không phải hàm runtime, nên chỉ dùng được ở cấp cao nhất của <script setup>. Khai báo bằng kiểu TypeScript cho suy luận chặt cả props lẫn payload sự kiện.
- **Phải khai báo cả hai kể cả khi component không nhận prop nào và cũng không phát sự kiện nào** (Sai): Chỉ khai báo khi thực sự cần.
