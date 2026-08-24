---
id: enums-trong-php-8-1-la-gi-va-khi-nao-nen-dung-thay-constants
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
Enums trong PHP 8.1 là gì và khi nào nên dùng thay constants?

## Question (EN)
What are Enums in PHP 8.1 and when should you use them instead of constants?

## Đáp án chi tiết (VI)
Enums định nghĩa tập hợp giá trị cố định, hợp lệ với type safety đầy đủ. \
\
**Ví dụ:** `enum OrderStatus { case PENDING; case SHIPPED; case DELIVERED; }` rồi `$order-\u003estatus = OrderStatus::PENDING;`. Hơn constants ở điểm: type-checked (không thể gán giá trị tùy ý), hỗ trợ method bên trong enum, tích hợp với Eloquent qua cast. Backed enum có value: `enum Status: string { case ACTIVE = 'active'; case INACTIVE = 'inactive'; }` lưu vào DB dễ dàng. Dùng cho: trạng thái đơn hàng, vai trò người dùng, phương thức thanh toán—bất kỳ tập giá trị có hạn nào cần type safety.

## Detailed Answer (EN)
Enums define a fixed, valid set of values with full type safety. \
\
**Example:** `enum OrderStatus { case PENDING; case SHIPPED; case DELIVERED; }` then `$order-\u003estatus = OrderStatus::PENDING;`. Better than constants: type-checked (no arbitrary assignment), support methods inside the enum, integrate with Eloquent via casts. Backed enums have values: `enum Status: string { case ACTIVE = 'active'; case INACTIVE = 'inactive'; }` for easy DB storage. Use for: order statuses, user roles, payment methods—any finite set of values needing type safety.
