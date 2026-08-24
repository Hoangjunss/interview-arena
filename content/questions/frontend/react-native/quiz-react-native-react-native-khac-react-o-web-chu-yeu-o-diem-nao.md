---
id: quiz-react-native-react-native-khac-react-o-web-chu-yeu-o-diem-nao
position: frontend
technology: react-native
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
React Native khác React ở web chủ yếu ở điểm nào?

## Đáp án trắc nghiệm
- [ ] Quản lý state theo cơ chế hoàn toàn khác React
- [ ] Dùng cú pháp riêng thay cho JSX
- [ ] Không hỗ trợ hooks nên phải viết class component
- [x] Component dựng thành view native, không phải DOM

## Giải thích (VI)
Cùng React, khác đích dựng hình: View và Text trở thành view native của Android và iOS thay vì phần tử DOM. Vì vậy không có HTML, không có CSS thật, và mọi API liên quan tới trình duyệt đều không tồn tại.

### Giải thích các phương án:
- **Quản lý state theo cơ chế hoàn toàn khác React** (Sai): Cơ chế state và vòng đời render là chung.
- **Dùng cú pháp riêng thay cho JSX** (Sai): JSX vẫn được dùng nguyên vẹn.
- **Không hỗ trợ hooks nên phải viết class component** (Sai): Hooks hoạt động đầy đủ và là cách viết mặc định.
- **Component dựng thành view native, không phải DOM** (Đúng): Cùng mô hình component và hooks, chỉ khác đích dựng hình nên không có thẻ HTML hay CSS.
