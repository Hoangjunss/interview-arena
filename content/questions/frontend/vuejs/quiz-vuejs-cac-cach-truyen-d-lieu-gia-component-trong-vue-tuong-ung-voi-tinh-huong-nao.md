---
id: quiz-vuejs-cac-cach-truyen-d-lieu-gia-component-trong-vue-tuong-ung-voi-tinh-huong-nao
position: frontend
technology: vuejs
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Các cách truyền dữ liệu giữa component trong Vue tương ứng với tình huống nào?

## Đáp án trắc nghiệm
- [ ] Mọi trường hợp đều nên dùng store toàn cục để đồng nhất
- [ ] Component con có thể gán trực tiếp vào prop để cập nhật lại dữ liệu của cha
- [ ] provide/inject dùng để gửi sự kiện từ con ngược lên cha
- [x] Cha→con props, con→cha emit, xuyên cấp provide/inject, dùng chung store

## Giải thích (VI)
Props truyền dữ liệu từ cha xuống con và là chỉ đọc ở phía con. Emit gửi sự kiện từ con lên cha (emit("update", payload)), cha lắng nghe bằng @update. provide/inject truyền xuống nhiều cấp mà không phải chuyển tiếp từng tầng. Store (Pinia) dành cho state nhiều nhánh cùng dùng. Ngoài ra defineExpose + template ref cho phép cha gọi phương thức của con khi thật sự cần.

### Giải thích các phương án:
- **Mọi trường hợp đều nên dùng store toàn cục để đồng nhất** (Sai): Đưa state cục bộ lên store làm khó lần lại nguồn dữ liệu; store dành cho state thực sự dùng chung.
- **Component con có thể gán trực tiếp vào prop để cập nhật lại dữ liệu của cha** (Sai): Props là một chiều và chỉ đọc; muốn cha đổi thì con phải emit.
- **provide/inject dùng để gửi sự kiện từ con ngược lên cha** (Sai): provide/inject truyền dữ liệu/hàm xuống theo cây, không phải kênh sự kiện đi lên.
- **Cha→con props, con→cha emit, xuyên cấp provide/inject, dùng chung store** (Đúng): Đúng: bốn cơ chế cho bốn phạm vi khác nhau; store (Pinia) chỉ dành cho state thực sự dùng chung giữa nhiều nhánh.
