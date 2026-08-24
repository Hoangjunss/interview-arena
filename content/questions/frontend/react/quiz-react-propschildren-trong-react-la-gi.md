---
id: quiz-react-propschildren-trong-react-la-gi
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
props.children trong React là gì?

## Đáp án trắc nghiệm
- [x] Prop đặc biệt chứa nội dung được đặt giữa thẻ mở và thẻ đóng của component
- [ ] API cho phép component cha gọi trực tiếp method và đọc state của component con
- [ ] Prop chứa toàn bộ component con trong cây bên dưới, kể cả con của con ở mọi cấp
- [ ] Chỉ chứa được một chuỗi văn bản; muốn truyền element phải dùng một prop render riêng

## Giải thích (VI)
props.children là prop đặc biệt chứa nội dung được nhúng giữa thẻ mở và thẻ đóng của component. Ví dụ Hi thì bên trong Card, {children} chính là Hi . Đây là nền tảng của composition: xây wrapper component (Modal, Layout, Card) quyết định khung bọc ngoài mà không cần biết trước nội dung bên trong là gì.

### Giải thích các phương án:
- **Prop đặc biệt chứa nội dung được đặt giữa thẻ mở và thẻ đóng của component** (Đúng): Nền tảng của composition để xây các wrapper component như Modal, Layout, Card. Đúng: Hi thì props.children của Modal chính là Hi ; Modal quyết định vị trí render nội dung đó mà không cần biết trước cấu trúc.
- **API cho phép component cha gọi trực tiếp method và đọc state của component con** (Sai): Sai — React không có kênh gọi method con qua children; cha tương tác với con qua props truyền xuống, hoặc ref cho trường hợp imperative đặc biệt.
- **Prop chứa toàn bộ component con trong cây bên dưới, kể cả con của con ở mọi cấp** (Sai): Sai — children chỉ là nội dung được nhúng TRỰC TIẾP giữa cặp thẻ của component đó, không phải toàn bộ subtree render ra sau này.
- **Chỉ chứa được một chuỗi văn bản; muốn truyền element phải dùng một prop render riêng** (Sai): Sai — children nhận mọi thứ JSX render được: element, nhiều phần tử, string, số, thậm chí function (render props pattern).
