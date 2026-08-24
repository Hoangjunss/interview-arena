---
id: quiz-kubernetes-label-va-selector-trong-kubernetes-dung-de-lam-gi
position: backend
technology: kubernetes
level: mid
tags: [quiz, scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Label và selector trong Kubernetes dùng để làm gì?

## Đáp án trắc nghiệm
- [x] Label là cặp khóa–giá trị gắn lên tài nguyên; selector là biểu thức lọc theo label
- [ ] Selector chỉ dùng cho lệnh kubectl get khi lọc thủ công
- [ ] Label là tên hiển thị trên dashboard, không ảnh hưởng tới hoạt động
- [ ] Label thay thế cho namespace trong việc phân tách tài nguyên

## Giải thích (VI)
Label là metadata dạng khóa–giá trị gắn lên tài nguyên. Selector lọc theo label. Đây là chất keo của Kubernetes: Service tìm Pod qua selector, Deployment nhận Pod của mình qua selector. Sai lệch giữa label và selector là nguyên nhân số một khiến Service không có endpoint.

### Giải thích các phương án:
- **Label là cặp khóa–giá trị gắn lên tài nguyên; selector là biểu thức lọc theo label** (Đúng): Đây là cách Service tìm Pod của nó và Deployment nhận biết Pod nào thuộc quyền quản lý. Toàn bộ cơ chế liên kết giữa các tài nguyên trong Kubernetes dựa trên label.
- **Selector chỉ dùng cho lệnh kubectl get khi lọc thủ công** (Sai): Nó là cơ chế nền của Service, Deployment, NetworkPolicy và nhiều thứ khác.
- **Label là tên hiển thị trên dashboard, không ảnh hưởng tới hoạt động** (Sai): Label quyết định việc Service định tuyến và controller quản lý Pod.
- **Label thay thế cho namespace trong việc phân tách tài nguyên** (Sai): Namespace là ranh giới tên và quyền; label là cách nhóm và chọn.
