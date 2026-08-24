---
id: rbac-va-abac-khac-nhau-the-nao-khi-nao-chon-cai-nao
position: backend
technology: access-control
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
RBAC và ABAC khác nhau thế nào? Khi nào chọn cái nào?

## Question (EN)
RBAC vs ABAC — what is the difference and when to choose each?

## Đáp án chi tiết (VI)
Cả hai là mô hình **phân quyền (authorization)**:\
\
- **RBAC** (Role-Based): gán quyền theo **vai trò** (admin, editor, viewer); user nhận quyền qua role. Đơn giản, dễ hiểu và audit; hợp phần lớn ứng dụng. Nhược điểm: bùng nổ số role khi luật quá chi tiết (\\"role explosion\\").\
- **ABAC** (Attribute-Based): quyết định dựa trên **thuộc tính** của user, tài nguyên, hành động và ngữ cảnh (phòng ban, chủ sở hữu, giờ, IP). Linh hoạt, biểu đạt được luật tinh vi (\\"chỉ chủ tài liệu sửa được, trong giờ hành chính\\"). Nhược điểm: phức tạp, khó test và audit hơn.\
\
Thực tế thường **kết hợp**: RBAC làm nền, thêm vài luật ABAC cho trường hợp phụ thuộc ngữ cảnh. OWASP khuyến nghị enforce quyền ở **server** và mặc định **deny** (chỉ mở cái được phép).

## Detailed Answer (EN)
Both are **authorization** models:\
\
- **RBAC** (Role-Based): grant permissions via **roles** (admin, editor, viewer); users get access through their roles. Simple, easy to understand and audit; fits most apps. Downside: an explosion of roles when rules get too fine-grained (\\"role explosion\\").\
- **ABAC** (Attribute-Based): decisions based on **attributes** of the user, resource, action, and context (department, ownership, time, IP). Flexible, expresses nuanced rules (\\"only the document owner may edit, during business hours\\"). Downside: more complex, harder to test and audit.\
\
In practice, **combine** them: RBAC as the base, plus a few ABAC rules for context-dependent cases. OWASP recommends enforcing authorization on the **server** and defaulting to **deny** (allow only what is permitted).
