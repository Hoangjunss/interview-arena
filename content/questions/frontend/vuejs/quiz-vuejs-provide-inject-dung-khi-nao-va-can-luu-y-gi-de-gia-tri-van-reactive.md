---
id: quiz-vuejs-provide-inject-dung-khi-nao-va-can-luu-y-gi-de-gia-tri-van-reactive
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
provide / inject dùng khi nào và cần lưu ý gì để giá trị vẫn reactive?

## Đáp án trắc nghiệm
- [ ] Dùng để gửi sự kiện từ con lên cha thay cho việc emit
- [x] Truyền xuống nhiều cấp; provide chính ref/reactive chứ không phải .value
- [ ] Giá trị inject luôn giữ được tính reactive kể cả khi provide một số nguyên thường
- [ ] Chỉ dùng được giữa cha và con trực tiếp, không xuyên nhiều cấp

## Giải thích (VI)
provide/inject giải quyết việc truyền dữ liệu xuống sâu mà không phải chuyển tiếp props qua từng tầng — hợp với theme, cấu hình, hoặc API nội bộ của một component phức hợp. Muốn bên nhận thấy thay đổi thì provide nguyên ref/reactive, không provide .value. Nên đặt hàm cập nhật cùng chỗ và chỉ cho con gọi hàm đó, thay vì cho con ghi thẳng.

### Giải thích các phương án:
- **Dùng để gửi sự kiện từ con lên cha thay cho việc emit** (Sai): provide/inject đi theo chiều xuống của cây component.
- **Truyền xuống nhiều cấp; provide chính ref/reactive chứ không phải .value** (Đúng): Đúng: dùng khi cần truyền xuống nhiều cấp mà không phải chuyển tiếp props từng tầng. Provide giá trị đã bóc (.value) là truyền một bản chụp tĩnh, bên nhận sẽ không cập nhật nữa.
- **Giá trị inject luôn giữ được tính reactive kể cả khi provide một số nguyên thường** (Sai): Provide một primitive thường thì bên nhận chỉ có giá trị tại thời điểm provide.
- **Chỉ dùng được giữa cha và con trực tiếp, không xuyên nhiều cấp** (Sai): Chính điểm mạnh là xuyên nhiều cấp trong cây component.
