---
id: key-trong-flutter-dung-de-lam-gi-khi-nao-can
position: backend
technology: widgets
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Key trong Flutter dùng để làm gì? Khi nào cần?

## Question (EN)
What are keys in Flutter used for and when do you need them?

## Đáp án chi tiết (VI)
`Key` giúp Flutter **giữ đúng danh tính (identity)** của widget/element khi cây dựng lại — quyết định element nào khớp với widget nào trong quá trình diff.\
\
Cần key khi:\
- Có **danh sách widget cùng kiểu** thay đổi thứ tự/thêm/xóa (ví dụ list các `StatefulWidget`); không có key, Flutter khớp theo vị trí nên state có thể \\"nhảy\\" sai phần tử.\
- Muốn giữ state khi widget di chuyển vị trí trong cây.\
\
Loại thường dùng: `ValueKey` (theo giá trị định danh), `ObjectKey`, `UniqueKey`, và `GlobalKey` (truy cập state/toàn cục — dùng dè dặt vì tốn kém). Với widget stateless tĩnh, thường **không cần** key.

## Detailed Answer (EN)
`Key` lets Flutter **preserve the identity** of a widget/element across rebuilds — it decides which element matches which widget during diffing.\
\
You need a key when:\
- You have a **list of same-type widgets** that reorder/insert/remove (e.g. a list of `StatefulWidget`s); without keys Flutter matches by position, so state can \\"jump\\" to the wrong item.\
- You want to preserve state when a widget moves position in the tree.\
\
Common types: `ValueKey` (by an identifying value), `ObjectKey`, `UniqueKey`, and `GlobalKey` (access state / global reach — use sparingly, it is costly). For static stateless widgets you usually **do not** need a key.
