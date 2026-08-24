---
id: widget-tree-trong-flutter-la-gi-vi-sao-noi-moi-thu-deu-la-widget
position: backend
technology: widgets
level: junior
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Widget tree trong Flutter là gì? Vì sao nói \\"mọi thứ đều là widget\\"?

## Question (EN)
What is the widget tree in Flutter and why is \\"everything is a widget\\"?

## Đáp án chi tiết (VI)
Trong Flutter, UI được mô tả bằng cây các **widget** — mỗi widget là một mô tả bất biến (immutable) của một phần giao diện.\
\
- **Everything is a widget**: layout (`Row`, `Column`, `Padding`), thành phần hiển thị (`Text`, `Image`), cả cấu trúc app (`MaterialApp`, `Scaffold`) đều là widget → ghép (compose) lồng nhau thay vì kế thừa.\
- Flutter duy trì 3 cây song song: **Widget** (cấu hình), **Element** (thể hiện đang gắn trong cây, giữ state), **RenderObject** (đo đạc + vẽ).\
- Khi state đổi, framework dựng lại cây widget mới rồi **so khớp (diff)** với element cũ để cập nhật tối thiểu.\
\
Ý chính: bạn mô tả UI **khai báo** theo state hiện tại, framework lo phần cập nhật.

## Detailed Answer (EN)
In Flutter the UI is described by a tree of **widgets** — each widget is an immutable description of a piece of the interface.\
\
- **Everything is a widget**: layout (`Row`, `Column`, `Padding`), visuals (`Text`, `Image`), even app structure (`MaterialApp`, `Scaffold`) are widgets → you compose by nesting, not by inheritance.\
- Flutter keeps 3 parallel trees: **Widget** (configuration), **Element** (the mounted instance that holds state), **RenderObject** (layout + paint).\
- On state change the framework rebuilds a new widget tree and **diffs** it against the old elements to apply minimal updates.\
\
Key point: you describe the UI **declaratively** from the current state; the framework handles updating it.
