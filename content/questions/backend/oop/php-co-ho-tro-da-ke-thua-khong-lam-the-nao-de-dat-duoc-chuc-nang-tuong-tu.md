---
id: php-co-ho-tro-da-ke-thua-khong-lam-the-nao-de-dat-duoc-chuc-nang-tuong-tu
position: backend
technology: oop
level: mid
tags: [scraped, luyenphongvan]
source: MANUAL
status: ACTIVE
created_at: 2026-08-24
---

## Câu hỏi (VI)
PHP có hỗ trợ đa kế thừa không? Làm thế nào để đạt được chức năng tương tự?

## Question (EN)
Does PHP support multiple inheritance? How do you achieve similar functionality?

## Đáp án chi tiết (VI)
PHP không hỗ trợ đa kế thừa (một class chỉ có thể extends một class cha). Thay vào đó, dùng interface: một class có thể implement nhiều interface. \
\
**Ví dụ:** `class Employee implements Payable, Manageable` trong đó cả hai interface đều định nghĩa contract mà class phải thực hiện. Ngoài ra còn có trait để tái sử dụng code: `trait Logger { public function log() {} }` rồi `class User { use Logger; }` để chia sẻ phương thức giữa các class không liên quan mà không cần kế thừa.

## Detailed Answer (EN)
No, PHP doesn't support multiple inheritance (a class can only extend one parent). Instead, use interfaces: a class can implement multiple interfaces. \
\
**Example:** `class Employee implements Payable, Manageable` where both interfaces define contracts the class must fulfill. Also use traits for code reuse: `trait Logger { public function log() {} }` then `class User { use Logger; }` to share methods across unrelated classes without inheritance.
