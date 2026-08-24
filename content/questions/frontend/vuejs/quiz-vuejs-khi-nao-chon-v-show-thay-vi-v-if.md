---
id: quiz-vuejs-khi-nao-chon-v-show-thay-vi-v-if
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Khi nào chọn v-show thay vì v-if?

## Đáp án trắc nghiệm
- [ ] Khi cần dùng kèm với v-else trong cùng khối
- [ ] Khi phần tử gần như không bao giờ hiển thị — dùng v-show để khỏi tốn tài nguyên
- [ ] Khi muốn phần tử biến mất hoàn toàn khỏi cây DOM
- [x] Khi phần tử bật/tắt liên tục — v-show chỉ đổi display nên chuyển rẻ

## Giải thích (VI)
v-if thực sự tạo và huỷ phần tử cùng component con, nên chi phí nằm ở mỗi lần chuyển trạng thái; nó cũng lười — điều kiện sai từ đầu thì không render gì. v-show luôn render sẵn và chỉ bật tắt display, nên chuyển trạng thái rất rẻ nhưng tốn chi phí khởi tạo ban đầu. Bật tắt liên tục (tab, tooltip) dùng v-show; hiếm khi hiển thị hoặc nội dung nặng dùng v-if.

### Giải thích các phương án:
- **Khi cần dùng kèm với v-else trong cùng khối** (Sai): v-else đi với v-if, không đi với v-show.
- **Khi phần tử gần như không bao giờ hiển thị — dùng v-show để khỏi tốn tài nguyên** (Sai): Ngược lại: v-show vẫn render ngay từ đầu; trường hợp này v-if mới tiết kiệm.
- **Khi muốn phần tử biến mất hoàn toàn khỏi cây DOM** (Sai): Đó là v-if; v-show giữ phần tử trong DOM với display: none.
- **Khi phần tử bật/tắt liên tục — v-show chỉ đổi display nên chuyển rẻ** (Đúng): Đúng: đánh đổi giữa chi phí khởi tạo ban đầu và chi phí mỗi lần bật tắt. v-show luôn render sẵn, còn v-if thật sự tạo/huỷ phần tử nên tốn hơn mỗi lần chuyển.
