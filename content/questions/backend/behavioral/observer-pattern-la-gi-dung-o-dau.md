---
id: observer-pattern-la-gi-dung-o-dau
position: backend
technology: behavioral
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Observer pattern là gì? Dùng ở đâu?

## Question (EN)
What is the Observer pattern and where is it used?

## Đáp án chi tiết (VI)
Observer định nghĩa quan hệ **một–nhiều**: một **subject** giữ danh sách các **observer** và **tự động thông báo** cho tất cả khi trạng thái của nó thay đổi. Observer đăng ký (subscribe) / hủy đăng ký; subject không cần biết chi tiết observer, chỉ gọi qua một interface chung → **decoupling**.\
\
Luồng: observer `subscribe` vào subject → subject có thay đổi → gọi `notify()` → mỗi observer nhận `update()` và tự xử lý.\
\
Ứng dụng thực tế:\
- **Event listener** trên UI (DOM `addEventListener`), hệ thống event/callback.\
- **Reactive state**: RxJS observable, các store phát thay đổi cho component (React re-render khi state đổi).\
- **Pub/Sub** trong ứng dụng (biến thể có message broker ở giữa).\
\
Lưu ý: coi chừng **memory leak** nếu quên hủy đăng ký, và thứ tự/độ sâu thông báo khi observer lại kích hoạt thay đổi khác.

## Detailed Answer (EN)
Observer defines a **one-to-many** relationship: a **subject** keeps a list of **observers** and **automatically notifies** them all when its state changes. Observers subscribe/unsubscribe; the subject need not know observer details, calling them through a common interface → **decoupling**.\
\
Flow: an observer `subscribe`s to the subject → the subject changes → it calls `notify()` → each observer gets `update()` and reacts.\
\
Real-world uses:\
- **Event listeners** on UIs (DOM `addEventListener`), event/callback systems.\
- **Reactive state**: RxJS observables, stores emitting changes to components (React re-renders on state change).\
- In-app **pub/sub** (a variant with a message broker in between).\
\
Note: watch for **memory leaks** if you forget to unsubscribe, and notification order/depth when an observer triggers further changes.
