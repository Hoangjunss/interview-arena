---
id: adapter-pattern-la-gi-khi-nao-dung
position: backend
technology: structural
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Adapter pattern là gì? Khi nào dùng?

## Question (EN)
What is the Adapter pattern and when do you use it?

## Đáp án chi tiết (VI)
Adapter là lớp **trung gian chuyển đổi interface** của một lớp thành interface mà client mong đợi, để hai bên **vốn không tương thích** làm việc được với nhau — giống như \\"phích cắm chuyển đổi\\".\
\
Adapter **bọc** đối tượng cần thích ứng và **ánh xạ lời gọi**: client gọi theo interface quen thuộc → adapter dịch sang lời gọi thật của đối tượng bên trong.\
\
Khi nào dùng:\
- Tích hợp **thư viện/hệ thống bên thứ ba hoặc legacy** có API không khớp với code của bạn mà **không thể sửa mã nguồn** của chúng.\
- Chuẩn hóa nhiều nhà cung cấp khác nhau về **một interface chung** (ví dụ nhiều cổng thanh toán → một `PaymentGateway`).\
\
Phân biệt: **Adapter** đổi interface cho khớp (không thêm hành vi); **Decorator** giữ nguyên interface nhưng thêm hành vi; **Facade** tạo interface đơn giản mới che cả một hệ con phức tạp.

## Detailed Answer (EN)
An Adapter is an **intermediary that converts the interface** of one class into the interface a client expects, so two **otherwise incompatible** sides can work together — like a plug adapter.\
\
The adapter **wraps** the adaptee and **maps calls**: the client calls the familiar interface → the adapter translates to the adaptee's real calls.\
\
When to use:\
- Integrating a **third-party or legacy library/system** whose API does not match your code and **whose source you cannot change**.\
- Normalizing several different providers to **one common interface** (e.g. many payment gateways → a single `PaymentGateway`).\
\
Distinctions: **Adapter** changes the interface to fit (no new behavior); **Decorator** keeps the interface but adds behavior; **Facade** provides a new simplified interface over a whole complex subsystem.
