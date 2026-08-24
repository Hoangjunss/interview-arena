---
id: memento-pattern-la-gi-no-ho-tro-undo-redo-nhu-the-nao
position: backend
technology: behavioral
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Memento pattern là gì? Nó hỗ trợ undo/redo như thế nào?

## Question (EN)
What is the Memento pattern? How does it support undo/redo?

## Đáp án chi tiết (VI)
**Ý tưởng**: chụp và lưu lại trạng thái nội bộ của một object để sau này khôi phục, mà **không phá vỡ encapsulation** (không lộ chi tiết bên trong ra ngoài).\
\
**Ba vai**:\
- **Originator**: object có trạng thái cần lưu; tạo memento (`save()`) và phục hồi từ memento (`restore(m)`).\
- **Memento**: object bất biến giữ ảnh chụp trạng thái; chỉ Originator đọc được nội dung.\
- **Caretaker**: giữ danh sách memento (thường là một stack), yêu cầu save/restore nhưng không xem nội dung.\
\
**Undo/redo**: mỗi thay đổi → Caretaker push một memento vào stack *undo*; khi Undo → pop và `restore`; Redo dùng stack thứ hai. Editor văn bản, phần mềm đồ họa dùng đúng cơ chế này.\
\
**Đánh đổi**: lưu full snapshot tốn bộ nhớ nếu state lớn hoặc thay đổi liên tục → cân nhắc lưu *delta* (Command pattern) thay vì snapshot đầy đủ.

## Detailed Answer (EN)
**Idea**: capture and store an object's internal state so it can be restored later, **without breaking encapsulation** (its internals are never exposed outside).\
\
**Three roles**:\
- **Originator**: the object whose state must be saved; it creates a memento (`save()`) and restores from one (`restore(m)`).\
- **Memento**: an immutable object holding a snapshot of the state; only the Originator can read its contents.\
- **Caretaker**: keeps a list of mementos (usually a stack) and requests save/restore without inspecting the contents.\
\
**Undo/redo**: on each change the Caretaker pushes a memento onto the *undo* stack; Undo pops one and calls `restore`; Redo uses a second stack. Text editors and graphics tools use exactly this mechanism.\
\
**Trade-off**: storing full snapshots is memory-heavy for large or rapidly changing state → consider storing *deltas* (Command pattern) instead of full snapshots.
