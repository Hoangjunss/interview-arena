---
id: quiz-react-lifting-state-up-la-gi-va-khi-nao-can-thuc-hien
position: frontend
technology: react
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Lifting state up là gì và khi nào cần thực hiện?

## Đáp án trắc nghiệm
- [ ] Chuyển toàn bộ state của app lên component root để dễ quản lý tập trung
- [ ] Dùng Context để đưa state ra khỏi component, vì props không truyền được xuống nhiều tầng
- [x] Di chuyển state lên component cha chung gần nhất khi nhiều component cần chia sẻ cùng dữ liệu
- [ ] Copy state sang từng component con để mỗi con tự quản lý một bản riêng

## Giải thích (VI)
Lifting state up là chuyển state lên component cha chung gần nhất khi nhiều component cần chia sẻ cùng dữ liệu. Cha giữ state làm nguồn duy nhất, truyền xuống qua props, các con cập nhật qua callback. Thực hiện khi hai sibling bị mất đồng bộ dữ liệu; nếu phải lift qua quá nhiều tầng thì cân nhắc Context hoặc state manager.

### Giải thích các phương án:
- **Chuyển toàn bộ state của app lên component root để dễ quản lý tập trung** (Sai): Lift chỉ lên cha chung GẦN NHẤT của các component cần chia sẻ — dồn hết lên root gây re-render lan rộng và props drilling không cần thiết.
- **Dùng Context để đưa state ra khỏi component, vì props không truyền được xuống nhiều tầng** (Sai): Context là giải pháp khác (cho trường hợp lift quá nhiều tầng); bản thân lifting state up chỉ dùng props và callback, không cần Context.
- **Di chuyển state lên component cha chung gần nhất khi nhiều component cần chia sẻ cùng dữ liệu** (Đúng): Cha truyền xuống qua props và nhận cập nhật qua callback. Đúng định nghĩa: state đặt ở cha chung để trở thành single source of truth, các con đọc qua props và ghi qua callback.
- **Copy state sang từng component con để mỗi con tự quản lý một bản riêng** (Sai): Đây chính là vấn đề lifting state up giải quyết: nhiều bản copy sẽ mất đồng bộ; cần một nguồn duy nhất ở cha chung.
