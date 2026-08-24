---
id: quiz-vuejs-phat-bieu-nao-sau-day-sai-ve-slot-trong-vue
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Phát biểu nào sau đây SAI về slot trong Vue?

## Đáp án trắc nghiệm
- [ ] Scoped slot cho phép component con truyền dữ liệu ngược ra cho nội dung mà cha viết
- [ ] Slot cho phép component cha truyền cả một mảnh template vào con, thay vì chỉ truyền dữ liệu qua props
- [x] Nội dung trong slot được biên dịch trong phạm vi của con nên đọc được biến nội bộ của con
- [ ] Named slot (<template #header>) cho phép chia nhiều vùng nội dung trong một component

## Giải thích (VI)
Slot để cha truyền markup vào con. <slot> không tên là slot mặc định và nội dung viết bên trong thẻ <slot> là nội dung dự phòng. Named slot chia nhiều vùng (#header, #footer). Scoped slot cho con đưa dữ liệu ra ngoài (<slot :item="item"> → #default="{ item }"). Nội dung slot luôn được biên dịch trong phạm vi của cha.

### Giải thích các phương án:
- **Scoped slot cho phép component con truyền dữ liệu ngược ra cho nội dung mà cha viết** (Sai): Phát biểu đúng: <slot :item="item"> và cha nhận qua #default="{ item }".
- **Slot cho phép component cha truyền cả một mảnh template vào con, thay vì chỉ truyền dữ liệu qua props** (Sai): Phát biểu đúng: đây chính là mục đích của slot — truyền markup chứ không chỉ dữ liệu.
- **Nội dung trong slot được biên dịch trong phạm vi của con nên đọc được biến nội bộ của con** (Đúng): Đây là chỗ sai: nội dung slot thuộc phạm vi của cha; muốn dùng dữ liệu của con phải đi qua scoped slot.
- **Named slot (<template #header>) cho phép chia nhiều vùng nội dung trong một component** (Sai): Phát biểu đúng: <slot name="header"> nhận đúng phần được đánh dấu.
